"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { Column, Row, Text } from "@once-ui-system/core";
import styles from "./VisitorLocationMap.module.scss";

type VisitorCity = {
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  visit_count: number;
};

type VisitorVisit = {
  city?: string | null;
  country?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
};

type IpLookupResponse = {
  city?: string;
  country?: string;
  country_name?: string;
  latitude?: number | string;
  longitude?: number | string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const hasVisitorStorage = Boolean(supabaseUrl && supabaseAnonKey);
const recordIntervalMs = 24 * 60 * 60 * 1000;
const recordStorageKey = "portfolio-visitor-city-recorded-at";

function getSupabaseHeaders() {
  return {
    apikey: supabaseAnonKey ?? "",
    Authorization: `Bearer ${supabaseAnonKey ?? ""}`,
    "Content-Type": "application/json",
  };
}

function normalizeNumber(value: number | string | null | undefined): number | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function normalizeVisitorCity(location: Partial<VisitorCity>): VisitorCity | null {
  const city = location.city?.trim();
  const country = location.country?.trim();

  if (!city || !country) {
    return null;
  }

  return {
    city,
    country,
    latitude: normalizeNumber(location.latitude ?? undefined),
    longitude: normalizeNumber(location.longitude ?? undefined),
    visit_count: Number(location.visit_count) || 0,
  };
}

function aggregateVisitorVisits(visits: VisitorVisit[]): VisitorCity[] {
  const locationMap = new Map<string, VisitorCity>();

  visits.forEach((visit) => {
    const city = visit.city?.trim();
    const country = visit.country?.trim();

    if (!city || !country) {
      return;
    }

    const key = `${city.toLowerCase()}-${country.toLowerCase()}`;
    const existingLocation = locationMap.get(key);

    if (existingLocation) {
      existingLocation.visit_count += 1;
      existingLocation.latitude ??= normalizeNumber(visit.latitude);
      existingLocation.longitude ??= normalizeNumber(visit.longitude);
      return;
    }

    locationMap.set(key, {
      city,
      country,
      latitude: normalizeNumber(visit.latitude),
      longitude: normalizeNumber(visit.longitude),
      visit_count: 1,
    });
  });

  return [...locationMap.values()].sort((a, b) => b.visit_count - a.visit_count);
}

async function fetchVisitorCities(): Promise<VisitorCity[]> {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/visitors?select=city,country,latitude,longitude&order=created_at.desc&limit=1000`,
    {
      headers: getSupabaseHeaders(),
      cache: "no-store",
    },
  );

  if (response.ok) {
    const data = (await response.json()) as VisitorVisit[];
    return aggregateVisitorVisits(data).slice(0, 50);
  }

  const fallbackResponse = await fetch(
    `${supabaseUrl}/rest/v1/visitors?select=city,country&order=created_at.desc&limit=1000`,
    {
      headers: getSupabaseHeaders(),
      cache: "no-store",
    },
  );

  if (!fallbackResponse.ok) {
    throw new Error("Could not load visitor cities");
  }

  const fallbackData = (await fallbackResponse.json()) as VisitorVisit[];
  return aggregateVisitorVisits(fallbackData).slice(0, 50);
}

async function lookupVisitorCity(): Promise<VisitorCity | null> {
  const response = await fetch("https://ipapi.co/json/");

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as IpLookupResponse;
  const country = data.country_name ?? data.country;

  return normalizeVisitorCity({
    city: data.city,
    country,
    latitude: normalizeNumber(data.latitude),
    longitude: normalizeNumber(data.longitude),
    visit_count: 1,
  });
}

async function recordVisitorCity(location: VisitorCity) {
  const insertResponse = await fetch(`${supabaseUrl}/rest/v1/visitors`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(),
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      city: location.city,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
    }),
  });

  if (insertResponse.ok) {
    return;
  }

  const insertFallbackResponse = await fetch(`${supabaseUrl}/rest/v1/visitors`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(),
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      city: location.city,
      country: location.country,
    }),
  });

  if (!insertFallbackResponse.ok) {
    throw new Error("Could not record visitor city");
  }
}

function shouldRecordVisit() {
  try {
    const lastRecordedAt = Number(window.localStorage.getItem(recordStorageKey));
    return !lastRecordedAt || Date.now() - lastRecordedAt > recordIntervalMs;
  } catch {
    return true;
  }
}

function rememberRecordedVisit() {
  try {
    window.localStorage.setItem(recordStorageKey, String(Date.now()));
  } catch {
    // Local storage is optional; the map still works without it.
  }
}

function getMarkerStyle(location: VisitorCity): CSSProperties {
  const longitude = location.longitude ?? 0;
  const latitude = location.latitude ?? 0;

  return {
    left: `${((longitude + 180) / 360) * 100}%`,
    top: `${((90 - latitude) / 180) * 100}%`,
  };
}

export function VisitorLocationMap() {
  const [locations, setLocations] = useState<VisitorCity[]>([]);
  const [status, setStatus] = useState(
    hasVisitorStorage ? "Loading visitor cities" : "Storage setup needed",
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!hasVisitorStorage) {
      return;
    }

    let isMounted = true;

    async function loadVisitorCities() {
      try {
        setHasError(false);

        const existingLocations = await fetchVisitorCities();

        if (isMounted) {
          setLocations(existingLocations);
        }

        if (shouldRecordVisit()) {
          const visitorCity = await lookupVisitorCity();

          if (visitorCity) {
            await recordVisitorCity(visitorCity);
            rememberRecordedVisit();
          }
        }

        const updatedLocations = await fetchVisitorCities();

        if (isMounted) {
          setLocations(updatedLocations);
          setStatus(
            updatedLocations.length
              ? "City and country visits counted from setup date"
              : "Waiting for first city visit",
          );
        }
      } catch {
        if (isMounted) {
          setHasError(true);
          setStatus("Visitor city map unavailable");
        }
      }
    }

    loadVisitorCities();

    return () => {
      isMounted = false;
    };
  }, []);

  const locationsWithCoordinates = useMemo(
    () =>
      locations.filter(
        (location) => location.latitude !== null && location.longitude !== null,
      ),
    [locations],
  );

  const totalVisits = useMemo(
    () => locations.reduce((sum, location) => sum + location.visit_count, 0),
    [locations],
  );

  const topLocations = locations.slice(0, 6);

  return (
    <Column className={styles.locationMap} gap="16" fillWidth>
      <Row
        className={styles.locationHeader}
        fillWidth
        horizontal="between"
        vertical="center"
        gap="12"
        s={{ direction: "column", horizontal: "start", vertical: "start" }}
      >
        <Column gap="2">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Visitor map
          </Text>
          <Text variant="body-default-s" onBackground="neutral-strong">
            {hasVisitorStorage && totalVisits > 0
              ? `${totalVisits} visits from ${locations.length} places`
              : status}
          </Text>
        </Column>
        <Text
          className={`${styles.locationPrivacy} ${hasError ? styles.locationPrivacyError : ""}`}
          variant="label-default-s"
          onBackground="neutral-weak"
        >
          City and country only
        </Text>
      </Row>

      <div className={styles.locationMapFrame}>
        <div className={styles.locationMapPreview} aria-hidden="true">
          <svg viewBox="0 0 640 260" preserveAspectRatio="none">
            <path className={styles.locationMapGrid} d="M0 65H640M0 130H640M0 195H640" />
            <path
              className={styles.locationMapGrid}
              d="M107 0V260M213 0V260M320 0V260M427 0V260M533 0V260"
            />
            <path
              className={styles.locationMapLand}
              d="M48 76c28-30 82-43 126-32 36 9 63 34 65 68 2 30-21 52-49 60-25 7-35 21-32 46 4 29-27 44-56 29-30-16-27-44-49-58-33-21-35-82-5-113z"
            />
            <path
              className={styles.locationMapLand}
              d="M233 66c37-22 91-23 130-7 32 14 48 42 38 73-8 25 4 40 30 47 39 12 73 8 104 29 31 20 38 52 13 73-20 17-53 15-77 3-26-13-52-6-77 4-34 14-68 6-86-21-13-19-10-42 3-63 14-22 8-39-22-51-33-13-64-26-71-54-3-13 2-24 15-33z"
            />
            <path
              className={styles.locationMapLand}
              d="M483 71c31-18 79-21 107-3 24 15 29 42 14 66-12 19-6 35 11 49 19 16 22 43 3 60-20 18-52 14-75-2-22-15-43-10-68-16-35-8-51-41-38-72 10-24 30-38 46-82z"
            />
          </svg>
        </div>

        {locationsWithCoordinates.map((location) => (
          <span
            key={`${location.city}-${location.country}`}
            className={styles.visitorMarker}
            style={getMarkerStyle(location)}
            title={`${location.city}, ${location.country}: ${location.visit_count} visits`}
          >
            <span>{location.visit_count}</span>
          </span>
        ))}
      </div>

      <div className={styles.locationList}>
        {topLocations.length > 0 ? (
          topLocations.map((location) => (
            <div key={`${location.city}-${location.country}`} className={styles.locationItem}>
              <Text variant="label-default-s" onBackground="neutral-strong">
                {location.city}
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {location.country} · {location.visit_count} visit
                {location.visit_count === 1 ? "" : "s"}
              </Text>
            </div>
          ))
        ) : (
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {hasVisitorStorage
              ? "New visitor cities will appear here after the first recorded visit."
              : "Connect Supabase to start collecting future visitor cities."}
          </Text>
        )}
      </div>
    </Column>
  );
}

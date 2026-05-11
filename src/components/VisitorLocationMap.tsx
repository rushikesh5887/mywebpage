"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  error?: boolean;
  latitude?: number | string;
  loc?: string;
  longitude?: number | string;
  success?: boolean;
};

type LeafletLike = {
  divIcon: (options: { className?: string; html: string; iconSize: [number, number] }) => unknown;
  latLngBounds: (points: [number, number][]) => {
    pad: (ratio: number) => unknown;
  };
  layerGroup: () => {
    addTo: (map: LeafletMapLike) => LeafletLayerGroupLike;
  };
  map: (
    element: HTMLDivElement,
    options: {
      attributionControl: boolean;
      scrollWheelZoom: boolean;
      worldCopyJump: boolean;
      zoomControl: boolean;
    },
  ) => LeafletMapLike;
  marker: (
    position: [number, number],
    options: {
      icon: unknown;
      title: string;
    },
  ) => {
    addTo: (layer: LeafletLayerGroupLike) => {
      bindPopup: (content: string) => void;
    };
  };
  tileLayer: (
    url: string,
    options: {
      attribution: string;
      maxZoom: number;
      minZoom: number;
    },
  ) => {
    addTo: (map: LeafletMapLike) => void;
  };
};

type LeafletLayerGroupLike = {
  clearLayers: () => void;
  remove: () => void;
};

type LeafletMapLike = {
  attributionControl?: {
    setPrefix: (prefix: string | false) => void;
  };
  fitBounds: (bounds: unknown, options?: { maxZoom?: number }) => void;
  invalidateSize: () => void;
  remove: () => void;
  setView: (center: [number, number], zoom: number) => void;
};

declare global {
  interface Window {
    L?: LeafletLike;
    __leafletPromise?: Promise<LeafletLike>;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const hasVisitorStorage = Boolean(supabaseUrl && supabaseAnonKey);
const recordIntervalMs = 24 * 60 * 60 * 1000;
const recordStorageKey = "portfolio-visitor-city-recorded-at";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function ensureLeafletStylesheet() {
  const existingStylesheet = document.querySelector('link[data-visitor-map-leaflet="true"]');

  if (existingStylesheet) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  link.setAttribute("data-visitor-map-leaflet", "true");
  document.head.append(link);
}

function loadLeafletScript() {
  if (window.L) {
    return Promise.resolve(window.L);
  }

  if (window.__leafletPromise) {
    return window.__leafletPromise;
  }

  window.__leafletPromise = new Promise<LeafletLike>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-visitor-map-leaflet="true"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.L) {
          resolve(window.L);
          return;
        }

        reject(new Error("Leaflet did not load"));
      });
      existingScript.addEventListener("error", () => reject(new Error("Leaflet failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.setAttribute("data-visitor-map-leaflet", "true");
    script.onload = () => {
      if (window.L) {
        resolve(window.L);
        return;
      }

      reject(new Error("Leaflet did not load"));
    };
    script.onerror = () => reject(new Error("Leaflet failed to load"));
    document.body.append(script);
  });

  return window.__leafletPromise;
}

async function loadLeaflet() {
  ensureLeafletStylesheet();
  return loadLeafletScript();
}

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

function normalizeCoordinatesFromLoc(value: string | undefined) {
  if (!value) {
    return { latitude: null, longitude: null };
  }

  const [latitude, longitude] = value.split(",").map((coordinate) => normalizeNumber(coordinate));

  return {
    latitude,
    longitude,
  };
}

function isKnownLocation(city: string | undefined, country: string | undefined) {
  if (!city || !country) {
    return false;
  }

  const normalizedCity = city.trim().toLowerCase();
  const normalizedCountry = country.trim().toLowerCase();

  return normalizedCity !== "unknown city" && normalizedCountry !== "unknown country";
}

function normalizeVisitorCity(location: Partial<VisitorCity>): VisitorCity | null {
  const city = location.city?.trim();
  const country = location.country?.trim();

  if (!city || !country || !isKnownLocation(city, country)) {
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
  const providers = [
    {
      url: "https://get.geojs.io/v1/ip/geo.json",
      parse: (data: IpLookupResponse) => ({
        city: data.city,
        country: data.country,
        latitude: normalizeNumber(data.latitude),
        longitude: normalizeNumber(data.longitude),
      }),
    },
    {
      url: "https://ipwhois.app/json/",
      parse: (data: IpLookupResponse) => ({
        city: data.city,
        country: data.country,
        latitude: normalizeNumber(data.latitude),
        longitude: normalizeNumber(data.longitude),
      }),
    },
    {
      url: "https://api.ip.sb/geoip",
      parse: (data: IpLookupResponse) => ({
        city: data.city,
        country: data.country,
        latitude: normalizeNumber(data.latitude),
        longitude: normalizeNumber(data.longitude),
      }),
    },
    {
      url: "https://ipinfo.io/json",
      parse: (data: IpLookupResponse) => {
        const coordinates = normalizeCoordinatesFromLoc(data.loc);

        return {
          city: data.city,
          country: data.country,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        };
      },
    },
    {
      url: "https://ipapi.co/json/",
      parse: (data: IpLookupResponse) => ({
        city: data.city,
        country: data.country_name ?? data.country,
        latitude: normalizeNumber(data.latitude),
        longitude: normalizeNumber(data.longitude),
      }),
    },
  ];

  for (const provider of providers) {
    try {
      const response = await fetch(provider.url);

      if (!response.ok) {
        continue;
      }

      const data = (await response.json()) as IpLookupResponse;

      if (data.error || data.success === false) {
        continue;
      }

      const location = provider.parse(data);
      const visitorCity = normalizeVisitorCity({
        ...location,
        visit_count: 1,
      });

      if (visitorCity) {
        return visitorCity;
      }
    } catch {
      continue;
    }
  }

  return null;
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

export function VisitorLocationMap() {
  const [locations, setLocations] = useState<VisitorCity[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMapLike | null>(null);
  const markerLayerRef = useRef<LeafletLayerGroupLike | null>(null);

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
        }
      } catch {
        if (isMounted) {
          setHasError(true);
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

  useEffect(() => {
    let isMounted = true;

    async function renderTileMap() {
      if (!mapContainerRef.current) {
        return;
      }

      try {
        const L = await loadLeaflet();

        if (!isMounted || !mapContainerRef.current) {
          return;
        }

        if (!mapInstanceRef.current) {
          mapInstanceRef.current = L.map(mapContainerRef.current, {
            attributionControl: true,
            scrollWheelZoom: false,
            worldCopyJump: true,
            zoomControl: false,
          });

          mapInstanceRef.current.attributionControl?.setPrefix(false);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 7,
            minZoom: 1,
          }).addTo(mapInstanceRef.current);
        }

        if (markerLayerRef.current) {
          markerLayerRef.current.remove();
        }

        markerLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
        const markerLayer = markerLayerRef.current;

        const markerPoints: [number, number][] = [];

        locationsWithCoordinates.forEach((location) => {
          if (location.latitude === null || location.longitude === null) {
            return;
          }

          markerPoints.push([location.latitude, location.longitude]);

          const marker = L.marker([location.latitude, location.longitude], {
            icon: L.divIcon({
              className: styles.visitorMarkerWrapper,
              html: `<span class="${styles.visitorMarkerCount}">${location.visit_count}</span>`,
              iconSize: [34, 34],
            }),
            title: `${location.city}, ${location.country}: ${location.visit_count} visits`,
          }).addTo(markerLayer);

          marker.bindPopup(
            `<strong>${escapeHtml(location.city)}, ${escapeHtml(location.country)}</strong><br />${location.visit_count} visit${location.visit_count === 1 ? "" : "s"}`,
          );
        });

        if (markerPoints.length > 0) {
          mapInstanceRef.current.fitBounds(L.latLngBounds(markerPoints).pad(0.4), {
            maxZoom: 4,
          });
        } else {
          mapInstanceRef.current.setView([20, 0], 1);
        }

        mapInstanceRef.current.invalidateSize();
        setIsMapReady(true);
      } catch {
        if (isMounted) {
          setHasError(true);
          setIsMapReady(false);
        }
      }
    }

    renderTileMap();

    return () => {
      isMounted = false;
    };
  }, [locationsWithCoordinates]);

  useEffect(() => {
    return () => {
      markerLayerRef.current?.remove();
      mapInstanceRef.current?.remove();
    };
  }, []);

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
            {totalVisits > 0
              ? `${totalVisits} visits from ${locations.length} places`
              : "Recent visitor cities and countries"}
          </Text>
        </Column>
      </Row>

      <div className={styles.locationMapFrame}>
        <div ref={mapContainerRef} className={styles.locationTileMap} />
        {!isMapReady && <div className={styles.locationMapFallback} aria-hidden="true" />}
      </div>

      <div className={styles.locationList}>
        {topLocations.map((location) => (
          <div key={`${location.city}-${location.country}`} className={styles.locationItem}>
            <Text variant="label-default-s" onBackground="neutral-strong">
              {location.city}
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {location.country} · {location.visit_count} visit
              {location.visit_count === 1 ? "" : "s"}
            </Text>
          </div>
        ))}
      </div>
    </Column>
  );
}

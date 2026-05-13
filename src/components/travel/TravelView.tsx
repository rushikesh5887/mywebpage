"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import type { TravelCategory, TravelPhoto, TravelPlace } from "@/app/travel/data";
import { withBasePath } from "@/utils/paths";
import styles from "./TravelView.module.css";

type TravelViewProps = {
  places: TravelPlace[];
  photos: TravelPhoto[];
};

type LightboxState = {
  photos: TravelPhoto[];
  index: number;
};

const categoryOrder = ["All", "Lived", "Worked", "Visited"] as const;
const countryCodeByName: Record<string, string> = {
  India: "IN",
  Germany: "DE",
  "Czech Republic": "CZ",
  Austria: "AT",
  Slovakia: "SK",
  France: "FR",
  Italy: "IT",
  "Vatican City": "VA",
  Denmark: "DK",
  Sweden: "SE",
  Norway: "NO",
  "United Arab Emirates": "AE",
  "United States": "US",
  Switzerland: "CH",
  Poland: "PL",
  Estonia: "EE",
  Finland: "FI",
  Latvia: "LV",
  "Saudi Arabia": "SA",
  Netherlands: "NL",
  Luxembourg: "LU",
  Belgium: "BE",
};

type CategoryFilter = (typeof categoryOrder)[number];
type Wonder = {
  name: string;
  country: string;
  note: string;
  photo: TravelPhoto;
};

function toFlagEmoji(country: string) {
  const code = countryCodeByName[country];

  if (!code) {
    return "•";
  }

  return code
    .toUpperCase()
    .split("")
    .map((character) => String.fromCodePoint(127397 + character.charCodeAt(0)))
    .join("");
}

type LeafletLike = {
  divIcon: (options: { className?: string; html: string; iconSize: [number, number] }) => unknown;
  latLngBounds: (points: [number, number][]) => {
    pad: (ratio: number) => unknown;
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
  ) => LeafletMarkerLike;
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

type LeafletMapLike = {
  attributionControl?: {
    setPrefix: (prefix: string | false) => void;
  };
  fitBounds: (bounds: unknown, options?: { maxZoom?: number }) => void;
  invalidateSize: () => void;
  remove: () => void;
  setView: (center: [number, number], zoom: number) => void;
};

type LeafletMarkerLike = {
  addTo: (map: LeafletMapLike) => LeafletMarkerLike;
  bindPopup: (content: string) => LeafletMarkerLike;
  on: (event: string, handler: () => void) => LeafletMarkerLike;
  openPopup: () => void;
  remove: () => void;
};

type TravelMapWindow = Window & {
  L?: unknown;
  __travelLeafletPromise?: Promise<LeafletLike>;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function ensureLeafletStylesheet() {
  const existingStylesheet = document.querySelector('link[data-travel-map-leaflet="true"]');

  if (existingStylesheet) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  link.setAttribute("data-travel-map-leaflet", "true");
  document.head.append(link);
}

function loadLeafletScript() {
  const leafletWindow = window as TravelMapWindow;

  if (leafletWindow.L) {
    return Promise.resolve(leafletWindow.L as unknown as LeafletLike);
  }

  if (leafletWindow.__travelLeafletPromise) {
    return leafletWindow.__travelLeafletPromise;
  }

  leafletWindow.__travelLeafletPromise = new Promise<LeafletLike>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-travel-map-leaflet="true"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (leafletWindow.L) {
          resolve(leafletWindow.L as unknown as LeafletLike);
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
    script.setAttribute("data-travel-map-leaflet", "true");
    script.onload = () => {
      if (leafletWindow.L) {
        resolve(leafletWindow.L as unknown as LeafletLike);
        return;
      }

      reject(new Error("Leaflet did not load"));
    };
    script.onerror = () => reject(new Error("Leaflet failed to load"));
    document.body.append(script);
  });

  return leafletWindow.__travelLeafletPromise;
}

async function loadLeaflet() {
  ensureLeafletStylesheet();
  return loadLeafletScript();
}

function getCategoryClassName(category: TravelCategory) {
  if (category === "Lived") return styles.lived;
  if (category === "Worked") return styles.worked;
  return styles.visited;
}

function createStatValue(value: number) {
  return value.toLocaleString("en-US");
}

function sortPlaces(left: TravelPlace, right: TravelPlace) {
  return (
    left.country.localeCompare(right.country) ||
    left.name.localeCompare(right.name) ||
    left.category.localeCompare(right.category)
  );
}

export default function TravelView({ places, photos }: TravelViewProps) {
  const firstPlace = places[0] ?? null;
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedPlace, setSelectedPlace] = useState<TravelPlace | null>(firstPlace);
  const [selectedLensCountry, setSelectedLensCountry] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMapLike | null>(null);
  const markerRefs = useRef<LeafletMarkerLike[]>([]);

  const filteredPlaces = useMemo(() => {
    if (selectedLensCountry) {
      return places
        .filter((place) => place.country === selectedLensCountry)
        .slice()
        .sort(sortPlaces);
    }

    return (
      activeCategory === "All"
        ? places
        : places.filter((place) => place.category === activeCategory)
    )
      .slice()
      .sort(sortPlaces);
  }, [activeCategory, places, selectedLensCountry]);

  const lensCountries = useMemo(() => {
    return Array.from(
      photos.reduce((map, photo) => {
        const countryPhotos = map.get(photo.country);

        if (countryPhotos) {
          countryPhotos.push(photo);
          return map;
        }

        map.set(photo.country, [photo]);
        return map;
      }, new Map<string, TravelPhoto[]>()),
    )
      .map(([country, countryPhotos]) => ({
        country,
        photos: countryPhotos,
        coverPhoto: countryPhotos[0],
      }))
      .sort((left, right) => left.country.localeCompare(right.country));
  }, [photos]);

  const selectedLensPhotos = selectedLensCountry
    ? photos.filter((photo) => photo.country === selectedLensCountry)
    : [];
  const lightboxPhoto = lightbox?.photos[lightbox.index] ?? null;
  const wonders: Wonder[] = [
    {
      name: "Taj Mahal",
      country: "India",
      note: "Agra - one of the New Seven Wonders of the World.",
      photo: { src: "/images/travel/Agra.webp", title: "Taj Mahal", country: "India" },
    },
    {
      name: "Colosseum",
      country: "Italy",
      note: "Rome - iconic Roman amphitheater and global heritage landmark.",
      photo: { src: "/images/travel/Rome.webp", title: "Colosseum, Rome", country: "Italy" },
    },
    {
      name: "Leaning Tower of Pisa",
      country: "Italy",
      note: "Pisa - historic bell tower known worldwide for its tilt.",
      photo: {
        src: "/images/travel/Pisa.webp",
        title: "Leaning Tower of Pisa",
        country: "Italy",
      },
    },
  ];

  useEffect(() => {
    if (!selectedPlace || !filteredPlaces.some((place) => place.name === selectedPlace.name)) {
      setSelectedPlace(filteredPlaces[0]);
    }
  }, [filteredPlaces, selectedPlace]);

  useEffect(() => {
    if (
      selectedLensCountry &&
      !lensCountries.some(({ country }) => country === selectedLensCountry)
    ) {
      setSelectedLensCountry(null);
    }
  }, [lensCountries, selectedLensCountry]);

  useEffect(() => {
    let isMounted = true;

    async function renderTravelMap() {
      if (!mapContainerRef.current || filteredPlaces.length === 0) {
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
            zoomControl: true,
          });

          mapInstanceRef.current.attributionControl?.setPrefix(false);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 8,
            minZoom: 1,
          }).addTo(mapInstanceRef.current);
        }

        const mapInstance = mapInstanceRef.current;

        for (const marker of markerRefs.current) {
          marker.remove();
        }
        markerRefs.current = [];

        const markerPoints: [number, number][] = [];

        for (const place of filteredPlaces) {
          markerPoints.push([place.lat, place.lng]);

          const isSelected =
            selectedPlace?.name === place.name && selectedPlace?.country === place.country;

          const marker = L.marker([place.lat, place.lng], {
            icon: L.divIcon({
              className: styles.travelMarkerWrapper,
              html: `<span class="${styles.travelMarker} ${getCategoryClassName(place.category)} ${isSelected ? styles.travelMarkerActive : ""}"></span>`,
              iconSize: [18, 18],
            }),
            title: `${place.name}, ${place.country}`,
          }).addTo(mapInstance);

          marker.bindPopup(
            `<strong>${escapeHtml(place.name)}</strong><br />${escapeHtml(place.country)}<br />${escapeHtml(place.category)}`,
          );

          marker.on("click", () => {
            setSelectedPlace(place);
          });

          if (isSelected) {
            marker.openPopup();
          }

          markerRefs.current.push(marker);
        }

        if (markerPoints.length > 0) {
          mapInstanceRef.current.fitBounds(L.latLngBounds(markerPoints).pad(0.18), {
            maxZoom: 4,
          });
        } else {
          mapInstanceRef.current.setView([18, 0], 1);
        }

        mapInstanceRef.current.invalidateSize();

        if (isMounted) {
          setIsMapReady(true);
        }
      } catch {
        if (isMounted) {
          setIsMapReady(false);
        }
      }
    }

    renderTravelMap();

    return () => {
      isMounted = false;
    };
  }, [filteredPlaces, selectedPlace]);

  useEffect(() => {
    return () => {
      for (const marker of markerRefs.current) {
        marker.remove();
      }
      mapInstanceRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!lightbox) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightbox(null);
      }

      if (event.key === "ArrowRight") {
        setLightbox((currentLightbox) =>
          currentLightbox
            ? {
                ...currentLightbox,
                index: (currentLightbox.index + 1) % currentLightbox.photos.length,
              }
            : currentLightbox,
        );
      }

      if (event.key === "ArrowLeft") {
        setLightbox((currentLightbox) =>
          currentLightbox
            ? {
                ...currentLightbox,
                index:
                  (currentLightbox.index - 1 + currentLightbox.photos.length) %
                  currentLightbox.photos.length,
              }
            : currentLightbox,
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  if (!firstPlace || !selectedPlace) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Travel Atlas</p>
            <h1 className={styles.heroTitle}>Travel map data could not be loaded.</h1>
          </div>
        </section>

        <section className={styles.photosSection}>
          <div className={styles.sectionHeader}>
            <h2>Places through my lenses</h2>
          </div>
          <div className={styles.photoGrid}>
            {photos.map((photo, photoIndex) => (
              <button
                key={photo.src}
                type="button"
                className={styles.photoCard}
                onClick={() => setLightbox({ photos, index: photoIndex })}
              >
                <div className={styles.photoImageWrap}>
                  <Image
                    src={withBasePath(photo.src)}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 1080px) 100vw, 25vw"
                    className={styles.photoImage}
                  />
                </div>
                <h3>{photo.title}</h3>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  const countries = new Set(places.map((place) => place.country)).size;
  const continents = new Set(places.map((place) => place.continent)).size;
  const visitedPlaces = filteredPlaces.filter((place) => place.category === "Visited").length;
  const livedPlaces = filteredPlaces.filter((place) => place.category === "Lived").length;
  const workedPlaces = filteredPlaces.filter((place) => place.category === "Worked").length;
  const visitedCountriesList = Array.from(new Set(places.map((place) => place.country))).sort(
    (left, right) => left.localeCompare(right),
  );
  const selectedPlaceImage = selectedPlace.image ? withBasePath(selectedPlace.image) : null;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Travel Atlas</p>
          <h1 className={styles.heroTitle}>Places I&apos;ve been to</h1>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <strong>{createStatValue(places.length)}</strong>
              <span>Places</span>
            </div>
            <div className={styles.statCard}>
              <strong>{createStatValue(countries)}</strong>
              <span>Countries</span>
            </div>
            <div className={styles.statCard}>
              <strong>{createStatValue(continents)}</strong>
              <span>Continents</span>
            </div>
            <div className={styles.statCard}>
              <strong>{createStatValue(photos.length)}</strong>
              <span>Photos</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.travelStage}>
        <div className={styles.mapPanel}>
          <div className={styles.mapHeader}>
            <div className={styles.sectionHeader}>
              <h2>Travel map</h2>
            </div>
            <div className={styles.filters}>
              {categoryOrder.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setSelectedLensCountry(null);
                  }}
                  className={`${styles.filterButton} ${
                    activeCategory === category ? styles.filterActive : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.mapFrame}>
            <div className={styles.mapOverlay}>
              <div className={styles.legend}>
                <span className={styles.legendLabel}>Legend</span>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendSwatch} ${styles.lived}`} />
                  Places lived
                </span>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendSwatch} ${styles.worked}`} />
                  Places studied or worked
                </span>
                <span className={styles.legendItem}>
                  <span className={`${styles.legendSwatch} ${styles.visited}`} />
                  Places visited
                </span>
              </div>

              <div className={styles.mapCounts}>
                <span>{createStatValue(livedPlaces)} lived</span>
                <span>{createStatValue(workedPlaces)} worked</span>
                <span>{createStatValue(visitedPlaces)} visited</span>
              </div>
            </div>

            <div ref={mapContainerRef} className={styles.travelTileMap} />
            {!isMapReady && <div className={styles.mapFallback} aria-hidden="true" />}
          </div>
        </div>

        <aside className={styles.sidePanel}>
          <div className={styles.summaryPanel}>
            <div className={styles.sectionHeader}>
              <h2>Countries visited</h2>
            </div>

            <div className={styles.countryList}>
              {visitedCountriesList.map((country) => {
                return (
                  <div
                    key={country}
                    className={styles.countryRow}
                    title={country}
                    aria-label={country}
                  >
                    <span className={styles.countryFlagOnly}>
                      <span className={styles.countryFlag} aria-hidden="true">
                        {toFlagEmoji(country)}
                      </span>
                      <span className={styles.countryName}>{country}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.detailPanel}>
            <div className={styles.detailImageWrap}>
              {selectedPlaceImage ? (
                <Image
                  src={selectedPlaceImage}
                  alt={selectedPlace.name}
                  fill
                  sizes="(max-width: 1080px) 100vw, 28vw"
                  className={styles.detailImage}
                />
              ) : (
                <div
                  className={styles.detailImageFallback}
                  aria-label={`No specific photo available for ${selectedPlace.name}`}
                >
                  <span className={styles.fallbackFlag} aria-hidden="true">
                    {toFlagEmoji(selectedPlace.country)}
                  </span>
                  <strong>{selectedPlace.name}</strong>
                  <span>{selectedPlace.country}</span>
                </div>
              )}
            </div>
            <div className={styles.detailText}>
              <div className={styles.detailTopline}>
                <span className={styles.pill}>{selectedPlace.category}</span>
                <span className={styles.pill}>{selectedPlace.continent}</span>
              </div>
              <h3>{selectedPlace.name}</h3>
              <p className={styles.detailMeta}>{selectedPlace.country}</p>
              <p className={styles.detailMeta}>{selectedPlace.note}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className={styles.wondersSection}>
        <div className={styles.wondersHeader}>
          <h2>Wonders of the world visited</h2>
          <span className={styles.wondersCount}>3 / 7 wonders visited</span>
        </div>
        <div className={styles.wondersGrid}>
          {wonders.map((wonder, wonderIndex) => (
            <button
              key={wonder.name}
              type="button"
              className={styles.wonderCard}
              onClick={() => setLightbox({ photos: wonders.map((item) => item.photo), index: wonderIndex })}
            >
              <div className={styles.photoImageWrap}>
                <Image
                  src={withBasePath(wonder.photo.src)}
                  alt={wonder.photo.title}
                  fill
                  sizes="(max-width: 1080px) 100vw, 33vw"
                  className={styles.photoImage}
                />
              </div>
              <h3>{wonder.name}</h3>
              <p className={styles.wonderMeta}>{wonder.note}</p>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.lensesSection}>
        <div className={styles.lensesHeader}>
          <div className={styles.sectionHeader}>
            <h2>Places through my lenses</h2>
          </div>
          {selectedLensCountry && (
            <button
              type="button"
              className={styles.lensBackButton}
              onClick={() => {
                setSelectedLensCountry(null);
                setLightbox(null);
              }}
            >
              All countries
            </button>
          )}
        </div>

        {selectedLensCountry ? (
          <>
            <div className={styles.lensesSelectedCountry}>
              <span className={styles.countryFlag} aria-hidden="true">
                {toFlagEmoji(selectedLensCountry)}
              </span>
              <h3>{selectedLensCountry}</h3>
              <span className={styles.pill}>
                {createStatValue(selectedLensPhotos.length)} photos
              </span>
            </div>
            <div className={styles.photoGrid}>
              {selectedLensPhotos.map((photo, photoIndex) => (
                <button
                  key={photo.src}
                  type="button"
                  className={styles.photoCard}
                  onClick={() => setLightbox({ photos: selectedLensPhotos, index: photoIndex })}
                >
                  <div className={styles.photoImageWrap}>
                    <Image
                      src={withBasePath(photo.src)}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 1080px) 100vw, 25vw"
                      className={styles.photoImage}
                    />
                  </div>
                  <h3>{photo.title}</h3>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.lensCountryGrid}>
            {lensCountries.map(({ country, photos: countryPhotos, coverPhoto }) => (
              <button
                key={country}
                type="button"
                className={styles.lensCountryCard}
                onClick={() => {
                  setSelectedLensCountry(country);
                  setActiveCategory("All");
                  setSelectedPlace(places.find((place) => place.country === country) ?? null);
                  setLightbox(null);
                }}
              >
                <div className={styles.photoImageWrap}>
                  <Image
                    src={withBasePath(coverPhoto.src)}
                    alt={coverPhoto.title}
                    fill
                    sizes="(max-width: 1080px) 100vw, 25vw"
                    className={styles.photoImage}
                  />
                </div>
                <h3 className={styles.lensCountryName}>
                  <span className={styles.countryFlag} aria-hidden="true">
                    {toFlagEmoji(country)}
                  </span>
                  {country}
                </h3>
                <span className={styles.lensPhotoCount}>
                  {createStatValue(countryPhotos.length)} photos
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {lightbox && lightboxPhoto && (
        <dialog className={styles.lightbox} aria-label={lightboxPhoto.title} open>
          <button
            type="button"
            className={styles.lightboxBackdrop}
            onClick={() => setLightbox(null)}
            aria-label="Close photo"
          />
          <div className={styles.lightboxPanel}>
            <button
              type="button"
              className={`${styles.lightboxButton} ${styles.lightboxClose}`}
              onClick={() => setLightbox(null)}
              aria-label="Close photo"
            >
              X
            </button>
            <button
              type="button"
              className={`${styles.lightboxButton} ${styles.lightboxPrevious}`}
              onClick={() =>
                setLightbox((currentLightbox) =>
                  currentLightbox
                    ? {
                        ...currentLightbox,
                        index:
                          (currentLightbox.index - 1 + currentLightbox.photos.length) %
                          currentLightbox.photos.length,
                      }
                    : currentLightbox,
                )
              }
              aria-label="Previous photo"
            >
              &lt;
            </button>
            <div className={styles.lightboxImageWrap}>
              <Image
                src={withBasePath(lightboxPhoto.src)}
                alt={lightboxPhoto.title}
                fill
                sizes="100vw"
                className={styles.lightboxImage}
              />
            </div>
            <button
              type="button"
              className={`${styles.lightboxButton} ${styles.lightboxNext}`}
              onClick={() =>
                setLightbox((currentLightbox) =>
                  currentLightbox
                    ? {
                        ...currentLightbox,
                        index: (currentLightbox.index + 1) % currentLightbox.photos.length,
                      }
                    : currentLightbox,
                )
              }
              aria-label="Next photo"
            >
              &gt;
            </button>
            <div className={styles.lightboxCaption}>
              <strong>{lightboxPhoto.title}</strong>
              <span>
                {lightbox.index + 1} / {lightbox.photos.length}
              </span>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

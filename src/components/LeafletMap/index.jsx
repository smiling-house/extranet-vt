// Key-less map (Leaflet + free CARTO tiles) replacing @react-google-maps, whose
// key has the Maps APIs disabled on the GCP project. Plain leaflet, no
// react-leaflet: one effect creates the map, one keeps the marker in sync.
// Identical in extranet-sh and extranet-vt.
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet-map.css";

const TILES = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
const ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const pin = L.divIcon({ className: "lm-pin", html: '<span class="lm-pin-dot"></span>', iconSize: [28, 28], iconAnchor: [14, 28] });

const LeafletMap = ({ lat, lng, zoom = 14, height = 500, circle = false, className = "" }) => {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const valid = Number.isFinite(Number(lat)) && Number.isFinite(Number(lng)) && !(Number(lat) === 0 && Number(lng) === 0);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = L.map(ref.current, { scrollWheelZoom: false, attributionControl: true });
    L.tileLayer(TILES, { attribution: ATTR, maxZoom: 19, subdomains: "abcd" }).addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; markerRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !valid) return;
    const ll = [Number(lat), Number(lng)];
    map.setView(ll, zoom);
    if (markerRef.current) markerRef.current.remove();
    markerRef.current = circle
      ? L.circle(ll, { radius: 400, color: "#0e7ca8", fillColor: "#44c8f5", fillOpacity: 0.25, weight: 2 }).addTo(map)
      : L.marker(ll, { icon: pin }).addTo(map);
    setTimeout(() => map.invalidateSize(), 50);
  }, [lat, lng, zoom, circle, valid]);

  if (!valid) return <div className={`lm-empty ${className}`} style={{ height }}>No coordinates on this listing.</div>;
  return <div ref={ref} className={`lm-map ${className}`} style={{ height, width: "100%" }} />;
};

export default LeafletMap;

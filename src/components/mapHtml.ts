export function buildMapHtml(opts: { accent: string; dark: boolean }): string {
  const { accent, dark } = opts;
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>
  html, body, #map { height: 100%; margin: 0; padding: 0; }
  body { background: #F1F1EE; -webkit-tap-highlight-color: transparent; }
  body.dark { background: #141414; }
  #map { background: transparent; }
  .leaflet-container { font-family: -apple-system, Roboto, sans-serif; background: transparent; }
  .leaflet-bar { border: none !important; box-shadow: none !important; }
  .leaflet-bar a, .leaflet-bar a:hover {
    width: 44px; height: 44px; line-height: 42px; font-size: 22px; border: none !important; border-radius: 22px !important;
    margin-bottom: 8px; background: #FFFFFF; color: #2B2B2B; box-shadow: 0 2px 10px rgba(0,0,0,.14);
  }
  body.dark .leaflet-bar a, body.dark .leaflet-bar a:hover { background: #2A2A2A; color: #F2F2EE; }
  .leaflet-control-attribution {
    background: rgba(255,255,255,.85) !important; color: #6E6E6A !important; border-radius: 12px; padding: 2px 8px !important;
    font-size: 10px !important; margin: 8px !important;
  }
  body.dark .leaflet-control-attribution { background: rgba(30,30,30,.85) !important; color: #A3A39E !important; }
  .pin { box-sizing: border-box; width: 22px; height: 22px; margin: 4px; border-radius: 50%; background: ${accent};
         border: 3px solid #FFFFFF; box-shadow: 0 2px 8px rgba(0,0,0,.35); }
  .pin.sel { width: 30px; height: 30px; margin: 0; background: #2B2B2B; }
  .pin.new { background: #FFFFFF; border-color: ${accent}; }
  .me { box-sizing: border-box; width: 16px; height: 16px; margin: 7px; border-radius: 50%; background: #2B2B2B;
        border: 3px solid #FFFFFF; box-shadow: 0 0 0 8px rgba(43,43,43,.15); }
</style>
</head>
<body class="${dark ? 'dark' : ''}">
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function () {
  function post(o) {
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(o));
  }
  if (typeof L === 'undefined') { post({ type: 'error' }); return; }

  var map = L.map('map', { zoomControl: false, attributionControl: true }).setView([52.1, 19.4], 6);
  L.control.zoom({ position: 'topright' }).addTo(map);
  map.attributionControl.setPrefix(false);
  map.attributionControl.setPosition('topleft');

  var tiles = null;
  function setTheme(isDark) {
    document.body.className = isDark ? 'dark' : '';
    if (tiles) map.removeLayer(tiles);
    var style = isDark ? 'dark_all' : 'light_all';
    tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/' + style + '/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd', maxZoom: 19, attribution: '\\u00A9 OpenStreetMap \\u00B7 \\u00A9 CARTO'
    }).addTo(map);
  }

  var markers = {};
  var spotsCache = [];
  var selectedId = null;
  var pendingMarker = null;
  var meMarker = null;

  function icon(cls) {
    return L.divIcon({ className: '', html: '<div class="pin ' + cls + '"></div>', iconSize: [30, 30], iconAnchor: [15, 15] });
  }
  function refreshIcons() {
    for (var id in markers) {
      markers[id].setIcon(icon(id === selectedId ? 'sel' : ''));
      markers[id].setZIndexOffset(id === selectedId ? 1000 : 0);
    }
  }
  function setSpots(list) {
    for (var k in markers) { map.removeLayer(markers[k]); }
    markers = {};
    spotsCache = list;
    list.forEach(function (s) {
      var m = L.marker([s.lat, s.lng], { icon: icon(s.id === selectedId ? 'sel' : '') }).addTo(map);
      m.on('click', function () { post({ type: 'select', id: s.id }); });
      markers[s.id] = m;
    });
  }
  function setPending(lat, lng) {
    if (pendingMarker) map.removeLayer(pendingMarker);
    pendingMarker = L.marker([lat, lng], { icon: icon('new'), interactive: false, zIndexOffset: 2000 }).addTo(map);
  }
  function clearPending() {
    if (pendingMarker) { map.removeLayer(pendingMarker); pendingMarker = null; }
  }
  function setMe(lat, lng) {
    if (meMarker) map.removeLayer(meMarker);
    meMarker = L.marker([lat, lng], {
      icon: L.divIcon({ className: '', html: '<div class="me"></div>', iconSize: [30, 30], iconAnchor: [15, 15] }),
      interactive: false
    }).addTo(map);
  }
  function fit() {
    var pts = spotsCache.map(function (s) { return [s.lat, s.lng]; });
    if (pts.length === 1) map.setView(pts[0], 15);
    else if (pts.length > 1) map.fitBounds(pts, { padding: [60, 60], maxZoom: 16 });
    else map.setView([52.1, 19.4], 6);
  }

  map.on('click', function (e) {
    setPending(e.latlng.lat, e.latlng.lng);
    post({ type: 'tap', lat: e.latlng.lat, lng: e.latlng.lng });
  });

  window.handle = function (m) {
    switch (m.type) {
      case 'theme': setTheme(!!m.dark); break;
      case 'spots': setSpots(m.list || []); break;
      case 'fit': fit(); break;
      case 'center': map.setView([m.lat, m.lng], m.zoom || 15); break;
      case 'me': setMe(m.lat, m.lng); break;
      case 'pending': setPending(m.lat, m.lng); break;
      case 'clearPending': clearPending(); break;
      case 'highlight': selectedId = m.id || null; refreshIcons(); break;
    }
  };

  setTheme(${dark ? 'true' : 'false'});
  window.addEventListener('resize', function () { map.invalidateSize(); });
  setTimeout(function () { map.invalidateSize(); }, 150);
  post({ type: 'ready' });
})();
</script>
</body>
</html>`;
}

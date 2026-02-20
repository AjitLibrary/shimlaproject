export let map;

export function initMap() {
  mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [77.17, 31.10],
    zoom: 13
  });
}

export function addLayer(geojson) {
  if (map.getSource('points')) {
    map.getSource('points').setData(geojson);
    return;
  }

  map.addSource('points', {
    type: 'geojson',
    data: geojson
  });

  map.addLayer({
    id: 'circles',
    type: 'circle',
    source: 'points',
    paint: {
      'circle-radius': 6,
      'circle-color': [
        'match',
        ['get', 'type'],
        'library', '#1f78b4',
        'hotel', '#33a02c',
        'govt', '#e31a1c',
        '#999'
      ]
    }
  });
}

export function highlightYear(year) {
  if (!year) {
    map.setPaintProperty('circles', 'circle-color', [
      'match',
      ['get', 'type'],
      'library', '#1f78b4',
      'hotel', '#33a02c',
      'govt', '#e31a1c',
      '#999'
    ]);
    return;
  }

  map.setPaintProperty('circles', 'circle-color', [
    'case',
    ['==', ['get', 'year'], year],
    '#ffff00',
    '#cccccc'
  ]);
}

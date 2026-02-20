import { data } from './data.js';
import { initMap, addLayer, map, highlightYear } from './map.js';
import { applyFilters } from './filters.js';
import { startAnimation, stopAnimation } from './timeline.js';
import { drawChart } from './chart.js';

const slider = document.getElementById("yearSlider");
const yearText = document.getElementById("yearValue");
const typeFilter = document.getElementById("typeFilter");
const searchBox = document.getElementById("searchBox");
const countText = document.getElementById("count");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");

let interval = null;

initMap();

map.on('load', () => {
  update();
});

function convertToGeoJSON(data) {
  return {
    type: "FeatureCollection",
    features: data.map(d => ({
      type: "Feature",
      properties: d,
      geometry: {
        type: "Point",
        coordinates: [d.lng, d.lat]
      }
    }))
  };
}

function update() {
  const year = parseInt(slider.value);
  const type = typeFilter.value;
  const search = searchBox.value;

  yearText.innerText = year;

  const filtered = applyFilters(data, year, type, search);
  countText.innerText = "Total: " + filtered.length;

  addLayer(convertToGeoJSON(filtered));

  drawChart(filtered, highlightYear);
}

slider.addEventListener("input", update);
typeFilter.addEventListener("change", update);
searchBox.addEventListener("input", update);

playBtn.addEventListener("click", () => {
  if (!interval) {
    interval = startAnimation(slider, update);
  }
});

pauseBtn.addEventListener("click", () => {
  stopAnimation(interval);
  interval = null;
});

export function applyFilters(data, year, type, search) {
  return data.filter(item => {
    return item.year <= year &&
      (type === "all" || item.type === type) &&
      item.name.toLowerCase().includes(search.toLowerCase());
  });
}

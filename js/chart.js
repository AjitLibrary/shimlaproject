export function drawChart(data, onHoverYear) {

  const counts = {};
  data.forEach(d => {
    counts[d.year] = (counts[d.year] || 0) + 1;
  });

  const chartData = Object.keys(counts).map(year => ({
    year: +year,
    count: counts[year]
  })).sort((a, b) => a.year - b.year);

  d3.select("#chart").html("");

  const width = 260;
  const height = 160;
  const margin = { top: 10, right: 10, bottom: 20, left: 30 };

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleLinear()
    .domain(d3.extent(chartData, d => d.year))
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(chartData, d => d.count)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.count));

  svg.append("path")
    .datum(chartData)
    .attr("fill", "none")
    .attr("stroke", "#1f78b4")
    .attr("stroke-width", 2)
    .attr("d", line);

  const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("background", "white")
    .style("padding", "5px")
    .style("border", "1px solid #ccc")
    .style("display", "none")
    .style("font-size", "12px");

  svg.selectAll("circle")
    .data(chartData)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.count))
    .attr("r", 4)
    .attr("fill", "#e31a1c")

    .on("mouseover", (event, d) => {
      tooltip.style("display", "block")
        .html(`Year: ${d.year}<br>Count: ${d.count}`);
      onHoverYear(d.year);
    })
    .on("mousemove", (event) => {
      tooltip.style("left", event.pageX + 5 + "px")
             .style("top", event.pageY - 20 + "px");
    })
    .on("mouseout", () => {
      tooltip.style("display", "none");
      onHoverYear(null);
    });
}

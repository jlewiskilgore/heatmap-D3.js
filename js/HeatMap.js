var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json;

	var height = 600;
	var width = 600;

	d3.select(".heatmap-title").text("Heat Map of Global Temperatures");

	var svg = d3.select(".heatmap")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "0 0 550 550");
});
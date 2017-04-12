var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json;
	var dataSetMonthlyVariance = dataSet.monthlyVariance;

	var varianceData = dataSetMonthlyVariance.map(function(data) {
		return data.variance;
	});

	var yearData = dataSetMonthlyVariance.map(function(data) {
		return data.year;
	})

	console.log(varianceData);
	console.log(yearData);

	var baseTemperature = dataSet.baseTemperature;
	var minTempVariance = d3.min(varianceData);
	var maxTempVariance = d3.max(varianceData);

	console.log(baseTemperature);
	console.log(minTempVariance);
	console.log(maxTempVariance);

	var height = 600;
	var width = 600;

	var colors = ["blue", "lightblue", "green", "lightgreen", "yellow", "lightorange", "orange", "lightred", "red"];

	d3.select(".heatmap-title").text("Heat Map of Global Temperatures");

	var svg = d3.select(".heatmap")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "0 0 550 550");

	var colorScale = d3.scaleQuantize()
		.domain([baseTemperature + minTempVariance, baseTemperature + maxTempVariance])
		.range(colors);

	for(var i = 0; i < varianceData.length; i++) {
		console.log(yearData[i] + " " + colorScale(varianceData[i]+baseTemperature));
	}

	// X Axis
	var xScale = d3.scaleLinear()
		.domain([1750, 2015])
		.range([0, 400]);

	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(10);

	svg.append("g")
		.attr("transform", "translate(75," + 450 + ")")
		.call(xAxis);


	// Y Axis
	var yScale = d3.scaleLinear()
		.domain([1, 12])
		.range([0, 400]);

	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(10);

	svg.append("g")
		.attr("transform", "translate(75," + 50 + ")")
		.call(yAxis);

});
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
	var width = 1300;

	var colors = ["blue", "lightblue", "green", "lightgreen", "yellow", "gold", "orange", "lightred", "red"];

	d3.select(".heatmap-title").text("Heat Map of Global Temperatures");

	var svg = d3.select(".heatmap")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "200 0 800 600");

	var colorScale = d3.scaleQuantize()
		.domain([baseTemperature + minTempVariance, baseTemperature + maxTempVariance])
		.range(colors);

	for(var i = 0; i < varianceData.length; i++) {
		console.log(yearData[i] + " " + colorScale(varianceData[i] + baseTemperature));
	}

	var rects = svg.selectAll("rect")
		.data(dataSetMonthlyVariance)
		.enter()
		.append("rect")
		.attr("x", function(d, i) {
			return ((d.year) - 1675 + (i/4));
		})
		.attr("y", function(d, i) {
			return ((d.month) * 38 + 15);
		})
		.attr("width", 5)
		.attr("height", 30)
		.style("fill", function(d) {
			return colorScale(d.variance + baseTemperature);
		});


	// X Axis
	var xScale = d3.scaleLinear()
		.domain([1750, 2015])
		.range([0, 1055]);

	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(25)
		.tickFormat(d3.format('0000'));

	svg.append("g")
		.attr("transform", "translate(75," + 500 + ")")
		.call(xAxis);


	// Y Axis
	var yScale = d3.scaleLinear()
		.domain([1, 12])
		.range([0, 450]);

	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(10);

	svg.append("g")
		.attr("transform", "translate(75," + 50 + ")")
		.call(yAxis);

});
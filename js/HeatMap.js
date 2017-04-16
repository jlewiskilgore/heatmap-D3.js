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

	var colors = ["blue", "lightblue", "green", "lightgreen", "yellow", "gold", "orange", "tomato", "red"];

	var div = d3.select(".heatmap-title").text("Heat Map of Global Temperatures")
		.append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);


	d3.select(".heatmap-description").text("Data from Years 1753 to 2015 (Base Temperature of 8.66 degrees Celsius)");

	var svg = d3.select(".heatmap")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "200 0 800 600");

	var colorScale = d3.scaleQuantize()
		.domain([baseTemperature + minTempVariance, baseTemperature + maxTempVariance])
		.range(colors);

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
		})
		.on("mouseover", function(d) {
			div.transition()
				.duration(200)
				.style("opacity", 1);
			div.html("Date: " + months[d.month - 1] + " " + d.year + "<br/>"
				+ "Monthly Variance: " + d.variance)
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY) + "px");
		})
		.on("mouseout", function(d) {
			div.transition()
				.duration(200)
				.style("opacity", 0);
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

	svg.append("text")
		.style("text-anchor", "middle")
		.attr("transform", "translate(600," + 550 +")")
		.text("Year");


	// Y Axis
	var yScale = d3.scaleLinear()
		.domain([1, 12])
		.range([0, 450]);

	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(0);

	svg.append("g")
		.attr("transform", "translate(75," + 50 + ")")
		.call(yAxis);

	svg.append("text")
		.style("text-anchor", "end")
		.attr("transform", "translate(0, 250)rotate(-90)")
		.text("Month");

	// Month Labels
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	for(var i=0; i<months.length; i++) {
		svg.append("text")
			.attr("x", 40)
			.attr("y", 75 + (i * 38))
			.attr("text-anchor", "left")
			.text(months[i]);
	}

});

	var projection = d3.geo.mercator().scale(100)//.center([cities["houston"].lat,cities["houston"].lng])
	var path = d3.geo.path()
	    .projection(projection);

	d3.json("world.json", function(error, world) {
		var svg = d3.select("svg").append("g")
		console.log(world)
		svg.append("clipPath")
			.attr("id","svgPath")
		  .append("path")
	      .datum(topojson.feature(world, world.objects.land))
	      .attr("class", "land")
	      .attr("d", path)
	});
	
	function blur() {
	  filter.attr("stdDeviation", this.value / 5);
	}
	
	function drawCityDot(city,opacity,svg){
		var color = colorArray[Math.round(Math.random()*colorArray.length)]
		var size = Math.random()*8
		var cityCoordinates = [parseFloat(cities[city].lng),parseFloat(cities[city].lat)]
		var projectedCoordinates = projection(cityCoordinates); 
		svg.append("g").append("circle")
			.attr("cx",projectedCoordinates[0])
			.attr("cy",projectedCoordinates[1])
			.attr("r",size)
			.attr("opacity",opacity)
			.attr("fill",color)
			.attr("filter","url(#blur)")
			.attr("class",city)
			.on("mouseover",function(){
				console.log(city)
			})
	}
	var newyork = [-74.135550, 40.867082]
	var svg = d3.select("svg").append("g")	
	var defs = svg.append("defs")
	var filter = svg.append("defs")
		.append("filter")
		.attr("id", "blur")
		.append("feGaussianBlur")
		.attr("stdDeviation",5);
	//set colors later for todo cities and done cities
	var colorArray = ["#D54363","#E44718","#AF5140","#EC6C4F","#D73C45","#BE4729","#E7332E"]
	//draw all cities in cities list
	for(var i in cities){
		drawCityDot(i,.03,svg)
	}
	var london = [51.500225, -0.115675]
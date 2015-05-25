var projection = d3.geo.mercator().scale(240).center([-52, 50])
var path = d3.geo.path()
    .projection(projection);

d3.json("world.json", function(error, world) {	
	var svg = d3.select("svg").append("g")
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
function toTitleCase(str){
	var words = str.split("_")
	for(var word in words){
		words[word] = words[word].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	return words.join(" ")
}
function drawCityDot(city,opacity,svg){
	var color = colorArray[Math.round(Math.random()*(colorArray.length-1))]
	var size = Math.random()*12
	var cityCoordinates = [parseFloat(cities[city].lng),parseFloat(cities[city].lat)]
	var projectedCoordinates = projection(cityCoordinates);
	var defs = svg.append("defs")
	var filter = svg.append("defs")
		.append("filter")
		.attr("id", "blur")
		.append("feGaussianBlur")
		.attr("stdDeviation",size/5);
	svg.call(tip)
	svg.append("g").append("circle")
		.attr("cx",projectedCoordinates[0])
		.attr("cy",projectedCoordinates[1])
		.attr("r",size)
		.attr("opacity",opacity)
		.attr("fill",color)
		.attr("filter","url(#blur)")
		.attr("class",city)
		.on("mouseover",function(){
			d3.select(this).attr("opacity",.3)
			tip.html(toTitleCase(city)+": ## maps")
			tip.show()
		})
		.on("mouseout",function(){
			d3.select(this).attr("opacity",0.3)
			tip.hide()
		})
}
var newyork = [-74.135550, 40.867082]
var tip = d3.tip()
	.attr('class', 'tip-text')
	.offset([0, 0])
//set colors later for todo cities and done cities
var colorArray = ["#9FD9DA","#DEC578","#DBBFD5","#EBAD90","#A1DDAF","#D5CFB3","#C3E088"]
//draw all cities in cities list
var svg = d3.select("svg").append("g")

for(var i in cities){
	drawCityDot(i,.2,svg)
}

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var margin = {
  top: 50,
  right: 100,
  bottom: 40,
  left: 40
};

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth > 1200 ? 1200 : w.innerWidth || +e.clientWidth || g.clientWidth,
    height = +w.innerHeight|| e.clientHeight|| g.clientHeight;

initData();
function initData(){
  d3.json("100000_full.json", function(error, data) {
      if (error) throw error;
      var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");
      createMap(svg, data);
  });
}

function createMap(svg, data) {
    var mapContainer = svg.append('g');

    var projection = d3.geoMercator()
        .fitSize([width, height], data);

    var path = d3.geoPath()
        .projection(projection);

    // append country outlines
    var countries = mapContainer.selectAll('.country')
        .data(data.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)

countries.on("mouseover", stateShow)
  .on("mouseout", function(d, i) {
      hideState()
  });

function getProvinceCoors(name){
    for(var i=0; i<data.features.length; i++){
      if(data.features[i].properties.brief==name) return data.features[i].properties.centroid
    }
    return [0,0]
}
var totalMax = d3.max(provinceData, function(d){return d[1]});
var ratioR = d3.scaleLinear()
            .domain([0, totalMax])
            .range([0,1000]);

function getNumByName(name){
  for(var i=0; i<provinceData.length; i++){
    if(provinceData[i][0]==name) return provinceData[i][1]+provinceData[i][2]
  }
  return 0
}

//省级文字
svg.selectAll("text")
  .data(data.features)
  .enter()
  .append("text")
  .attr("fill",function(d){
    return "#696666"
  })
  .text(function(d){
    if(d.properties.brief=="香港"||d.properties.brief=="澳门"||d.properties.brief=="台湾"||d.properties.brief==null) {
      return "";
    } else {
      return d.properties.brief;
    }})
  .attr("x",function(d){
    var coors = projection(d.properties.centroid)
    return coors[0];
  })
  .attr("y",function(d){
    var coors = projection(d.properties.centroid)
    return coors[1];
  })
  .attr("font-size",10)
  .attr("text-anchor",function(d){
    return "middle"
  })
  .attr("dy",5)
  .attr("dx",0)
  .attr("font-weight",400)

//省的etc-圆圈
var changeBubble = svg.selectAll("circle")
      .data(provinceData)
      .enter()
      .append("circle")
      .attr("stroke",function(){
        return "#d4644e"
      })
      .attr("stroke-width",2)
      .attr("fill",function(){
        return "rgba(227,154,140,0.4)"
      })
      .attr("r",function(d){
        return ratioR(w.innerWidth > 500 ? Math.sqrt(d[2])/50 : Math.sqrt(d[2])/80)
      })
      .attr("cx",function(d){
        var coors = projection(getProvinceCoors(d[0]))
        return coors[0]
      })
      .attr("cy",function(d){
        var coors = projection(getProvinceCoors(d[0]))
        return coors[1]
      })
      .on("mouseover", bubbleShow)
      .on("mouseout", hideState);

//图例
var legend = svg.append("g")
    .attr("transform","translate("+(width-480)/2+","+(height-200)+")");

legend.append("text")
      .attr("fill", "#333")
      .text("ETC用户数")
      .attr("x",w.innerWidth > 500 ? 90 : 110)
      .attr("y",90)
      .attr("font-size",12)
      .attr("dy",5)
      .attr("font-weight",900)

legend.append("circle")
      .attr("stroke", "#d4644e")
      .attr("stroke-width",2)
      .attr("fill", "rgba(227,154,140,0.4)")
      .attr("r", ratioR(w.innerWidth > 500 ? Math.sqrt(1000)/40 : Math.sqrt(1000)/80))
      .attr("cx",200)
      .attr("cy",90)

legend.append("text")
      .attr("fill", "#333")
      .text("500万")
      .attr("x",200)
      .attr("y",90)
      .attr("font-size",12)
      .attr("dy",5)
      .attr("text-anchor", "middle")

svg.append("g").append("image")
    .attr("xlink:href", "hand.png")
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", (width-180)/2)
    .attr("y",70);

svg.append("g").append("text")
    .text("点击地图了解各地详情")
    .attr("x",(width-180)/2 + 25)
    .attr("y",75)
    .attr("dy",12)
    .style("font-size",10)

    function stateShow(d) {
      for ( var i = 0; i < provinceData.length; i++) {
        if (this.__data__.properties.brief == provinceData[i][0]) {
          if (provinceData[i][4].length != 0) {
            showStatePopup(provinceData[i])
          } else {
            showStatePopup(provinceData[i])
          }
        }
      }
    }
    
    function bubbleShow(d) {
      if (d[4].length != 0) {
        showStatePopup(d)
      } else {
        showStatePopup(d)
      }
    }


function showStatePopup(d){
  var currentYear = year_i < 1 ? 0 : etc[year_i - 1][0];
  console.log(currentYear)
  var tooltip = d3.select(".tooltip")
        .html("<p class='province'>" + d[0] + " <span class='year'> " + currentYear + "年</span></p> <p class='intro'>" + d[year_i] + "万ETC用户</p>");

  var mouse = getMousePos()
  var x = mouse.x
  if(x > width-5) x = width-5
  var y = mouse.y
  $(".tooltip").css("left", x).css("top",y+10).show();
}

function hideState() {
  $(".tooltip").hide();
}

function getMousePos() {
  return {'x': d3.event.pageX,'y': d3.event.pageY}
}

// year
var year_text = svg.append("text")
.attr("fill", "#000")
.text("2012年")
.attr("x",function(d){ return width/2 })
.attr("y",function(d){ return 20 })
.attr("font-size",24)
.attr("dy",30)
.attr("text-anchor","middle")
.attr("font-weight",900);

var year_i = 0; 
setInterval(function(d) {
  year_i = year_i > 14 ? 0 : year_i;
  
  draw()

  // rewrite description
  $("#perYear").html(etc[year_i][1])

  year_i++;
}, 2000)

function draw() {
  if (year_i == 0) {
    // redraw the bubbles
    changeBubble.transition().duration(1000)
    .attr("r",function(d){
      // console.log(d[year_i])
      return ratioR(w.innerWidth > 500 ? Math.sqrt(d[1])/50 : Math.sqrt(d[1])/80);
    })
  } else {
    changeBubble.transition().duration(1000)
    .attr("r",function(d){
      // console.log(d[year_i])
      return ratioR(w.innerWidth > 500 ? Math.sqrt(d[year_i])/50 : Math.sqrt(d[year_i])/80);
    })
  }

  // rewrite year
  year_text.transition().duration(1000)
  .text(etc[year_i][0] + "年")
  }
}


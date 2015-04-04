// start slingin' some d3 here.


//setup the gameboard
var gameOptions = {
  height: 500,
  width: 500,
  nEnemies: 10,
  padding: 20
}

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
}

d3.select('.gameboard').append('svg:svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)


var createEnemies = function() {
  var enemyArr = [];
  for (var i = 0; i < gameOptions.nEnemies; i++) {
    enemyArr.push({
      id: i,
      x:Math.random()*100 ,
      y:Math.random()*100
    })
  }
  return enemyArr;
}

var enemies = createEnemies();

//load enemies into svg canvas
d3.select('svg').selectAll('circle').data(enemies)
  .enter().append('circle')
  .attr('cx', function(d){return axes.x(d.x)})
  .attr('cy', function(d){return axes.y(d.y)})
  .attr('r', 15)

//setup dragging
var onDragDrop = function(dragHandler) {
  var drag = d3.behavior.drag();
  drag.on("drag", dragHandler)
  return drag;
}

var dragmove = function(d) {
  d3.select(this)
  .attr("x", d.x = d3.event.x)
  .attr("y", d.y = d3.event.y)
}

//load player onto svg canvas
d3.select('svg').selectAll('rect').data([1]).enter()
  .append("rect")
  .attr("x", function(d){return d.x})
  .attr("y", function(d){return d.y})
  .attr("width", 50)
  .attr("height", 50)
  .attr("fill", 'green')
  .call(onDragDrop(dragmove));



//function to move enemies to new coordinates
var moveEnemy = function(){
d3.select('svg').selectAll('circle').data(createEnemies())
  .transition()
  .ease('exp')
  .attr('cx', function(d){return axes.x(d.x)})
  .attr('cy', function(d){return axes.y(d.y)})
  .attr('r', 15)
}




setInterval(moveEnemy, 1000);


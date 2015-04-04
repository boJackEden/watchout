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

d3.select('svg').selectAll('circle').data(enemies)
  .enter().append('circle')
  .attr('cx', function(d){return axes.x(d.x)})
  .attr('cy', function(d){return axes.y(d.y)})
  .attr('r', 15)



var moveEnemy = function(){
d3.select('svg').selectAll('circle').data( createEnemies() )
  .transition()
  .delay(1500)
  .attr('cx', function(d){return axes.x(d.x)})
  .attr('cy', function(d){return axes.y(d.y)})
  .attr('r', 15)
}
setInterval(moveEnemy, 2000);


//populate with enemies
// d3.select("svg").append("svg")
//   .attr("width", 50)
//   .attr("height", 50)
//   .append("circle")
//   .data(enemies)
//   .attr("cx", function(d){d.x})
//   .attr("cy", function(d){d.y})
//   .attr("r", 25)
//   .style("fill", "purple");


// var render = function(enemies){
//   var enemies = d3.gameboard.selectAll('').data(enemies,
//                     function(d){d.id});

//   enemies.enter().append("svg:circle").attr('class', 'enemy')
//   .attr('cx', function(enemy){axes.x(enemy.x)})
//   .attr('cy', function(enemy){axes.y(enemy.y)})
//   .attr('r', 10)

//   enemies.exit()
//   .remove();
// }
// var testArray = createEnemies();
// render( testArray );




//setup the player


//setup collisions and updating scoreboardx`

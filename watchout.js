// start slingin' some d3 here.


//setup the gameboard
var gameOptions = {
  height: 500,
  width: 1000,
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
      y:Math.random()*100,
      r: 15
    })
  }
  return enemyArr;
}

var enemies = createEnemies();

//load enemies into svg canvas
var initialEnemies = d3.select('svg').selectAll('circle').data(enemies)
  .enter().append('circle')
  .attr('cx', function(d){return axes.x(d.x)})
  .attr('cy', function(d){return axes.y(d.y)})
  .attr('r', function(d){return d.r})

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
d3.select('svg').selectAll('circle').data(initialEnemies)
  .transition()
  .duration(1500)
  .tween("custom", moveAndCollide)
  .ease('exp')
  .attr('cx', function(d){return axes.x(d.x)})
  .attr('cy', function(d){return axes.y(d.y)})
  .attr('r', function(d){return d.r})
}

var moveAndCollide = function(){
  var enemy = d3.select(this);
  var startPos = {
    "x": parseFloat(enemy.attr("cx")),
    "y": parseFloat(enemy.attr("cy"))
  }
  var endPos = {

  }
}



setInterval(moveEnemy, 1500);

//setup scoreboard
var scoreBoard = {
  high: 0,
  current: 10,
  collisions: 0
}



//increment scoreboard
setInterval(function(){
  scoreBoard.current++;
d3.select('.current').selectAll('span')
  .text(scoreBoard.current)
}, 50)

var collided = function() {
  //load current high score
  if (scoreBoard.high < scoreBoard.current) {
    scoreBoard.high = scoreBoard.current
  }
  //update .high span with high score
  d3.select('.high').selectAll('span')
    .text(scoreBoard.high)
  //reset current score
  scoreBoard.current = 0;
  //increment  collision
  scoreBoard.collisions++;

  d3.select('.collisions').selectAll('span')
  .text(scoreBoard.collisions)
};

// d3.selectAll('circle')
// .tween('custom', function(){
//   var enemy = d3.select(this);
//   console.log(enemy.attr('cx'))
//   return function(t) {
//     console.log(enemy.attr('cx'))
//   }
// })
//in our interval function.
  //query dom for an array of x and y position of enemies.
  //iterate over the array.
    //for each iteration query the position of the player.
    //plug into pyth pag ther.
    //if collision, run our collided func.


// var enemyX =

// for(var i=0; i<enemyX.length;)
// var checkCollision = function(enemy, trigger){
//   var touching = 30;
//   var xDiff = parseFloat(//need current enemy position - current player posi)
// }








































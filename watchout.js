// start slingin' some d3 here.


//setup the gameboard
var gameOptions = {
  height: 500,
  width: 1000,
  nEnemies: 30,
  padding: 5
}


var axes = {
  x: d3.scale.linear().domain([0,100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
}

d3.select('.gameboard').append('svg:svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)
  .attr("xlink:href", 'stars.jpg')


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
  .enter().append('svg:image')
  .attr("class", "freds")
  .attr('x', function(d){return axes.x(d.x)})
  .attr('y', function(d){return axes.y(d.y)})
  .attr('r', function(d){return d.r})
  .attr("width", 50)
  .attr("height", 50)
  .attr("xlink:href", "fred.png")

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

var player = d3.select('svg').selectAll('rect').data([1]).enter()
  .append("rect")
  .attr("x", function(d){return d.x})
  .attr("y", function(d){return d.y})
  .attr("width", 25)
  .attr("height", 25)
  .attr("fill", 'green')
  .call(onDragDrop(dragmove));





//function to move enemies to new coordinates
var moveAndCollide = function(){
  var enemy = d3.select(this);
  var startPos = {
    "x": parseFloat(enemy.attr("x")),
    "y": parseFloat(enemy.attr("y"))
  }
  var endPos = {
    "x": axes.x(Math.random()*100),
    "y": axes.y(Math.random()*100)
  }
  return function(t){
    var nextEnemyPos = {
      "x": startPos.x + (endPos.x - startPos.x)*t,
      "y": startPos.y + (endPos.y - startPos.y)*t
    };
    enemy.attr("x", nextEnemyPos.x);
    enemy.attr("y", nextEnemyPos.y);
    checkCollision(enemy);
  }
}
var moveEnemy = function(){
d3.select('svg').selectAll('image').data(enemies)
  .transition()
  .duration(1500)
  .tween("custom", moveAndCollide)
}
setInterval(moveEnemy, 1500);


var checkCollision = function(enemy){
  var radiusSum = enemy.attr('r');
  xDiff = parseFloat(enemy.attr("x") - player.attr("x"));
  yDiff = parseFloat(enemy.attr("y") - player.attr("y"));
  separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
  if(separation < radiusSum){
    collided();
  }
}


//setInterval(moveEnemy, 1500);

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
}, 100)

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








































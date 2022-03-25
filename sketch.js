let startScreen = true
let endScreen = false
let heart;

// player variables
let x = 400
let y = 400
let size = 50
let speed = 4
let lives = 3

// each obstacle is a dictionary
// {x, y, xInc, yInc}
let obstacles = []
let obstacleSize = 50
let obstacleSpeed = 2
let obstacleSpeedIncrease = 0.1

let frame = 1
let spawnRate = 100

let score = 0

function preload()
{
  heart = loadImage('heart.png')
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  
  if (keyIsDown(69)) // easy
    {
      startScreen = false
      lives = 8
    }
  if (keyIsDown(77)) // medium
    {
      startScreen = false
      lives = 5
    }
  if (keyIsDown(72)) // hard
    {
      startScreen = false
      lives = 3
    }
  if (keyIsDown(73)) // insane
    {
      startScreen = false
      lives = 1
    }
  
  if (startScreen) // start screen
    {
      background('grey')
      fill('white')
      textSize(60)
      text('INSTRUCTIONS:', 160, 200)
      textSize(24)
      text('Use the arrow keys or WASD to move around the area.\nRed circles will come from any side, avoid them at all costs!', 75, 300)
      textSize(36)
      text('Difficulty:', 300, 450)
      textSize(24)
      text('E - Easy (8 lives)', 75, 500)
      text('M - Medium (5 lives)', 475, 500)
      text('H - Hard (3 lives)', 75, 550)
      text('I - Insane (1 life)', 475, 550)
      textSize(36)
      text('Press one of these keys to play the game', 65, 650)
      return
    }
      
    if (endScreen) // end screen
    {
      background('grey')
      fill('white')
      textSize(60)
      text('Refresh to try again!', 125, 600)
      text('Final Score: '+score, 185, 400)
      text('YOU DIED!', 225, 200)
      return
    }
  
  background('beige');
  rectMode(CORNER)
  
  // drawing the player
  stroke(173, 158, 123)
  strokeWeight(2)
  fill(247, 230, 190)
  circle(x, y, size)
  
  // moving the player
  if (keyIsDown(68) || keyIsDown(39)) // right
    {
      x+=speed
    }
  else if (keyIsDown(65) || keyIsDown(37)) // left
    {
      x-=speed
    }
  if (keyIsDown(87) || keyIsDown(38)) // up
    {
      y-=speed
    }
  else if (keyIsDown(83) || keyIsDown(40)) // left
    {
      y+=speed
    }
      
  push()
  
  // updating obstacles
  for (let i = 0; i < obstacles.length; i++)
    {
      e = obstacles[i]
      
      e.x += e.xInc
      e.y += e.yInc
    }
  
  // collision detection
  for (let i = 0; i < obstacles.length; i++)
    {
      e = obstacles[i]
      hit = collideCircleCircle(x, y, size, e.x, e.y, obstacleSize)
      
      if (hit)
        {
          lives--
          obstacles.splice(i, 1) // removes obstacle from the array, takes a life
          i--
        }
    }
  
  // rendering obstacles
  for (let i = 0; i < obstacles.length; i++)
    {
      e = obstacles[i]
      
      stroke('black')
      fill('red')
      circle(e.x, e.y, obstacleSize)
    }
    
  // display score
  fill('black')
  stroke('black')
  textSize(32)
  text("Score: "+score, 25, 50)
      
  // display lives
  for (let i = 0; i < lives; i++)
    {
      image(heart, (i * 25)+15, 75, 40, 25)
    }
    
  if (frame % spawnRate == 0)
    {
      // pick a direction to start from
      let side = round(random(0.499, 3.5))
      switch(side)
        {
          case 0: // left side
            obstacles.push({x:0, y:y, xInc:obstacleSpeed, yInc:0})
            break
          case 1: // right side
            obstacles.push({x:800, y:y, xInc:-obstacleSpeed, yInc:0})
            break
          case 2: // top side
            obstacles.push({x:x, y:0, xInc:0, yInc:obstacleSpeed})
            break
          case 3: // bottom side
            obstacles.push({x:x, y:800, xInc:0, yInc:-obstacleSpeed})
            break
        }
        
        score++
            
        if (obstacles.length > 10)
        {
          obstacles.shift() // cap the amount of obstacles possible
        }
    }
  
  // end game if no lives left
  if (lives <= 0)
    {
      endScreen = true
    }
      
  // update frame count
  frame++
      
  // update obstacle speed and spawn rate gradually
  if (obstacleSpeed < 10 && frame % 100 == 0)
    {
      obstacleSpeed += obstacleSpeedIncrease
    }
  if (spawnRate > 10 && frame % 70 == 0)
    {
      spawnRate--
    }
}
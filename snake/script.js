
// Initialize canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set up the snake
const snakeSize = 20;
let snake = [{x: 200, y: 200}];
let dx = snakeSize;
let dy = 0;

// Set up the food
let food = {x: Math.floor(Math.random() * canvas.width / snakeSize) * snakeSize, y: Math.floor(Math.random() * canvas.height / snakeSize) * snakeSize};

// Initialize score
let score = 0;

// Set up the game loop
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);

  // Draw the snake
  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++)
  {
    ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize);
  }

  // Move the snake
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  // Check if the snake has eaten the food
  if (head.x === food.x && head.y === food.y) {
    // Generate new food
    food = {x: Math.floor(Math.random() * canvas.width / snakeSize) * snakeSize, y: Math.floor(Math.random() * canvas.height / snakeSize) * snakeSize};

    // Increase score
    score++;
  } else {
    // Remove the last element of the snake
    snake.pop();
  }

  // Check for game over
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head)) {
    // Game over
    alert(`Game over! Your score was ${score}`);
    document.location.reload();
  }

  // Schedule next frame
  setTimeout(function() {
    // Schedule next frame
    requestAnimationFrame(draw);
  }, 1000 / 10); // 10 frames per second
  
}

// Check if the snake has collided with itself
function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Set up the controls
document.addEventListener('keydown', function(e) {
  // Change direction based on key press
  switch (e.keyCode) {
    case 37: // Left
      dx = -snakeSize;
      dy = 0;
      break;
    case 38: // Up
      dx = 0;
      dy = -snakeSize;
      break;
    case 39: // Right
      dx = snakeSize;
      dy = 0;
      break;
    case 40: // Down
      dx = 0;
      dy = snakeSize;
      break;
  }
});

// Set up the button to start the game
document.getElementById('start-button').addEventListener('click', function() {
  requestAnimationFrame(draw);
});

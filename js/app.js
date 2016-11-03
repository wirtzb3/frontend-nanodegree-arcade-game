// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
      this.x = 0;
      this.speed = (Math.floor(Math.random() * (400 - 100 + 1)) + 100) * dt;
    } else {
      this.x = this.x + this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-pink-girl.png';
  this.x = 202;
  this.y = 400;
};

Player.prototype.update = function(x, y) {
  var box = {
    leftEdge: 0,
    topEdge: -15,
    rightEdge: 498,
    bottomEdge: 400
  };
  var newX = this.x + (x || 0);
  var newY = this.y + (y || 0);

  if (newX > box.rightEdge || newX < box.leftEdge || newY > box.bottomEdge) {
    return this.render();
  }

  if (newY < box.topEdge) {
    this.x = 202;
    this.y = 400;
    alert('Yay! One point!')
    return this.render();
  }
  var that = this;
  var collision = false;
  allEnemies.forEach(function(enemy) {
     if(that.x >= enemy.x - 25 && that.x <= enemy.x + 25) {
     if (that.y >= enemy.y - 25 && that.y <= enemy.y + 25) {
        collision = true;
      }
    }
  });

  if (collision) {
    this.x = 202;
    this.y = 404;
  } else {
    this.x = newX;
    this.y = newY;
  }
  this.render();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  switch(key) {
    case 'left':
      this.update(-100, 0);
      break;
    case 'up':
      this.update(0, -83);
      break;
    case 'right':
      this.update(100, 0);
      break;
    case 'down':
      this.update(0, 83);
      break;
    default:
      alert('This is not a proper key');
  };
};


//       this.x = 202;
//       this.y = 404;
//       return this.render();
//     }
//       }

// var checkCollisions = function() {
// //Check height and width of new player(width = 171, height = 101)
// //Check height and width of allEnemies (width = 171, height = 101)
// //var playerBox= {x: newX, y: newY, width: 171, height: 101}
// // var enemyBox= {x: this.x, y: this.y, width: 171, height: 101}
// //
// // if (playerBox.x < allEnemies.x + enemyBox.width &&
// // //    playerBox.x + playerBox.width > enemyBox.x &&
// // //    playerBox.y < enemyBox.y + enemyBox.height &&
// // //    playerBox.height + playerBox.y > enemyBox.y) {
// // //     // collision detected --> player needs to go back to start!
//             this.x = 202;
//             this.y = 404;
//             this.render();
// // // } else  (update and render player and bugs as normal. Bugs
//             //should always have same characteristics regardless of impact)
// //
// //
// };


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 60), new Enemy(0, 143), new Enemy(0, 226)]; //60 + 83 + 83
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //Give bug an initial speed
    this.speed = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = -2;
        //Give bug a new initial speed for each pass
        this.speed = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
    } else {
          this.x = this.x + this.speed * dt;
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
    this.points = 0;
};

Player.prototype.update = function(x, y) {
    var box = {
        LEFT_EDGE: 0,
        TOP_EDGE: 30,
        RIGHT_EDGE: 498,
        BOTTOM_EDGE: 400
    };
    var newX = this.x + (x || 0);
    var newY = this.y + (y || 0);

  //Render if in bounds of canvas
    if (newX > box.RIGHT_EDGE || newX < box.LEFT_EDGE || newY > box.BOTTOM_EDGE) {
        return this.render();
    };

  //When player reaches top of canvas, reset player to start and add a point to score
    if (newY < box.TOP_EDGE) {
        this.x = 202;
        this.y = 400;
        this.points++;
        return this.render();
    };
  //Collision if player is within range of the enemy, inspiration from mashablair.github.io
    var that = this;
    var collision = false;
    allEnemies.forEach(function(enemy) {
        if(that.x >= enemy.x - 25 && that.x <= enemy.x + 25) {
        if(that.y >= enemy.y - 25 && that.y <= enemy.y + 25) {
            collision = true;
        }
        }
    });

    if (collision) {
        this.x = 202;
        this.y = 400;
        //If player hits bug, points decrease by 1, and player resets to start
        this.points--;
    } else {
        this.x = newX;
        this.y = newY;
    }
    this.render();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //Change point total in document
    document.getElementById('numberPoints').innerHTML = this.points;
    //Check if player has won
    this.playerWins();
};

Player.prototype.handleInput = function (key) {
    switch(key) {
        case 'left':
            this.update(-101, 0);
            break;
        case 'up':
            this.update(0, -83);
            break;
        case 'right':
            this.update(101, 0);
            break;
        case 'down':
            this.update(0, 83);
            break;
        default:
            null;
    };
};

//Set up function to see if player has won
Player.prototype.checkPoints = function() {
    //When player reaches 10, player wins
    if (this.points >= 10) {
        return true;
    }
    return false;
};

//If player has won, display feel good message
Player.prototype.playerWins = function() {
    if (this.checkPoints()) {
        document.getElementById('win').setAttribute('style', 'display: block');
        //Reset game once player reaches 10 points
        document.getElementById('refresh').addEventListener('click', function () {
            document.getElementById('win').setAttribute('style', 'display: none');
            this.points = 0;
        });
    }
};

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

// Creates the game constructor to store the game variables
const Game = function() {
    this.gameOver = false;
    this.gameWin = false;
};

// Enemies the player must avoid
let Enemy = function(x, y) {
    this.sprite = 'images/green-bug.png';
    this.x = x;
    this.y = y;
    this.multiplier = Math.floor((Math.random() * 4) + 1);
};

// Updates the enemy's position
// Parameter: dt, a time delta between ticks 
// -> ensures the game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {

    // Sets the position of the enemy based on dt and the speed multiplier
    this.x = this.x + 101 * dt * this.multiplier;

    // Checks for collisions with the player
    if ((this.y == player.y + 93) && (this.x > player.x - 60 && this.x < player.x + 60)) {
		game.gameOver = true;

        // Resets the player to the original position
        player.reset();
        }

    // If the enemy goes off of the board, this will reset it
    if (this.x > 650) {
        this.reset();
    }
};

// Reset the enemy to the left of the board with a new y position
// and a new speed multiplier
Enemy.prototype.reset = function() {
    this.x = -200;
    let yVals = [307, 224, 141];
    this.y = yVals[Math.floor((Math.random() * 6))];
    this.multiplier = Math.floor((Math.random() * 6) + 1);
};

// Renders the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class requires an update(), render() and a handleInput() method.
const Player = function(x, y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;

    // Stores the original position of the player for resetting later
    this.xo = x;
    this.yo = y;
};

// Resets the player to the original position
Player.prototype.reset = function() {
    this.x = this.xo;
    this.y = this.yo;
};

// Updates the player's position
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.handleInput = function(keyCode) {

    // Changes the player's position based on the user keyboard input
    if (keyCode == 'up') {
        this.y = this.y - 83;
    } else if (keyCode == 'down') {
        this.y = this.y + 83;
    } else if (keyCode == 'left') {
        this.x = this.x - 101;
    } else if (keyCode == 'right') {
        this.x = this.x + 101;
    }

    // Checks the position of the player
    if (this.x < 0) {
        // Player is going off the left side of the board, keeps the player onboard
        this.x = 0;

    } else if (this.x > 404) {
        // Player is going off the right side of the board, keeps the player onboard
        this.x = 404;

    } else if (this.y > 410) {
        // Player goes off the lower end of the board, resets the player
        this.reset();

    } else if (this.y <= -20 && this.x > -50 && this.x < 505) {
        // Player has made it to the top blocks, player wins the game
        game.gameWin = true;

        // Resets the player to the original coordinates
        this.reset();
    }
};

// Renders the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Listens for key presses and sends the keys to the
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// -- Instantiate the enemies --

// Creates the allEnemies array, which holds all of the enemy objects
const allEnemies = [];

// Sets a variable for the possible three lanes of y values
let yVals = [307, 224, 141];

// Creates the separate enemy instances
for (let i = 0; i < 11; i++) {

    // Sets a starting x position based on a random value
    let x = Math.floor((Math.random() * -300) + 1);

    // Sets a starting y position based on a random selection
    // of the 3 possible values and lanes
    let y = yVals[Math.floor(Math.random() * 3)];

    // Creates a new enemy object
    let enemy = new Enemy(x, y);

    // Pushes the new enemy into the array
    allEnemies.push(enemy);
}

// -- Instantiate the player --
let player = new Player(202, 380);

// -- Instantiate the game --
let game = new Game();
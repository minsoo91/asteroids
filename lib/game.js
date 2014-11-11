(function () {
    if (typeof Asteroids === "undefined") {
        window.Asteroids = {};
    }
    
    var Game = Asteroids.Game = function (xDim, yDim) {
        this.xDim = xDim;        
        this.yDim = yDim;
        this.addAsteroids();
    };
    
    Game.prototype.addAsteroids = function () {
        this.asteroids = [];
        
        for (var i = 0; i < 10000; i++) {
            this.asteroids.push(new Asteroids.Asteroid({ game: this }));
        }
    };
    
    Game.prototype.draw = function (ctx) {
        ctx.clearRect(0, 0, this.xDim, this.yDim);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0, canvasEl.width, canvasEl.height);
        
        this.asteroids.forEach(function (asteroid) {
            asteroid.draw(ctx);
        });
        
    };

    Game.prototype.checkCollisions = function () {
        for (var i = 0; i < this.asteroids.length - 1; i++) {
            for (var j = i + 1; j < this.asteroids.length; j++) {
                if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
                    this.asteroids[i].collideWith(this.asteroids[j]);
                }
            }
        }
    }

    Game.prototype.step = function () {
        this.moveObjects();
        this.checkCollisions();
    }

    Game.prototype.randomPosition = function () {
        return [
          this.xDim * Math.random(),
          this.yDim * Math.random()
        ];
     };
    
    Game.prototype.moveObjects = function () {
        this.asteroids.forEach(function (asteroid) {
            asteroid.move();
        });
    }

    Game.prototype.isOutOfBounds = function (pos) {
        return (pos[0] < 0) || (pos[1] < 0)
            || (pos[0] > this.xDim) || (pos[1] > this.yDim);
    };

    
  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], this.xDim), wrap(pos[1], this.yDim)
    ];

    function wrap (coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };

  Game.prototype.remove = function (asteroid) {
    var idx = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(idx, 1)
  }
})();
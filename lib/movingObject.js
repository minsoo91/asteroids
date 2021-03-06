(function () {
    if (typeof Asteroids === "undefined") {
        window.Asteroids = {};
    }
    
  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };
    
    MovingObject.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        ctx.arc(
          this.pos[0],
          this.pos[1],
          this.radius,
          0,
          2 * Math.PI
        );

        ctx.fill();
    }

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Asteroids.Util.dist(this, otherObject);
    return centerDist < (this.radius + otherObject.radius);
  }

  MovingObject.prototype.collideWith = function (otherObject) {
      this.game.remove(this);
      this.game.remove(otherObject);
  }

  MovingObject.prototype.isWrappable = true;
    
  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  };
})();
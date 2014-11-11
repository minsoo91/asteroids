(function () {
    if (typeof Asteroids === "undefined") {
        window.Asteroids = {};
    }
    
    var Asteroid = Asteroids.Asteroid = function (options) {
        options.pos = options.pos || options.game.randomPosition();
        options.vel = Asteroids.Util.randomVec(Math.random() * 10);
        options.radius = Math.random() * 40;
        options.color = Asteroid.randomColor();

        Asteroids.MovingObject.call(this, options);
    }
    
    Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
    
    var HEX_DIGITS = "0123456789ABCDEF"
    Asteroid.randomColor = function () {
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += HEX_DIGITS[Math.floor((Math.random() * 16))];
      }

      return color;
    };

})();
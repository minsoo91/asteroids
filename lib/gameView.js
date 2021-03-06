(function () {
    if (typeof Asteroids === "undefined") {
        window.Asteroids = {};
    }
    
    var GameView = Asteroids.GameView = function (game, ctx) {
        this.game = game;
        this.ctx = ctx;
    }
    
    GameView.prototype.start = function () {
        window.setInterval((function () {
            this.game.step();
            this.game.draw(this.ctx)
        }).bind(this), 1000 / 60 );
    }
}) ();
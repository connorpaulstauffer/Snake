$(function () {
  var Snake = window.Snake = window.Snake || {};

  var System = Snake.System = function () {
    this.setupGame();
    this.bindHandlers();
  };

  System.prototype.setupGame = function () {
    this.gameView = new Snake.View({
      $container: $('.game-container'),
      system: this
    });
  };

  System.prototype.bindHandlers = function () {
    $("#start-game").one("click", function () {
      $("#welcome-screen").addClass("hidden");
      $(".game-view").removeClass("hidden");
      this.gameView.run();
    }.bind(this));
  };

  System.prototype.gameOver = function (finalScore) {
    $("#game-over").removeClass("hidden");
    $("#final-score").html(finalScore);

    $("#back").one("click", function () {
      $("#game-over").addClass("hidden");
      $("#welcome-screen").removeClass("hidden");
      this.resetGame();
    }.bind(this))
  };

  System.prototype.resetGame = function () {
    $(".game-container").empty();
    this.setupGame();
    this.bindHandlers();
  };

  new Snake.System();
});

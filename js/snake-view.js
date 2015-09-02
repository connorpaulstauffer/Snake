(function () {
  var Snake = window.Snake = window.Snake || {};
  var Board = Snake.Board;

  var View = Snake.View = function(options) {
    this.$container = options.$container;
    this.system = options.system;
    this.board = new Board();
    this.createBoardView();
    this.bindKeys();
    this.score = 0;
    $("#score").html(0);
  };

  View.prototype.bindKeys = function () {
    var view = this;

    $(document).keydown(function (event) {
      switch(event.which) {
          case 37: view.board.snake.turn("W");
          break;

          case 38: view.board.snake.turn("N");
          break;

          case 39: view.board.snake.turn("E");
          break;

          case 40: view.board.snake.turn("S");
          break;

          default: return; // exit this handler for other keys
      }
      event.preventDefault();
    });
  };

  View.prototype.moveSnake = function () {
    this.board.snake.move(this.board);
  };

  View.prototype.run = function () {
    var view = this;
    view.render();

    var renderInterval = setInterval(function () {
      var head = view.board.snake.head();
      var dir = view.board.snake.dir;
      var next = Snake.Util.plus(head, dir);

      if (view.board.isSnake(next) || view.board.isOutOfBounds(next)) {
        clearInterval(renderInterval)
        this.system.gameOver(this.score);
        return;
      } else {
        view.moveSnake();
        if (view.board.isApple(next)) {
          view.board.resetApple(next);
          this.incrementScore();
        }
        view.render();
      }
    }.bind(this), 100);
  };

  View.prototype.incrementScore = function () {
    this.score += 10;
    $("#score").html(this.score);
  };

  View.prototype.createBoardView = function () {
    for (var row = 0; row < this.board.height; row++) {
      for (var col = 0; col < this.board.width; col++) {

        this.$container.append($('<div class="square"></div>')
          .data({ row: row, col: col }));
      }
    }
  };

  View.prototype.render = function () {
    var view = this;
    $('.square').each(function(idx, square) {
      square = $(square);
      var pos = [square.data("row"), square.data("col")];

      if (!view.board.isOccupied(pos)) {
        square.removeClass("apple");
        square.removeClass("snake");
      } else if (view.board.isSnake(pos)) {
        square.addClass("snake");
      } else {
        square.addClass("apple");
      }
    });
  };
})();

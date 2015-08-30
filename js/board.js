(function () {
  var Snake = window.Snake = window.Snake || {};

  var Board = Snake.Board = function() {
    this.apples = [];
    this.snake = new Snake();
    this.width = 25;
    this.height = 25;
    this.addApple(this.randomEmptyCoords());
  };

  Board.prototype.isOutOfBounds = function (pos) {
    return pos[0] < 0 || pos[0] >= this.height || pos[1] < 0 || pos[1] >= this.width;
  };

  Board.prototype.isSnake = function(pos) {
    var segments = this.snake.segments;

    for (var i = 0; i < segments.length; i++) {
      if (Snake.Util.equals(pos, segments[i])) {
        return true;
      }
    }

    return false;
  };

  Board.prototype.isApple = function(pos) {
    for (var i = 0; i < this.apples.length; i++) {
      if (Snake.Util.equals(pos, this.apples[i])) {
        return true;
      }
    }

    return false;
  };

  Board.prototype.resetApple = function (pos) {
    for (var i = 0; i < this.apples.length; i++) {
      if (Snake.Util.equals(pos, this.apples[i])) {
        this.apples[i] = this.randomEmptyCoords();
      }
    }
  };

  Board.prototype.isOccupied = function (pos) {
    return this.isSnake(pos) || this.isApple(pos);
  };

  Board.prototype.randomEmptyCoords = function () {
    var empty = this.emptyCoords();
    var length = empty.length;
    var rand = Math.floor(Math.random() * length);
    return empty[rand];
  };

  Board.prototype.emptyCoords = function () {
    var empty = [];
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        if (!this.isOccupied([i, j])) { empty.push([i, j]); }
      }
    }
    return empty;
  };

  Board.prototype.addApple = function (pos) {
    this.apples.push(pos);
  };

})();

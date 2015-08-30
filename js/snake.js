(function () {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var Snake = window.Snake = function () {
    this.dir = "N";
    this.segments = [[12, 12]];
  };

  Snake.prototype.head = function () {
    return this.segments[0];
  };

  Snake.prototype.move = function (board) {
    var next = Snake.Util.plus(this.head(), this.dir);
    if (!board.isApple(next)) { this.segments.pop(); }
    this.segments.unshift(next);
  };

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  };

})();

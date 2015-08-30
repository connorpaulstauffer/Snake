(function () {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var Util = Snake.Util = {};

  Util.plus = function(pos, dir) {
    var res = pos.concat();

    switch (dir) {
      case "N": res[0] -= 1; break;
      case "S": res[0] += 1; break;
      case "E": res[1] += 1; break;
      case "W": res[1] -= 1; break;
    }

    return res;
  };

  Util.equals = function (pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
  };

  Util.isOpposite = function(dir1, dir2) {
    switch (dir1) {
      case "N": return dir2 === "S";
      case "S": return dir2 === "N";
      case "E": return dir2 === "W";
      case "W": return dir2 === "E";
    }
  };

})();

define(['./config'],
  function (Config) {
    "use strict";
    return function (from, to) {
      var proto = Object.create(null);
      proto.from = from;
      proto.to = to;

      proto.prepare = function(){
        return {
          from: {x: this.from.x, y: this.from.y + Config.radius},
          to: {x: this.from.x, y: this.to.y - Config.radius}
        }
      };

      return proto;
  };
});
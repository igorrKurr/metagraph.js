define(['./abstract-element', './config', './abstract-graph'], function (AbstractElement, Config, AbstractGraph) {
  "use strict";
  return function (name) {
    var proto = Object.create(AbstractElement());
    proto.name = name;

    proto.findRoots = function(){
      var finder = function(array){
        var result = [];
        var parentsAll = [];
        for (var i = array.length - 1; i >= 0; i--) {
          if (!array[i].hasParentsInner()) {result.push(array[i])};
          parentsAll = parentsAll.concat(array[i].parentsInner);
        };
        if (result.length > 0) {return result};
        return finder(parentsAll);
      }
      return finder([this]);
    }

    proto.levels = function() {
      return AbstractGraph.levels(this.findRoots(), 'inner');
    };

    proto.prepare = function(x, y) {
      if(this.parentsInner.length == 0){
        setCoordinates(this, x, y);
      }
    };

    var setCoordinates = function(obj, x, y){
      obj.x = obj.x || x;
      obj.y = obj.y || y;
      return obj;
    };

    var setRadiuses = function(obj, xRadius, yRadius){
      obj.xRadius = obj.xRadius || xRadius;
      obj.yRadius = obj.yRadius || yRadius;
      return obj;
    };

    return proto;
  };
});
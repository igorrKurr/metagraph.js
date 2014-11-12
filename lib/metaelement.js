define(['./abstract-element', './config', './abstract-graph', './utils', './edge'],
  function (AbstractElement, Config, AbstractGraph, Utils) {
    "use strict";
    var MetaElement = function (name) {
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

      proto.getLevel = function(relation) {
        if (!proto.has('parents', relation)) {return 0};

        var  counter = 1,
            recursionOverParents;

        recursionOverParents = function (prevArray, counter) {
          var array = [],
              i;

          for (i = prevArray.length - 1; i >= 0; i--) {
            if (!prevArray[i].has('parents', relation)) {continue;}
            array = array.concat(prevArray[i][Utils.relationName('parents', relation)]);
          }
          if (array.length === 0) {return counter;}
          counter += 1;
          return recursionOverParents(array, counter);
        };

        return recursionOverParents(proto[Utils.relationName('parents', relation)], counter);
      };

      proto.levels = function() {
        return AbstractGraph.levels(this.findRoots(), 'inner');
      };

      proto.prepare = function(x, y) {
        var levels = this.levels();
        MetaElement.setCoordinates(this, x, y);
        MetaElement.setRadiuses(this, Config.radius, Config.radius);

        return this;
      };

      proto.getCoordinates = function() {
        return {
          x: proto.x,
          y: proto.y
        };
      };

      return proto;
  };
  MetaElement.setCoordinates = function(obj, x, y){
    obj.x = obj.x || x;
    obj.y = obj.y || y;
    return obj;
  };
  MetaElement.setRadiuses = function(obj, xRadius, yRadius){
    obj.xRadius = obj.xRadius || xRadius;
    obj.yRadius = obj.yRadius || yRadius;
    return obj;
  };
  return MetaElement;
});
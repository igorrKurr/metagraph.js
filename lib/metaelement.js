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
        var elements = this.findRoots().map(function(el){
          el.isChecked = false;
          return el;
        });
        return AbstractGraph.levels(elements, 'inner');
      };

      proto.prepare = function(x, y) {
        var levels = this.levels();
        MetaElement.setCoordinates(this, x, y);
        MetaElement.setRadiuses(this, Config.radius, Config.radius);

        return this;
      };

      proto.prepareWithChildren = function(x, y) {
        if (this.has('children')) {
          _childrenCountType(this.children)(this, x, y);
        }
        else {
          this.prepare(x, y);
        }
      };

      proto.lastChildrenCoordinates = function() {
        parent.children[parent.children.length - 1].getCoordinates();
      };

      var _childrenCountType = function(children){
        var length = children.length;
        if (length === 1) {
          return function(parent, x, y){
            MetaElement.setCoordinates(parent, x, y);
            y += 2*Config.radius+Config.distance;
            MetaElement.setCoordinates(parent.children[0], x, y)
          }
        }
        if (length % 2 === 0) {
          return function(parent, x, y){
            var pX = x, pY = y+2*Config.radius+Config.distance;
            parent.children.forEach(function(child){
              MetaElement.setCoordinates(child, x, y);
              pX += 2*Config.radius+Config.distance;
            });
            var cX = parent.children[Math.ceil(parent.children.length/2).x] + Config.radius+Config.distance;
            MetaElement.setCoordinates(parent, cX, y);
          }
        }
        if (length % 2 !== 0) {
          return function(parent, x, y){
            var pX = x, pY = y+2*Config.radius+Config.distance;
            parent.children.forEach(function(child){
              MetaElement.setCoordinates(child, x, y);
              pX += 2*Config.radius+Config.distance;
            });
            var cX = parent.children[Math.ceil(parent.children.length/2).x];
            MetaElement.setCoordinates(parent, cX, y);
          }
        }
      };

      proto.getSpan = function(x, y) {
        var height, width, nX, nY;
        if (!this.has('children')) {
          height = 2*this.yRadius;
          width = 2*this.xRadius;
          nX = this.x - this.yRadius;
          nY = this.y - this.xRadius
        }
        else {

        }
        return {
          x:x,
          y:y,
          height: height,
          width: width
        }
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
define(['./utils', './config', './abstract-graph'], function (Utils, Config, AbstractGraph) {
  "use strict";
  return function MetaElement(name) {
    this.name = name;
    this.parents = [];
    this.children = [];
    this.parentsInner = [];
    this.childrenInner = [];

    this.addParent = function(parent) {
      this._addRelator(parent, 'parents');
    };

    this.addChild = function(child) {
      this._addRelator(child, 'children');
    };

    this.addParentInner = function(parent) {
      this._addRelator(parent, 'parents', 'inner');
    };

    this.addChildInner = function(child) {
      this._addRelator(child, 'children', 'inner');
    };

    this.hasChildren = function() {
      return this.has('children');
    };

    this.hasParents = function() {
      return this.has('parents');
    };

    this.findRoots = function(){
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

    this.levels = function() {
      return AbstractGraph.levels(this.findRoots(), 'inner');
    };

    this.hasChildrenInner = function() {
      return this.has('children', 'inner');
    };

    this.hasParentsInner = function() {
      return this.has('parents', 'inner');
    };

    this.prepare = function(x, y) {
      if(this.parentsInner.length == 0){
        setCoordinates(this, x, y);
      }
    };

    this.has = function(relation, type) {
      return this[Utils.relationName(relation, type)].length > 0;
    };

    this._addRelator = function(relator, relation, type) {
      this[Utils.relationName(relation, type)].push(relator);
      relator[Utils.relationName(opositeTo(relation), type)].push(this);
    };

    var setCoordinates = function(obj, x, y){
      obj.x = x;
      obj.y = y;
      return obj;
    };

    var setRadiuses = function(obj, xRadius, yRadius){
      obj.xRadius = xRadius;
      obj.yRadius = yRadius;
      return obj;
    };

    var opositeTo = function(relation){
      return relation === 'parents' ? 'children' : 'parents';
    };
  };
});
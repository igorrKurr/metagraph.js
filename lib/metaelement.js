define(['./utils'], function (Utils) {
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
      return this._has('children');
    };

    this.hasParents = function() {
      return this._has('parents');
    };

    this.hasChildrenInner = function() {
      return this._has('children', 'inner');
    };

    this.hasParentsInner = function() {
      return this._has('parents', 'inner');
    };

    this.prepare = function(x, y) {
      if(this.innerParents.length == 0){
        setCoordinates(this, x, y);
      }
    };

    this._has = function(relation, type) {
      return this[relationName(relation, type)].length > 0;
    };

    this._addRelator = function(relator, relation, type) {
      this[relationName(relation, type)].push(relator);
      relator[relationName(opositeTo(relation), type)].push(this);
    };


    var setCoordinates = function(obj, x, y){
      obj.x = x;
      obj.y = y;
      return obj;
    };

    var opositeTo = function(relation){
      return relation === 'parents' ? 'children' : 'parents';
    };

    var relationName = function(relation, type){
      var type = type || '';
      return relation + Utils.capitalize(type);
    };
  };
});
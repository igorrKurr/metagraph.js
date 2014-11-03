define(['./utils'], function (Utils) {
  "use strict";
  return function() {
    var proto = Object.create(null);

    proto.parents = [];
    proto.children = [];
    proto.parentsInner = [];
    proto.childrenInner = [];

    proto.addParent = function(parent) {
      this._addRelator(parent, 'parents');
    };

    proto.addChild = function(child) {
      this._addRelator(child, 'children');
    };

    proto.addParentInner = function(parent) {
      this._addRelator(parent, 'parents', 'inner');
    };

    proto.addChildInner = function(child) {
      this._addRelator(child, 'children', 'inner');
    };

    proto.hasChildren = function() {
      return this.has('children');
    };

    proto.hasParents = function() {
      return proto.has('parents');
    };

    proto.hasChildrenInner = function() {
      return this.has('children', 'inner');
    };

    proto.hasParentsInner = function() {
      return this.has('parents', 'inner');
    };

    proto.has = function(relation, type) {
      return this[Utils.relationName(relation, type)].length > 0;
    };

    proto._addRelator = function(relator, relation, type) {
      this[Utils.relationName(relation, type)].push(relator);
      relator[Utils.relationName(opositeTo(relation), type)].push(this);
    };

    var opositeTo = function(relation){
      return relation === 'parents' ? 'children' : 'parents';
    };

    return proto;
  };
});
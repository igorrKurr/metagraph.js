define(function () {
  "use strict";
  return function MetaElement(x, y, name) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.hRadius = this.radius;
    this.name = name;
    this.parents = [];
    this.children = [];

    this.hasParents = function() {
      return this.parents.length > 0;
    };

    this.addParent = function(parent) {
      this.parents.push(parent);
      parent.children.push(this);
    };

    this.addChild = function(child) {
      this.children.push(child);
      child.parents.push(this);
    };

    this.hasChildren = function() {
      return this.children.length > 0;
    };

    this.set = function() {
      if (this.hasChildren()) {
        this.hRadius = ((this.children[0].radius + 20) * this.children.length) / 2;
        this.radius = this.hRadius / this.vertexLength * 1.5;
      }
      else {
        this.hRadius = 20;
        this.radius = 20;
      }
    };

    this.isOverlap = function(element) {
      var condition = Math.sqrt( Math.pow((this.x - element.x), 2) + Math.pow((this.y - element.y), 2)) > (this.radius + element.radius);
      return !condition;
    };
  };
});
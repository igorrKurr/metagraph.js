define(function () {
  "use strict";
  return function MetaElement(name) {
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
  };
});
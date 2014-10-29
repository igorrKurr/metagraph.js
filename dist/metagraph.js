define(function () {
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

define(function () {
    var Metagraph = function () {
      var proto = Object.create(null);
      proto.vertices = [];
      proto.addVertices = function(array) {
        this.vertices = array;
      };
      proto.levels = function () {
        if(this.vertices.length === 0) {return;}
        return Metagraph.levels(this.vertices);
      };
    };

    Metagraph.levels = function (array) {
      var init = {},
          counter = 0,
          zeroLevel = Metagraph.roots(array),
          recursionOverChildren;

      recursionOverChildren = function (prevArray, counter, init) {
        var array = [],
            i;

        for (i = prevArray.length - 1; i >= 0; i--) {
          if (!prevArray[i].hasChildren()) {continue;}
          array = array.concat(prevArray[i].children);
        }

        if (array.length === 0) {return;}
        counter = counter + 1;
        init['level' + counter] = array;

        return recursionOverChildren(array, counter, init);
      };

      init['level' + counter] = zeroLevel;
      recursionOverChildren(zeroLevel, counter, init);

      return init;
    };

    Metagraph.roots = function (array) {
      return array.filter(function(el){
        if (el.parents.length === 0) {return el;}
      });
    };

    return Metagraph;
});
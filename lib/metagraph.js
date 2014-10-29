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
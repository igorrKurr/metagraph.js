define(['./utils'], function (Utils) {
  "use strict";
  var proto = Object.create(null);

  proto.levels = function (array, relation) {
    var init = {},
        counter = 0,
        zeroLevel = this.roots(array, relation),
        recursionOverChildren;

    recursionOverChildren = function (prevArray, counter, init) {
      var array = [],
          i;

      for (i = prevArray.length - 1; i >= 0; i--) {
        if (!prevArray[i].has('children', relation)) {continue;}
        array = array.concat(prevArray[i][Utils.relationName('children', relation)]);
      }

      if (array.length === 0) {return;}
      counter = counter + 1;
      init[counter] = array;

      return recursionOverChildren(array, counter, init);
    };

    init[counter] = zeroLevel;
    recursionOverChildren(zeroLevel, counter, init);
    init.length = Object.keys(init).length;
    return init;
  };

  proto.roots = function (array, relation) {
    return array.filter(function(el){
      if (!el.has('parents', relation)) {return el;}
    });
  };

  return proto;
});


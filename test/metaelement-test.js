"use strict";
define(
    ['../lib/metaelement'],
    function(MetaElement, Metagraph, Stub) {
      var run = function() {
        module('MetaElement');

        test('#findRoots', function(){
          expect(2);

          var meta = new MetaElement('a');
          var meta1 = new MetaElement('b');
          meta.addParentInner(meta1);

          deepEqual(meta.findRoots(), [meta1]);
          deepEqual(meta1.findRoots(), [meta1]);
        });

        test('#levels', function(){
          expect(4);

          var meta = new MetaElement('a');
          var meta1 = new MetaElement('b');
          meta.addParentInner(meta1);

          var division = meta.levels();
          deepEqual(division['level0'], [meta1]);
          deepEqual(division['level1'], [meta]);

          var division1 = meta1.levels();
          deepEqual(division1['level0'], [meta1]);
          deepEqual(division1['level1'], [meta]);
        });
      };
      return {run: run}
    }
);
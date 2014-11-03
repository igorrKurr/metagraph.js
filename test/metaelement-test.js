"use strict";
define(
    ['../lib/metaelement'],
    function(MetaElement, Metagraph, Stub) {
      var run = function() {
        var meta1, meta;

        module('MetaElement', {
          setup: function() {
            meta = MetaElement('a');
            meta1 = MetaElement('b');
            meta.addParentInner(meta1);
          }
        });

        test('#findRoots', function(){
          expect(2);

          deepEqual(meta.findRoots(), [meta1]);
          deepEqual(meta1.findRoots(), [meta1]);
        });

        test('#levels', function(){
          expect(4);

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
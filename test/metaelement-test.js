"use strict";
define(
    ['../lib/metaelement', '../lib/metagraph', 'helpers/stub-graph'],
    function(metaelement, Metagraph, stubGraph) {
      var run = function() {
          test('.levels', function(){
            expect(3);

            var division = Metagraph.levels(stubGraph());

            equal(division['level0'].length, 5);
            equal(division['level1'].length, 3);
            equal(division['level2'].length, 2);
          });

          test('#levels', function(){
            expect(3);

            var meta = Metagraph();
            meta.addVertices(stubGraph());

            var division = meta.levels();
            equal(division['level0'].length, 5);
            equal(division['level1'].length, 3);
            equal(division['level2'].length, 2);
          });
      };
      return {run: run}
    }
);
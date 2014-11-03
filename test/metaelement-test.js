"use strict";
define(
    ['../lib/metaelement', '../lib/metagraph', 'helpers/stub-graph'],
    function(MetaElement, Metagraph, Stub) {
      var run = function() {
          test('#levels inner', function(){
            expect(3);

            var meta = Metagraph();
            meta.addVertices(Stub.stubGraphInner());

            var division = meta.levels('inner');
            equal(division['level0'].length, 5);
            equal(division['level1'].length, 3);
            equal(division['level2'].length, 2);
          });

          test('#levels', function(){
            expect(3);

            var meta = Metagraph();
            meta.addVertices(Stub.stubGraph());

            var division = meta.levels();
            equal(division['level0'].length, 5);
            equal(division['level1'].length, 3);
            equal(division['level2'].length, 2);
          });
      };
      return {run: run}
    }
);
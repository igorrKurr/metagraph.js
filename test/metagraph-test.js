"use strict";
define(
    ['../lib/metagraph', 'helpers/stub-graph'],
    function(Metagraph, Stub) {
      var run = function() {
        var meta;
        module('Metagraph', {
          setup: function(){
            meta = Metagraph();
          }
        });

        test('#levels inner', function(){
          expect(3);
          meta.addVertices(Stub.stubGraphInner());

          var division = meta.levels('inner');
          equal(division['level0'].length, 5);
          equal(division['level1'].length, 3);
          equal(division['level2'].length, 2);
        });

        test('#levels', function(){
          expect(3);
          meta.addVertices(Stub.stubGraph());

          var division = meta.levels();
          equal(division['level0'].length, 5);
          equal(division['level1'].length, 3);
          equal(division['level2'].length, 2);
        });

        test('#levels inner', function(){
          expect(2);
          meta.addVertices(Stub.stubGraphInner());
          equal(meta.vertices.length, 10);
          deepEqual(meta.vertices[0].graph, meta);
        });
      };
      return {run: run}
    }
);
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
          expect(4);
          meta.addVertices(Stub.stubGraphInner());

          var division = meta.levels('inner');
          equal(division[0].length, 5);
          equal(division[1].length, 3);
          equal(division[2].length, 2);
          equal(division.length, 3);
        });

        test('#levels', function(){
          expect(4);
          meta.addVertices(Stub.stubGraph());

          var division = meta.levels();
          equal(division[0].length, 5);
          equal(division[1].length, 3);
          equal(division[2].length, 2);
          equal(division.length, 3);
        });

        test('#addVertices', function(){
          expect(2);
          meta.addVertices(Stub.stubGraphInner());
          equal(meta.vertices.length, 10);
          deepEqual(meta.vertices[0].graph, meta);
        });

        test('synchronize levels() and getLevel()', function(){
          expect(3);

          meta.addVertices(Stub.stubGraph())
          var division = meta.levels();

          equal(division[0][0].getLevel(), 0);
          equal(division[1][0].getLevel(), 1);
          equal(division[2][0].getLevel(), 2);
        });
      };
      return {run: run}
    }
);
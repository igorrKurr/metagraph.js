"use strict";
define(
    ['../lib/edge', '../lib/metaelement', '../lib/config'],
    function(Edge, MetaElement, Config) {
      var run = function() {
        var edge, meta1, meta;

        module('Edge', {
          setup: function() {
            meta = MetaElement('a');
            MetaElement.setCoordinates(meta, 20, 10);
            meta1 = MetaElement('b');
            MetaElement.setCoordinates(meta1, 20, 30);
            edge = Edge(meta, meta1);
          }
        });

        test('#init', function(){
          expect(2);

          deepEqual(edge.from, meta);
          deepEqual(edge.to, meta1);
        });

        test('#prepare', function(){
          expect(2);

          var prepared = edge.prepare();

          equal(prepared.from.y, edge.from.y + Config.radius);
          equal(prepared.to.y, edge.to.y - Config.radius);
        });
      };
      return {run: run}
    }
);
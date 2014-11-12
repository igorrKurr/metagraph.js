"use strict";
define(
    ['../lib/metaelement', '../lib/metagraph'],
    function(MetaElement, Metagraph) {
      var run = function() {
        var meta2, meta1, meta;

        module('MetaElement', {
          setup: function() {
            meta = MetaElement('a');
            meta1 = MetaElement('b');
            meta2 = MetaElement('c');
            meta.addParentInner(meta1);
            meta.addParent(meta2);
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

        test('#getLevel', function(){
          expect(3);
          var meta3 = MetaElement('d');
          meta3.addParent(meta);
          equal(meta.getLevel(), 1);
          equal(meta2.getLevel(), 0);
          equal(meta3.getLevel(), 2);
        });

        test('#appendTo', function(){
          expect(2);
          var m = Metagraph();
          meta.appendTo(m)
          equal(meta.graph, m);
          equal(m.vertices[0], meta);
        });

        test('#addParent', function(){
          expect(2);
          var m = MetaElement();
          meta.addParent(m);
          deepEqual(meta.parents[meta.parents.length - 1], m);
          equal(m.children[0], meta);
        });
      };
      return {run: run}
    }
);
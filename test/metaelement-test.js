"use strict";
define(
    ['../lib/metaelement'],
    function(MetaElement, Metagraph, Stub) {
      var run = function() {
          test('#findRoot', function(){
            expect(2);

            var meta = new MetaElement('a');
            var meta1 = new MetaElement('b');
            meta.addParentInner(meta1);

            deepEqual(meta.findRoot(), meta1);
            deepEqual(meta.findRoot(), meta1);
          });
      };
      return {run: run}
    }
);
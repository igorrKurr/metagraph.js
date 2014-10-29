"use strict";
define(
    ['../lib/metaelement', '../lib/metagraph'],
    function(metaelement, metagraph) {
      function stubGraph(){
        var els = [],
            els1 = [],
            els2 = [];

        for (var i = 0; i < 5; i++) {
          els.push(new metaelement(0,0,'a' + i.toString()));
        }

        for (var i = 0; i < 3; i++) {
          els1.push(new metaelement(0,0,'b' + i.toString()));
          els1[i].addParent(els[Math.ceil(Math.random() * 4)]);
        }

        for (var i = 0; i < 2; i++) {
          els2.push(new metaelement(0,0,'c' + i.toString()));
          els2[i].addParent(els1[Math.ceil(Math.random() * 2)]);
        }
        var rs = els1.concat(els).concat(els2);

        return rs;
      }
      var run = function() {
          test('levels', function(){
            expect(3);

            var division = metagraph.levels(stubGraph());

            equal(division['level0'].length, 5);
            equal(division['level1'].length, 3);
            equal(division['level2'].length, 2);
          });
      };
      return {run: run}
    }
);
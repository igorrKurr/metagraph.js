"use strict";
define(
  ['../../lib/metaelement'],
  function(MetaElement) {
    return {
      stubGraph: function (){
        var els = [],
            els1 = [],
            els2 = [];

        for (var i = 0; i < 5; i++) {
          els.push(new MetaElement('a' + i.toString()));
        }

        for (var i = 0; i < 3; i++) {
          els1.push(new MetaElement('b' + i.toString()));
          els1[i].addParent(els[Math.ceil(Math.random() * 4)]);
        }

        for (var i = 0; i < 2; i++) {
          els2.push(new MetaElement('c' + i.toString()));
          els2[i].addParent(els1[Math.ceil(Math.random() * 2)]);
        }
        var rs = els1.concat(els).concat(els2);

        return rs;
      },
      stubGraphInner: function (){
        var els = [],
            els1 = [],
            els2 = [];

        for (var i = 0; i < 5; i++) {
          els.push(new MetaElement('a' + i.toString()));
        }

        for (var i = 0; i < 3; i++) {
          els1.push(new MetaElement('b' + i.toString()));
          els1[i].addParentInner(els[Math.ceil(Math.random() * 4)]);
        }

        for (var i = 0; i < 2; i++) {
          els2.push(new MetaElement('c' + i.toString()));
          els2[i].addParentInner(els1[Math.ceil(Math.random() * 2)]);
        }
        var rs = els1.concat(els).concat(els2);

        return rs;
      }
    }

  }
);
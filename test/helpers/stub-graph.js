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
          els.push(MetaElement('a' + i.toString()));
        }

        for (var i = 0; i < 3; i++) {
          els1.push(MetaElement('b' + i.toString()));
          els1[i].addParent(els[Math.ceil(Math.random() * 4)]);
        }

        for (var i = 0; i < 2; i++) {
          els2.push(MetaElement('c' + i.toString()));
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
          els.push(MetaElement('a' + i.toString()));
        }

        for (var i = 0; i < 3; i++) {
          els1.push(MetaElement('b' + i.toString()));
          els1[i].addParentInner(els[Math.ceil(Math.random() * 4)]);
        }

        for (var i = 0; i < 2; i++) {
          els2.push(MetaElement('c' + i.toString()));
          els2[i].addParentInner(els1[Math.ceil(Math.random() * 2)]);
        }
        var rs = els1.concat(els).concat(els2);

        return rs;
      },
      ternovoyExample: function (){
        var els = [];

        els.push(MetaElement('a1'));//0
        els.push(MetaElement('b1'));//1
        els.push(MetaElement('b2'));//2
        els.push(MetaElement('c1'));//3
        els.push(MetaElement('c2'));//4
        els.push(MetaElement('d1'));//5
        els.push(MetaElement('d2'));//6
        els.push(MetaElement('d3'));//7

        els[1].addParent(els[0]);
        els[2].addParent(els[0]);
        els[3].addParent(els[1]);
        els[4].addParent(els[2]);
        els[5].addParent(els[3]);
        els[6].addParent(els[2]);
        els[6].addParent(els[4]);
        els[6].addParent(els[3]);
        els[7].addParent(els[4]);

        return els;
      }
    }
  }
);
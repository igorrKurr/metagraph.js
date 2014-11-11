require(
    ['metagraph'],
    function(Metagraph) {
      m = Metagraph();
      var els = [],
            els1 = [],
            els2 = [];

        for (var i = 0; i < 5; i++) {
          els.push(Metagraph.MetaElement('a' + i.toString()));
          els[i].appendTo(m);
        }

        for (var i = 0; i < 3; i++) {
          els1.push(Metagraph.MetaElement('b' + i.toString()));
          els1[i].addParent(els[Math.ceil(Math.random() * 4)]);
          els1[i].appendTo(m);
        }

        for (var i = 0; i < 2; i++) {
          els2.push(Metagraph.MetaElement('c' + i.toString()));
          els2[i].addParent(els1[Math.ceil(Math.random() * 2)]);
          els2[i].appendTo(m);
        }
        var rs = els1.concat(els).concat(els2);

      m.addVertices(rs);
      m.render('#renderTo', 1000, 1000);
    }
);
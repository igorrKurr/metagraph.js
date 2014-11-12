"use strict";
require.config({
    paths: {
        'QUnit': '../bower_components/qunit/qunit/qunit',
        'd3': '../bower_components/d3/d3'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       },
       'd3':{
        exports: 'd3'
      }
    }
});

require(
    ['QUnit', 'metaelement-test', 'metagraph-test', 'edge-test'],
    function(QUnit, metaelementTest, metagraphTest, edgeTest) {
        metaelementTest.run();
        metagraphTest.run();
        edgeTest.run();
        QUnit.load();
        QUnit.start();
    }
);
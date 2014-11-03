"use strict";
require.config({
    paths: {
        'QUnit': '../bower_components/qunit/qunit/qunit'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       }
    }
});

require(
    ['QUnit', 'metaelement-test', 'metagraph-test'],
    function(QUnit, metaelementTest, metagraphTest) {
        metaelementTest.run();
        metagraphTest.run();
        QUnit.load();
        QUnit.start();
    }
);
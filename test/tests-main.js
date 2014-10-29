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

// require the unit tests.
require(
    ['QUnit', 'metaelement-test'],
    function(QUnit, metaelementTest) {
        // run the tests.
        metaelementTest.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);
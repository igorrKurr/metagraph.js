'use strict';

require.config({
    deps: ['metagraph'],
    paths: {
        'd3': '../bower_components/d3/d3'
    },
    shim: {
      'd3':{
        exports: 'd3'
      }
    }
});
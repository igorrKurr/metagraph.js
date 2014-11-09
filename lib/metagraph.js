define(['./abstract-graph', './renderer'], function (AbstractGraph, Renderer) {
  "use strict";
  var Metagraph = function () {
    var proto = Object.create(null);
    proto.vertices = [];
    proto.addVertices = function(array) {
      this.vertices = array;
    };
    proto.levels = function (type) {
      var relationType = type || '';
      if(this.vertices.length === 0) {return;}
      return AbstractGraph.levels(this.vertices, relationType);
    };
    proto.prepare = function(){
      if(this.vertices.length === 0) {return;}
      var levels = this.levels;
    };
    proto.render = function(nodeName, width, height){
      Renderer(nodeName, width, height).render();
    };

    return proto;
  };

  return Metagraph;
});
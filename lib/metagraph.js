define(['./abstract-graph', './renderer', './metaelement', './config'],
  function (AbstractGraph, Renderer, MetaElement, Config) {
    "use strict";
    var Metagraph = function () {
      var proto = Object.create(null);
      proto.vertices = [];
      proto.edges = [];
      proto.addVertices = function(array) {
        this.vertices = array.map(function(el){
          el.setGraph(proto);
          return el;
        });
      };
      proto.levels = function (type) {
        var relationType = type || '';
        if(this.vertices.length === 0) {return;}
        return AbstractGraph.levels(this.vertices, relationType);
      };
      proto.prepare = function(){
        if(this.vertices.length === 0) {return;}
        var levels = this.levels;
        var x = Config.startCoordinate;
        var y = Config.startCoordinate;
        this.vertices.forEach(function(vert){
          vert.prepare(x,y);
          x += 20;
          y += 20;
        });
        return {
          vertices: this.vertices
        };
      };
      proto.render = function(nodeName, width, height){
        Renderer(nodeName, width, height).render(this.prepare());
      };

      return proto;
    };

    Metagraph.MetaElement = MetaElement;

    return Metagraph;
});
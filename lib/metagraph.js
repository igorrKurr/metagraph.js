define(['./abstract-graph', './renderer', './metaelement', './config', './edge'],
  function (AbstractGraph, Renderer, MetaElement, Config, Edge) {
    "use strict";
    var Metagraph = function () {
      var proto = Object.create(null);
      proto.vertices = [];
      proto.edges = [];
      proto.addVertices = function(array) {
        this.vertices = array.map(function(el){
          el.appendTo(proto);
          return el;
        });
      };
      proto.prepareLevel = function(x, y, level){
        [].forEach.call(level, function(el){
          el.prepare(x, y);
          x += 2*Config.radius+Config.distance;
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

        [].forEach.call(this.levels(), function(level){
          proto.prepareLevel(x, y, level);
          y += 2*Config.radius+Config.distance;
        });

        var edges = this.edges.map(function(edge){
          edge.prepare();
        });
        return {
          vertices: this.vertices,
          edges: this.edges
        };
      };
      proto.render = function(nodeName, width, height){
        Renderer(nodeName, width, height).render(this.prepare());
      };
      proto.addEdge = function(edge){
        proto.edges.push(edge);
      }

      return proto;
    };

    Metagraph.MetaElement = MetaElement;
    Metagraph.Edge = Edge;


    return Metagraph;
});
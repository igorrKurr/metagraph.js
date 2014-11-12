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
        var verts = this.vertices.sort(function(prev, next){
          return prev.getLevel() - next.getLevel();
        });
        verts.forEach(function(vert){
          vert.prepare(x,y);
          y += 2*Config.radius+Config.distance;
        });
        this.edges.forEach(function(edge){
          edge.prepare();
        });
        return {
          vertices: verts,
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
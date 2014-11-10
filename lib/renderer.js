define(['d3'], function(d3){
  return function (nodeName, width, height) {
    var proto = Object.create(null);
    proto.render = function(data){
      var svgContainer = d3.select(nodeName).append("svg")
                                    .attr("width", width)
                                    .attr("height", height);
      // console.log(data)
      data.vertices.forEach(function(vert){
      // console.log(vert)

        proto.renderElement(svgContainer, vert);
      });
    };

    proto.renderElement = function(container, data) {
      var color = proto.colors(data.getLevel());
      var circle = container.append("ellipse")
                               .attr("cx", data.x)
                               .attr("cy", data.y)
                               .attr("rx", data.xRadius)
                               .attr('ry', data.yRadius)
                               .style('stroke', '#fff')
                               .style('stroke-width', '1.5px')
                               .style('fill', color)
                               .append("svg:title")
                               .text(data.name);
    };

    proto.colors = function(number){
      switch(number){
        case 0:
          return '#1f77b4';
        case 1:
          return '#ff7f0e';
        case 2:
          return '#2ca02c';
        case 3:
          return '#d62728';
        case 4:
          return '#9467bd';
        case 5:
          return '#8c564b';
        default:
          return '#1f77b4';
      };
    };

    return proto;
  }
});
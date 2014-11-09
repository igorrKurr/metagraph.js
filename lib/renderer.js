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
      var group = container.append('g');

      var circle = group.append("ellipse")
                               .attr("cx", data.x)
                               .attr("cy", data.y)
                               .attr("rx", data.xRadius)
                               .attr('ry', data.yRadius)
                               .style('fill', 'transparent')
                               .style('stroke', 'black');
      group.append('text')
        .text(data.name)
        .attr({
          'x': data.x,
          'y': data.y
        })
    };

    return proto;
  }
});
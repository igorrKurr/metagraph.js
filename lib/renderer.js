define(['d3'], function(d3){
  return function (nodeName, width, height) {
    var proto = Object.create(null);
    proto.render = function(){
      var svgContainer = d3.select(nodeName).append("svg")
                                    .attr("width", width)
                                    .attr("height", height);

      //Draw the Circle
      var circle = svgContainer.append("circle")
                               .attr("cx", 30)
                               .attr("cy", 30)
                              .attr("r", 20);

    }

    return proto;
  }
});
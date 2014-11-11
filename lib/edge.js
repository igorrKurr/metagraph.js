define(['./abstract-element', './config', './abstract-graph', './utils', './edge'],
  function (AbstractElement, Config, AbstractGraph, Utils) {
    "use strict";
    return function (from, to) {
      var proto = Object.create();
      proto.from = from;
      proto.to = to;

      return proto;
  };
});
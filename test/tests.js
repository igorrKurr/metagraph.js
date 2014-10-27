var obj;

module('Utils', {
  setup: function() {
    obj = {x:10, y:10};
  }
});

test('directionOrt', function(){
  deepEqual(Utils().directionOrt(200,200,obj), {x: 0, y: 1});
  deepEqual(Utils().directionOrt(5,5,obj), {x: 0, y: -1});
  deepEqual(Utils().directionOrt(200,5,obj), {x: 1, y: 0});
  deepEqual(Utils().directionOrt(2,8,obj), {x: -1, y: 0});
});


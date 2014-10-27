test('levels', function(){
  expect(3);

  var division = levels(stubGraph());

  equal(division['level0'].length, 5);
  equal(division['level1'].length, 3);
  equal(division['level2'].length, 2);
});


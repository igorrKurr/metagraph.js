define(function(){
  return {
    capitalize: function(s) {
      return s && s[0].toUpperCase() + s.slice(1);
    },
    relationName: function(relation, type){
      var type = type || '';
      return relation + this.capitalize(type);
    }
  }
});
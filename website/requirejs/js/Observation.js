define("Observation", [], function() {

  function Observation(key, order, name, directives) {
    this.key = key;
    this.order = order;
    this.name = name;
    this.directives = directives;
  }

  return Observation;

});

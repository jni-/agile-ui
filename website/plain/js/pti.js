var Pti = (function() {

  function Pti(key, name, observations) {
    this.key = key;
    this.name = name;
    this.observations = observations;
  }

  Pti.prototype.findObservationByKey = function(key) {
    return _.filter(this.observations, function(o) {
      return o.key == key;
    })[0];
  }

  return Pti;

})();

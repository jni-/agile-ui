class Pti {
  constructor(key, name, observations) {
    this.key = key;
    this.name = name;
    this.observations = observations;
  }

  findObservationByKey(key) {
    return this.observations.filter(o => o.key == key)[0]
  }

}

export default Pti;

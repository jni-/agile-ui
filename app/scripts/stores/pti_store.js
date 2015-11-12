import Pti from '../domain/pti.js'
import Observation from '../domain/observation.js'
import Directive from '../domain/directive.js'
import UUID from '../utils/uuid.js'

const PtiStore = () => {
  return [
    new Pti(1, "Pti hospitalisation - 25/10/2015", [
      new Observation(UUID.newUUID(), 1, "Cannot move", [
        new Directive(UUID.newUUID(), "Turn around", "Every hour", "Every body"),
        new Directive(UUID.newUUID(), "Change bed", "Every day", "Nurse")
      ]),
      new Observation(UUID.newUUID(), 2, "Too weak to swallow", [
        new Directive(UUID.newUUID(), "No solid food", "PRN", "Nurse, Auxiliary"),
        new Directive(UUID.newUUID(), "Force to drink", "Every 2 hours | 4 days", "Auxiliary"),
        new Directive(UUID.newUUID(), "Can eat soup", "PRN", "Nurse")
      ]),
      new Observation(UUID.newUUID(), 3, "Bandage on arm", [
        new Directive(UUID.newUUID(), "Change bandage", "Every 6 hours | 10 days", "Doctor")
      ])
    ]),

    new Pti(2, "Pti ambulatoire - 26/02/2015", [
      new Observation(UUID.newUUID(), 1, "Confusion", [
        new Directive(UUID.newUUID(), "Cannot go outside", "All the time", "Everybody")
      ])
    ])
  ];
}

export default PtiStore;

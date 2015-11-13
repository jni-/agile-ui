define("ObservationGrid", ["ObservationForm"], function(ObservationForm) {

  function createEditButton(observation) {
    var $editButton = $('<button type="button" class="btn btn-xs btn-default"><span class="glyphicon glyphicon-pencil"></span></button>')

    $editButton.on('click', function() {
      ObservationForm.editObservation(observation);
    });

    return $editButton;
  }

  function addObservations(pti) {
    for(var i in pti.observations) {
      var observation = pti.observations[i];

      var $order = $('<td>').text(observation.order);
      var $name = $('<td>').text(observation.name);
      var $actions = $('<td>').append(createEditButton(observation));
      $('#observation-grid tbody').append($('<tr>').append($order, $name, $actions));
    }
  }

  function display(pti) {
    $('#observation-grid tbody tr').remove();
    addObservations(pti);
  }

  return {
    display: display,
    onPtiUpdated: ObservationForm.onPtiUpdated
  };
});

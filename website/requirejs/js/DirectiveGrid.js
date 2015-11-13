define("DirectiveGrid", ["ObservationForm"], function(ObservationForm) {

  function createEditButton(observation) {
    var $editButton = $('<button type="button" class="btn btn-xs btn-default"><span class="glyphicon glyphicon-pencil"></span></button>')

    $editButton.on('click', function() {
      ObservationForm.editObservation(observation);
    });

    return $editButton;
  }

  function addDirectives(pti) {
    for(var i in pti.observations) {
      var observation = pti.observations[i];

      for(var j in observation.directives) {
        var directive = observation.directives[j];

        var $directiveOrder = $('<td>').text(observation.order);
        var $directiveName = $('<td>').text(directive.name);
        var $directiveActions = $('<td>').append(createEditButton(observation));
        $('#directive-grid tbody').append($('<tr>').append($directiveOrder, $directiveName, $directiveActions));
      }
    }
  }

  function display(pti) {
    $('#directive-grid tbody tr').remove();
    addDirectives(pti);
  }

  return {
    display: display
  };
});

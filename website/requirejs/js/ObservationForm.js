define("ObservationForm", ["Directive", "UUID"], function(Directive, UUID) {

  var updateListeners = [];

  function onPtiUpdated(callback) {
    updateListeners.push(callback);
  }

  function addDirectiveToForm($modal, directive) {
    $field = $('<input>').addClass('form-control').val(directive.name);
    $field.on('change', function() {
      directive.name = $(this).val();
    });

    $modal.find('.directive-fields').append($('<div>').addClass('form-group').append($field));
  }

  function preFillForm($modal, observation) {
    $modal.find('input.observation-name').val(observation.name);
    $modal.find('input.observation-name').off('change').on('change', function() {
      observation.name = $(this).val();
    });

    $modal.find('button.add-directive').off('click').on('click', function() {
      var newDirective = new Directive(UUID.newUUID(), "");
      observation.directives.push(newDirective);
      addDirectiveToForm($modal, newDirective);
    });

    $modal.find('.directive-fields > *').remove();
    for(var i in observation.directives) {
      var directive = observation.directives[i];
      addDirectiveToForm($modal, directive);
    }
  }

  function editObservation(observation) {
    var $modal = $('#observationModalForm');
    preFillForm($modal, observation);
    $modal.modal('show');
  }

  $(function() {
    $('#observationModalForm').on('keypress', 'input', function(e) {
      if(e.keyCode == 13) {
        $('#observationModalForm').modal('hide');
      }
    });

    $('#observationModalForm').on('hidden.bs.modal', function(e) {
      for(var i = 0; i < updateListeners.length; i++) {
        updateListeners[i]();
      }
    });
  });

  return {
    editObservation: editObservation,
    onPtiUpdated: onPtiUpdated
  }

});



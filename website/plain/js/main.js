var ptis = PtiStore();

function loadSelectBox() {
  $('select').append($('<option>').text('Choose a PTI'));

  _.each(ptis, function(pti) {
    $('select').append($('<option>').attr('value', pti.key).text(pti.name));
  });
}

function createEditButton(observationKey) {
  return $('<button type="button" class="btn btn-xs btn-default" data-toggle="modal" data-target="#observationModalForm" data-observation-key="' + observationKey + '"><span class="glyphicon glyphicon-pencil"></span></button>')
}

function displayPti(pti) {
  if(!pti) {
    $('.alert').show();
    $('#grids').hide();
    return;
  }

  $('.alert').hide();
  $('#grids').removeClass("hide").show();
  $('#grids tbody > *').remove();

  for(var i in pti.observations) {
    var observation = pti.observations[i];

    var $order = $('<td>').text(observation.order);
    var $name = $('<td>').text(observation.name);
    var $actions = $('<td>').append(createEditButton(observation.key));
    $('#observation-grid tbody').append($('<tr>').append($order, $name, $actions));

    for(var j in observation.directives) {
      var directive = observation.directives[j];

      var $directiveOrder = $order.clone();
      var $directiveName = $('<td>').text(directive.name);
      var $directiveActions = $('<td>').append(createEditButton(observation.key));
      $('#directive-grid tbody').append($('<tr>').append($directiveOrder, $directiveName, $directiveActions));
    }
  }
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

$(function() {
  loadSelectBox();

  $('select').on('change', function() {
    var ptiKey = $(this).val();
    var pti = _.find(ptis, function(pti) {
      return pti.key == ptiKey;
    });

    displayPti(pti);
  });

  $('#observationModalForm').on('show.bs.modal', function(e) {
      var button = $(e.relatedTarget);
      var ptiKey = $('select').val();
      var observationkey = button.data('observation-key');
      var pti = _.find(ptis, function(pti) {
        return pti.key == ptiKey;
      });

      var observation = _.find(pti.observations, function(observation) {
        return observation.key == observationkey;
      });

      var $modal = $(this);
      preFillForm($modal, observation);

  });

  $('#observationModalForm').on('keypress', 'input', function(e) {
    if(e.keyCode == 13) {
      $('#observationModalForm').modal('hide');
    }
  });

  $('#observationModalForm').on('hidden.bs.modal', function(e) {
    $('select').trigger('change');
  });

});

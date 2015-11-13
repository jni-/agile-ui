define("ListPti", [], function() {

  var selectedListeners = [];

  function onPtiSelected(callback) {
    selectedListeners.push(callback);
  }

  function notifySelected(pti) {
    for(var i = 0; i < selectedListeners.length; i++) {
      selectedListeners[i](pti);
    }
  }

  function init(ptis) {
    $('select').append($('<option>').text('Choose a PTI'));
    _.each(ptis, function(pti) {
      $('select').append($('<option>').attr('value', pti.key).text(pti.name));
    });

    $('select').on('change', function() {
      var ptiKey = $(this).val();
      var pti = _.find(ptis, function(pti) {
        return pti.key == ptiKey;
      });

      notifySelected(pti);
    });
  }

  return {
    init: init,
    onPtiSelected: onPtiSelected
  }

});

require(['PtiList', 'PtiSheet', 'PtiStore'], function(PtiList, PtiSheet, PtiStore) {
  var ptis = PtiStore();

  PtiList.onPtiSelected(function(pti) {
    PtiSheet.display(pti);
  });

  $(function() {
    PtiList.init(ptis);
  });

});

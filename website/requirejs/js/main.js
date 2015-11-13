require(['ListPti', 'FeuillePti', 'PtiStore'], function(listPti, feuillePti, PtiStore) {
  var ptis = PtiStore();

  listPti.onPtiSelected(function(pti) {
    feuillePti.display(pti);
  });

  $(function() {
    listPti.init(ptis);
  });

});

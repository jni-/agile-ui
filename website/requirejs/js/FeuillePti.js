define("FeuillePti", ["ObservationGrid", "DirectiveGrid"], function(ObservationGrid, DirectiveGrid) {

  var currentPti;

  ObservationGrid.onPtiUpdated(function() {
    display(currentPti);
  });

  function display(pti) {
    currentPti = pti;
    if(!pti) {
      $('.alert').show();
      $('#grids').hide();
      return;
    }

    $('.alert').hide();
    $('#grids').removeClass("hide").show();

    ObservationGrid.display(pti);
    DirectiveGrid.display(pti);
  }

  return {
    display: display
  };
});

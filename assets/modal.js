import jQuery from 'jquery';

(function ($) {
    // open modal on hashes like #_action_get
    $(window).bind('hashchange', function (e) {
      var anchorId = document.location.hash.substr(1); //strip #
      var element = $('#' + anchorId);

      // do we have such element + is it a modal?  --> show it
      if (element.length && element.hasClass('modal')) {
        element.modal('show');
      }
    });

    // execute hashchange on first page load
    $(window).trigger('hashchange');

    // // remove url fragment on modal hide
    // $('.modal').on('hidden.bs.modal', function () {
    //   if (history && history.replaceState) {
    //     history.replaceState({}, '', '#');
    //   }
    // });
})(jQuery);

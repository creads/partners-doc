import jQuery from 'jquery';

(function ($) {
  var $window = $(window);
  var $goToTopEl = $('#gotoTop');

  $goToTopEl.click(function () {
    $('body,html').stop(true).animate({ scrollTop: 0 }, 400);
    return false;
  });

  $window.on('scroll', function () {
    if (window.matchMedia("(min-width: 992px)").matches) {
      //desktop, laptop, tablet
      if ($window.scrollTop() > 450) {
        $goToTopEl.fadeIn();
      } else {
        $goToTopEl.fadeOut();
      }
    }
  });

})(jQuery);

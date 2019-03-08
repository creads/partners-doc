import jQuery from 'jquery';
import 'jquery-ui/ui/widgets/tabs';

(function ($) {
  if (document.getElementsByClassName('tabs-enabled').length) {
    $("#tabs").tabs({ show: { effect: "fade", duration: 400 } })
      .on("tabsactivate", function (event, ui) {
        history.pushState({}, "", ui.newTab.find('a.ui-tabs-anchor').attr('href'));
      });

    if (window.location.hash) {
      $('#nav').find('ul > li > a').each(function (index, a) {
        console.log($(a).attr('href'))
        if ($(a).attr('href') == window.location.hash) {
          $('#tabs').tabs('option', 'active', index);
        }
      });
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 1);
    }
  }
})(jQuery);

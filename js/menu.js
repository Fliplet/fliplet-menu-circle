var $menuElement = $('[data-name="Circle"]');
var menuInstanceId = $menuElement.data('id');
var data = Fliplet.Widget.getData(menuInstanceId) || {};

$(function () {
  var el = $('<div style="width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px;"/>'),
    elDom = el.get(0);
  el.appendTo('body');
  if (elDom.offsetWidth === elDom.clientWidth) {
    $('body').addClass("hiddenScroll");
  }
  el.remove();
});

$.fn.hasScrollBar = function() {
  return this.get(0).scrollHeight > this.height();
}

$('body').addClass('fl-minimal-padding');

if (data.location) {
  $('body').addClass('fl-menu-circle-left');
} else {
  $('body').addClass('fl-menu-circle-right');
}

$('.fl-menu-circle-header .nav-toggle').on('click', function() {
  $('body').toggleClass('disableScroll');
  $(this).toggleClass('active');
  $('.fl-menu-circle-nav-holder .nav-circle').toggleClass('active');
  $('.fl-menu-circle-nav-list-holder').toggleClass('active').scrollTop(0);

  if (!$('body').hasClass('hiddenScroll') && $('body').hasScrollBar() && $('body').hasClass('disableScroll') && Fliplet.Env.get('platform') !== 'native') {
    $('.fl-menu-circle-header, .fl-menu-circle-nav-holder').css({
      'right': '30px'
    });
  } else {
    $('.fl-menu-circle-header, .fl-menu-circle-nav-holder').css({
      'right': '15px'
    });
  }
});

$('[open-about-overlay]').on('click', function() {
  Fliplet.Navigate.to({
    action: 'about-overlay'
  });
});
var $menuElement = $('[data-name="Expandable"]');
var menuInstanceId = $menuElement.data('id');
var data = Fliplet.Widget.getData(menuInstanceId) || {};

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

  if ($('body').hasScrollBar() && $('body').hasClass('disableScroll')) {
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
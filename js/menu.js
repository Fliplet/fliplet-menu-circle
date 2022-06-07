var $menuElement = $('[data-name="Circle"]');
var menuInstanceId = $menuElement.data('id');

if (menuInstanceId) {
  init();
}

function init() {
  var data = Fliplet.Widget.getData(menuInstanceId) || {};

  Fliplet.Hooks.on('addExitAppMenuLink', function() {
    var $exitButton = $([
      '<li class="linked with-icon" data-fl-exit-app>',
      '<div class="fl-menu-icon">',
      '<i class="fa fa-sign-out"></i>',
      '</div>' + T('widgets..menu.circle.actions.exit') + '</li>'
    ].join(''));

    $exitButton.on('click', function onExitClick() {
      Fliplet.Navigate.exitApp();
    });

    $menuElement.find('ul').append($exitButton);

    // Prevent default "Exit" link from being added
    return Promise.reject();
  });

  if ($('li.with-icon').length) {
    $('.fl-menu-circle-nav-list-holder .nav-list').addClass('with-icons');
  }

  $(function() {
    var el = $('<div style="width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px;"/>');
    var elDom = el.get(0);

    el.appendTo('body');

    if (elDom.offsetWidth === elDom.clientWidth) {
      $('body').addClass('hiddenScroll');
    }

    el.remove();
  });

  $.fn.hasScrollBar = function() {
    return this.get(0).scrollHeight > this.height();
  };

  if (data.location) {
    $('body').addClass('fl-menu-circle-left');
    $menuElement.addClass('fl-menu-circle-move-left');
  } else {
    $('body').addClass('fl-menu-circle-right');
    $menuElement.removeClass('fl-menu-circle-move-left');
  }

  $('.fl-menu-circle-header .nav-toggle').on('click keydown', function(event) {
    if (event.type !== 'click' && event.which !== 32 && event.which !== 13) {
      return;
    }

    var $toggle = $(this);
    var $body = $('body');

    $menuElement.find('.fl-menu-body').toggleClass('hidden');
    $toggle.find('.hamburger').toggleClass('is-active');
    $toggle.toggleClass('active');

    setTimeout(function() {
      $body.toggleClass('disableScroll circle-menu-active');
      $menuElement.find('.fl-menu-circle-nav-holder .nav-circle').toggleClass('active');
      $menuElement.find('.fl-menu-circle-nav-list-holder').toggleClass('active').scrollTop(0);

      if ($body.is(':not(.hiddenScroll).disableScroll') && $body.hasScrollBar() && Fliplet.Env.get('platform') !== 'native') {
        $menuElement.find('.fl-menu-circle-header, .fl-menu-circle-nav-holder').css({
          'right': '30px'
        });
      } else {
        $menuElement.find('.fl-menu-circle-header, .fl-menu-circle-nav-holder').css({
          'right': '15px'
        });
      }
    }, 0);
  });

  $('[open-about-overlay]').on('click', function() {
    Fliplet.Navigate.to({
      action: 'about-overlay'
    });
  });
}

Fliplet().then(function() {
  $menuElement.translate();
});

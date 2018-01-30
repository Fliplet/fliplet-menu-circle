var widgetId = Fliplet.Widget.getDefaultId();
var data = Fliplet.Widget.getData(widgetId) || {};

if (!data.location) {
  $('#menu-location').val('menuRight').trigger('change');
} else {
  $('#menu-location').val('menuLeft').trigger('change');
}

Fliplet.Widget.onSaveRequest(function() {
  var location;
  var menuLocation = $('#menu-location').val();

  if (menuLocation === 'menuLeft') {
    location = true;
  } else {
    location = false;
  }

  Fliplet.Widget.save({
    location: location
  }).then(function() {
    Fliplet.Widget.complete();
  });
});

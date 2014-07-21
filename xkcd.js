// Your code here!

$(document).ready(function() {

  WDI.init();
});

var WDI = {
  url: 'http://xkcd-unofficial-api.herokuapp.com/xkcd',
  template: '<li>' +
      '<div>' +
        '<h2>%title%</h2>' +
        '<div>' +
        '<img src="%src%" alt="%alt%">' +
      '</div>' +
      '</div>' +
      '</li>',

  init: function() {
    var date = new Date();
    var that = this;

    $('#year').click(function() {
      args = {year: date.getFullYear() - 1};
      that.callService(args);
    });
    $('#month').click(function() {
      args = {year: date.getFullYear() - 1, month: date.getMonth()};
      that.callService(args);
    });
    $('#day').click(function() {
      args = {year: date.getFullYear() - 1, month: date.getMonth(),day: date.getDate()};
      that.callService(args);
    });
  },

  callService: function(args) {
    var that = this;
    $.ajax({
      url: this.url,
      dataType: 'json',
      data: args,
    })
    .done(function(data) {
      console.log(data);
      $('#content').empty();
      if(data instanceof Array) {
        data.forEach(function(comic) {
          $('#content').append(that.buildItem(comic));
        });
      }
      else {
        $('#content').append(that.buildItem(data));
      }
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  },

  buildItem: function(comic) {
    var template = this.template;
    var date = new Date(comic["created at"]);

    template = template.replace('%src%', comic.img);
    template = template.replace('%alt%', comic.alt);
    template = template.replace('%title%', comic.title);
    tempalte = template.replace('%date%', comic.date());
    return template;
  }
};

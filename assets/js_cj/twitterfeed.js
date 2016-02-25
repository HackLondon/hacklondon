$( document ).ready(function() {

  var twitterItem = $('.twitter-item').width();
  var percentage = 0.7;
  var fontSize = 1.2;
  var fontSizeTUname = 1;

  if($(window).width() >= 1920) {
    percentage = 0.65;
    fontSize = 1.5;
    fontSizeTUname = 1.2;
  } else if($(window).width() >= 1440) {
    percentage = 0.7;
    fontSize = 1.2;
  }

  $('.twitter-item').css({'height':twitterItem*percentage+'px'});
  $('.tweet').css({'font-size':fontSize+'em'});
  $('.twitter-username').css({'font-size':fontSizeTUname+'em'});

  console.log($(window).width(), $(window).height());
});

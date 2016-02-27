$( document ).ready(function() {

  var twitterItem = $('.twitter-item').width();
  var percentage = 0.7;
  var fontSize = 1.2;
  var fontSizeTUname = 1;

  if($(window).width() >= 1920) {

    percentage = 0.65;
    fontSize = 1.5;
    fontSizeTUname = 1.2;

    $('.twitter-item').css({'height':twitterItem*percentage+'px'});
    $('.tweet').css({'font-size':fontSize+'em'});
    $('.announce').css({'font-size':fontSize+'em'});
    $('.twitter-username').css({'font-size':fontSizeTUname+'em'});

  } else if($(window).width() >= 1440) {

    percentage = 0.7;
    fontSize = 1.2;

    $('.twitter-item').css({'height':twitterItem*percentage+'px'});
    $('.tweet').css({'font-size':fontSize+'em'});
    $('.announce').css({'font-size':fontSize+'em'});
    $('.twitter-username').css({'font-size':fontSizeTUname+'em'});

  }

});

firstTimeFetch();
registerForPusher();


var listOfContents = [];

function registerForPusher() {

  var pusher = new Pusher('182514');
  var channel = pusher.subscribe('hacklondon');

  // channel.bind('admin', function(data) {
  //   alert('An event was triggered with message: ' + data.message);
  // });
  //
  // channel.bind('tweet', function(data) {
  //   alert('An event was triggered with message: ' + data.message);
  // });
}

function firstTimeFetch() {
  $.get("https://hacklondon2016.herokuapp.com/loadTweets", function(data, status){
        if(status == "success") {
          for (var i = 0; i < data.length; i++) {
            var object = data[i];
            var objectToSave = {};

            var isTwitter = object.is_twitter;
            var date = new Date(object.created_at);
            console.log(date);
            var hours = date.getHours();
            var mins = date.getMinutes();
            var dates = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            if (hours < 10) {
              hours = "0" + hours
            }
            if (mins < 10) {
              mins = "0" + mins
            }
            if (dates < 10) {
              dates = "0" + dates
            }
            if (month < 10) {
              month = "0" + month
            }

            var createdAt = hours + ":" + mins + "&nbsp;&nbsp;" + month + "-" + dates + "-" + year;

            if (isTwitter) {
              var twitterProfilePic = object.user.profile_image;
              var twitterUsername = "&#64;" + object.user.screen_name;
              var twitterContent = object.text;
              var twitterRetweets = object.retweet_count;
              var twitterLikes = object.favorite_count;

              objectToSave['isTwitter'] = isTwitter;
              objectToSave['createdAt'] = createdAt;
              objectToSave['t_profilepic'] = twitterProfilePic;
              objectToSave['t_username'] = twitterUsername;
              objectToSave['t_content'] = twitterContent;
              objectToSave['t_retweets'] = twitterRetweets;
              objectToSave['t_likes'] = twitterLikes;

            } else {

              objectToSave['isTwitter'] = isTwitter;
              objectToSave['createdAt'] = createdAt;
              objectToSave['announce_content'] = object.text;

            }

            listOfContents.push(objectToSave);

            updateList();

          }
        } else {
          console.log(status);
        }
    });
}

function updateList() {

  var htmlBlock = "";

  for (i = 0; i < listOfContents.length; i++) {
    var isTwitter = listOfContents[i].isTwitter;
    var object = listOfContents[i];

    var htmlString = "";

    var leftOrRight = "";
    if (i % 2 == 0) {
      leftOrRight = "left";
    } else {
      leftOrRight = "right";
    }

    if (isTwitter) {

      htmlString = "<li id=\"twitter-item-" + leftOrRight + "\" class=\"twitter-item\">" +
        "<span class=\"twitter-avatar\">" +
          "<img id=\"twitter-profilepic\" class=\"twitter-profilepic\" src=\"" + object.t_profilepic + "\" />" +
  			"</span>" +
        "<a id=\"twitter-user-url\" class=\"twitter-username\" href=\"https://twitter.com/" + object.t_username + "\" target=\"_blank\">" + object.t_username + "</a>" +
        "<!-- Separator -->" +
        "<p id=\"tweet\" class=\"tweet\">" + object.t_content + "</p>" +
        "<!-- Separator -->" +
        "<p id=\"twitter-counts\" class=\"twitter-counts\">" + object.createdAt + "</p>" +
      "</li>";

    } else {

      htmlString = "<li id=\"announce-item-" + object.leftOrRight + "\" class=\"twitter-item\">" +
        "<p id=\"announce-time\" class=\"announce-time\">" + object.createdAt + " - HackLondon Announcement</p>" +
        "<p id=\"announce\" class=\"announce\">" + object.announce_content + "</p>" +
      "</li>";

    }

    if (leftOrRight == "right") {
      htmlString += "<li id=\"clear\" class=\"clear\"></li>"
    }

    htmlBlock += htmlString;

  }

  document.getElementById('twitter-item-wrapper').innerHTML = htmlBlock;

}


function updateListItemHeight() {

}

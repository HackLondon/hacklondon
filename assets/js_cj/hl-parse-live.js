var currentInSession = false;
var firstTimeFetch = true;

Parse.initialize("KaGb9uxdCYZEA4Ssaez2PF8RJciZF3wvwwMnW0J0", "b8aYmyy5nE4aQdR1goCXVFPEp3EIi5qcd9grAV7K");

var dateArray = [];
var dateEndArray = [];
var titleArray = [];
var locationArray = [];
var nsdateArray = [];

function fetchData() {

  var EventsObj = Parse.Object.extend("HackLondon");

  var query = new Parse.Query(EventsObj);
  query.ascending("startTime");

  console.log("fetching");
  titleArray = [];


  query.find({
    success: function(results) {

      console.log("query");

      var skipping = true;
      var counter = 0;

      for (var i = 0; i < results.length; i++) {
        var object = results[i];

        var start = object.get('startTime');
        var end = object.get('endTime');
        var now = new Date();
        var room = object.get('location');

        if ((now >= start && now < end) || now <= start) {
          skipping = false;
        } else {
          if (skipping == true) {
            console.log("continue...");
            continue;
          }
        }

        counter++;
        console.log("check continue...");

        if (counter > 2) {
          break;
        }

        titleArray.push(object.get('title'));

      }

      // Update UI
      document.getElementById('li-currentEvent').innerHTML = "<a class=\"header-a\" href=\"http://hacklondon.org/schedule\">Current Event: " + titleArray[0] + "</a>";
      document.getElementById('li-upnext').innerHTML = "<a class=\"header-a\" href=\"http://hacklondon.org/schedule\">Up Next: " + titleArray[1] + "</a>";

      console.log("after breaking");

      createList(dateArray, dateEndArray, titleArray, locationArray, nsdateArray);
      window.setInterval(function () {checkUpdate()}, 10000);

    },
    error: function(error) {
      console.log(error);
    }
  });
}

fetchData();


function createList(dateArray, dateEndArray, titleArray, locationArray, nsdateArray) {
  var options = {
    item: 'liveblog-item'
  };

  var values = [];
  for (var i = 0; i < titleArray.length; i++) {

    console.log(titleArray[i]);

    var time = '';
    if (dateEndArray[i] == "") {
      time = dateArray[i];
    } else {
      time = dateArray[i] + ' - ' + dateEndArray[i];
    }

    if (locationArray[i] != "") {
      time += "&nbsp;&nbsp; <a class=\"time-b\">" + locationArray[i] + "</a>";
    }

    var temp = {
      title: titleArray[i],
      time: time,
    };
    values.push(temp);
  }

  var liveList = new List('liveblog-list', options, values);
  liveList.update();
  console.log(liveList.size());


  var list = document.getElementById('liveblog-list').getElementsByTagName("li");
  for (var i = 0; i < titleArray.length; i++) {
    if (nsdateArray[i].getDate() == 28) {
      list[i].classList.add("greenIndicator");
    }
  }

}

function updateList(dateArray, dateEndArray, titleArray, locationArray) {

  console.log("updating list");
  var options = {
    valueNames: ['title', 'time']
  };

  var values = [];
  for (var i = 0; i < titleArray.length; i++) {

    var time = '';
    if (dateEndArray[i] == "") {
      time = dateArray[i];
    } else {
      time = dateArray[i] + ' - ' + dateEndArray[i];
    }

    if (locationArray[i] != "") {
      time += "&nbsp;&nbsp; <a class=\"time-b\">" + locationArray[i] + "</a>";
    }

    var temp = {
      title: titleArray[i],
      time: time,
      location: locationArray[i],
    };
    values.push(temp);
  }

  var liveList = new List('liveblog-list', options);
  liveList.clear();
  liveList.add(values);

  var list = document.getElementById('liveblog-list').getElementsByTagName("li");
  for (var i = 0; i < titleArray.length; i++) {
    if (nsdateArray[i].getDate() == 28) {
      list[i].classList.add("greenIndicator");
    }
  }

}

function toTimeZone(time) {
  var format = 'YYYY/MM/DD HH:mm:ss';
  moment.tz.add('Europe/London|GMT|0|0000|0');
  var sfTime = new Date(moment(time, format).tz('Europe/London').format(format));

  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "June", "July",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var hours = sfTime.getHours();
  var mins = sfTime.getMinutes();
  var secs = sfTime.getSeconds();
  if (hours < 10) {
    hours = "0" + hours
  };
  if (mins < 10) {
    mins = "0" + mins
  };
  if (secs < 10) {
    secs = "0" + secs
  };

  var timeHMS = hours + ":" + mins;
  var day = sfTime.getDate();
  var monthIndex = sfTime.getMonth();
  var year = sfTime.getFullYear();

  return timeHMS;
  // return timeHMS + "&nbsp;" + monthNames[monthIndex] + " " + day;
}


function checkUpdate() {
  console.log("Checking update");
  fetchData();
}

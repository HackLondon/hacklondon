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
  dateArray = [];
  dateEndArray = [];
  titleArray = [];
  locationArray = [];


  query.find({
    success: function(results) {

      console.log("query");
      document.getElementById('li-upcmsessions').innerHTML = "<a class=\"header-a\">#HL2016 Schedule</a>";

      var skipping = true;
      // var counter = 0;

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

        console.log("check continue...");

        var date = toTimeZone(start.toISOString());
        dateArray.push(date);
        if (end == null) {
          dateEndArray.push("");
        } else {
          dateEndArray.push(toTimeZone(end.toISOString()));
        }

        titleArray.push(object.get('title'));
        locationArray.push(room);
        nsdateArray.push(start);

      }

      console.log("after breaking");

      if (firstTimeFetch == true) {
        createList(dateArray, dateEndArray, titleArray, locationArray, nsdateArray);
        window.setInterval(function () {checkUpdate()}, 10000);
        firstTimeFetch = false;
      } else {
        updateList(dateArray, dateEndArray, titleArray, locationArray, nsdateArray);
      }

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
  // query.find({
  //   success: function(results) {
  //     if (results.length != titleArray.length) {
  //       console.log("Updated!");
  //       // window.location.reload();
  //
  //     }
  //   },
  //   error: function(error) {
  //     console.log(error);
  //   }
  // })
}

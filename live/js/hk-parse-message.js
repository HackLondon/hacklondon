Parse.initialize("KaGb9uxdCYZEA4Ssaez2PF8RJciZF3wvwwMnW0J0", "b8aYmyy5nE4aQdR1goCXVFPEp3EIi5qcd9grAV7K");

var MessagesObj = Parse.Object.extend("Messages");

var query = new Parse.Query(MessagesObj);
var numberOfEntries;
// query.equalTo("valid", true);
query.ascending("index");


function fetchMsgData() {

  query.find({
    success: function(results) {

      var string = "";

      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        string += object.get("content");

        if (i != results.length - 1) {
          string += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }

      }

      document.getElementById("marqueetext").innerHTML = string;

    },
    error: function(error) {
      console.log(error);
    }
  });
}

fetchMsgData();

window.setInterval(function () {fetchMsgData();}, 10000);

Parse.initialize("SUoxyEfUvPuLTsZyJM8Q8LLl3foylrsfAi7Wzhhi", "qxE5MIG3XzUTlh6mvwt8cCZeHVuHkrYLkqnSxuFG");

var Teams = Parse.Object.extend("Teams");

var queryTeams = new Parse.Query(Teams);
var queryTeams2 = new Parse.Query(Teams);
queryTeams2.descending("total");

var vals = [];
queryTeams.find({
    success: function (results) {
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            var total = object.get("A") + object.get("B");
            object.set("total", total);
            object.save();
            vals[i] = object;
        }
        
        
        queryTeams2.find({
                success: function (results) {
                    for (var i = 0; i < results.length; i++) {
                        console.log("hello");
                        var object = results[i];
                        var newitem = document.createElement('tr');
                        var teamname= document.createElement('td');
                        teamname.innerHTML = object.get('TeamName');
                        var teampoints= document.createElement('td');
                        teampoints.innerHTML = object.get('total');
                        newitem.appendChild(teamname);
                        newitem.appendChild(teampoints);
                        var leaderboard = document.getElementById("leaderboard");

                        console.log(leaderboard);
                        console.log(newitem);
                        leaderboard.appendChild(newitem);
                    }
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }

            });
        
        
        
        
        
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }

});
 

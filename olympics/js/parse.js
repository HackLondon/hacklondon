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
            var total = 0;
            var letters =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","BB","CC","DD","EE","FF","GG"];
            for (var j = 0; j < letters.length; j++)
            {
                if (object.get(letters[j]))
                {
                    total += object.get(letters[j]);
                    object.set("total", total);
                    console.log("total" + total);
                }
            }
            object.save();
            
            
            
            vals[i] = object;
        }
        
        
        queryTeams2.find({
                success: function (results) {
                    for (var i = 0; i < 0/*results.lenght*/; i++) {
                        var object = results[i];
                        var newitem = document.createElement('tr');
                        var teamname= document.createElement('td');
                        teamname.innerHTML = object.get('TeamName');
                        var teampoints= document.createElement('td');
                        teampoints.innerHTML = object.get('total');
                        newitem.appendChild(teamname);
                        newitem.appendChild(teampoints);
                        var leaderboard = document.getElementById("leaderboard");

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
 

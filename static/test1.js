var commits = document.getElementById("total_commits");

var charlie_commits = 0;
var chris_commits = 0;
var kevin_commits = 0;
var yijie_commits = 0;
var justin_commits = 0;

$.ajax(
  {
    url: "https://gitlab.com/api/v4/projects/7268012/repository/commits?page=1&per_page=1000&private_token=wYwwhFPaUQFis_Zj7_y1",
    async: true,
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    method: "GET"
  }).done(function(response)
    {
      console.log(response);
      commits.innerHTML = response.length;
      for(x in response)
      {
        var name = response[x].committer_name;
        if(name === "CharlieM3")
          charlie_commits++;
        else if(name === "Chris Amini")
          chris_commits++;
        else if(name === "Kevin Singh")
          kevin_commits++;
        else if(name === "Yijie Tang")
          yijie_commits++;
        else if(name === "Justin Berman")
          justin_commits++;
      }
      document.getElementById("charlie_commits").innerHTML = charlie_commits;
      document.getElementById("chris_commits").innerHTML = chris_commits;
      document.getElementById("kevin_commits").innerHTML = kevin_commits;
      document.getElementById("yijie_commits").innerHTML = yijie_commits;
      document.getElementById("justin_commits").innerHTML = justin_commits;
    });
    
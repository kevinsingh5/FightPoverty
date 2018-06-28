var charlie_commits = 0;
var chris_commits = 0;
var kevin_commits = 0;
var yijie_commits = 0;
var justin_commits = 0;

//var charlie_issues = 0;
//var chris_issues = 0;
//var kevin_issues = 0;
//var yijie_issues = 0;
//var justin_issues = 0;

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
      for(var i in response)
      {
        var name = response[i].committer_name;
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

      $("#charlie_commits").html(charlie_commits);
      $("#chris_commits").html(chris_commits);
      $("#kevin_commits").html(kevin_commits);
      $("#yijie_commits").html(yijie_commits);
      $("#justin_commits").html(justin_commits);
    });

    
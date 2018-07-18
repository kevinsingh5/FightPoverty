var charles_commits = 0;
var chris_commits = 0;
var kevin_commits = 0;
var yijie_commits = 0;
var justin_commits = 0;
var unidentified_commits = 0;
var total_commits = 0;

var charles_issues = 0;
var chris_issues = 0;
var kevin_issues = 0;
var yijie_issues = 0;
var justin_issues = 0;
var unidentified_issues = 0;
var total_issues = 0;

function getPageCommits(pg) {
  $.ajax({
    url: "https://gitlab.com/api/v4/projects/7268012/repository/commits?page=" + pg + "&per_page=100&private_token=wYwwhFPaUQFis_Zj7_y1",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    method: "GET"
  }).done(
    function(response) {
      console.log("commits page " + pg);
      let pg_commits = response.length;
      total_commits += pg_commits;
      console.log(pg_commits);
      for(let i in response) {
        let email = response[i].author_email;
        if(email === "charliematar@utexas.edu")
          charles_commits++;
        else if(email === "amchris98@gmail.com" || email === "chris.amini0@gmail.com")
          chris_commits++;
        else if(email === "singhk7@yahoo.com")
          kevin_commits++;
        else if(email === "ytang2015@gmail.com")
          yijie_commits++;
        else if(email === "justinberman95@gmail.com")
          justin_commits++;
        else {
          console.log("??: " + email);
          unidentified_commits++;
        }
      }
      console.log("total: " + total_commits);
      if(pg_commits > 0)
        getPageCommits(pg + 1);
      else {
        console.log("total commits: " + total_commits);
        console.log("charles commits: " + charles_commits);
        console.log("chris commits: " + chris_commits);
        console.log("kevin commits: " + kevin_commits);
        console.log("yijie commits: " + yijie_commits);
        console.log("justin commits: " + justin_commits);
        console.log("unknown commits: " + unidentified_commits);
        $("#charles_commits").html(charles_commits);
        $("#chris_commits").html(chris_commits);
        $("#kevin_commits").html(kevin_commits);
        $("#yijie_commits").html(yijie_commits);
        $("#justin_commits").html(justin_commits);
        $("#unidentified_commits").html(unidentified_commits);
        $("#total_commits").html(total_commits);
      }
    }
  );
}

function getPageIssues(pg) {
  $.ajax({
    url: "https://gitlab.com/api/v4/projects/7268012/issues?page=" + pg + "&per_page=100&private_token=wYwwhFPaUQFis_Zj7_y1",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    method: "GET"
  }).done(
    function(response) {
      console.log("issues page " + pg);
      let pg_issues = response.length;
      total_issues += pg_issues;
      console.log(pg_issues);
      for(let i in response) {
        let name = response[i].author.username;
        if(name === "CharlieM3")
          charles_issues++;
        else if(name === "chris.amini")
          chris_issues++;
        else if(name === "j-berman")
          justin_issues++;
        else if(name === "kevinsingh")
          kevin_issues++;
        else if(name === "ytang2015")
          yijie_issues++;
        else {
          console.log("??: " + name);
          unidentified_issues++;
        }
      }
      console.log("total: " + total_issues);
      if(pg_issues > 0)
        getPageIssues(pg + 1);
      else {
        console.log("total issues: " + total_issues);
        console.log("charles issues: " + charles_issues);
        console.log("chris issues: " + chris_issues);
        console.log("kevin issues: " + kevin_issues);
        console.log("yijie issues: " + yijie_issues);
        console.log("justin issues: " + justin_issues);
        console.log("unknown issues: " + unidentified_issues);
        $("#charles_issues").html(charles_issues);
        $("#chris_issues").html(chris_issues);
        $("#kevin_issues").html(kevin_issues);
        $("#yijie_issues").html(yijie_issues);
        $("#justin_issues").html(justin_issues);
        $("#unidentified_issues").html(unidentified_issues);
        $("#total_issues").html(total_issues);
      }
    }
  );
}

getPageCommits(1);
getPageIssues(1);


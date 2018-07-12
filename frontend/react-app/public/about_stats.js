$.get("https://gitlab.com/api/v4/projects/7268012?private_token=wYwwhFPaUQFis_Zj7_y1", function(gitlabData){
    $("#description").html(gitlabData.description);
    $("#name").html(gitlabData.name);
    $("#time_created").html(gitlabData.created_at);
    $("#URL").html(gitlabData.web_url);
    $("#readme").html(gitlabData.readme_url);
    $("#num_stars").html(gitlabData.star_count);
    $("#num_forks").html(gitlabData.forks_count);
    $("#time_last_update").html(gitlabData.last_activity_at);
});
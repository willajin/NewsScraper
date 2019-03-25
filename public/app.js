// grab articles as json
$.getJSON("/articles", function (data) {
    for (let i = 0; i < data.length; i++) {
        // display articles
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].url + "<br />" + data[i].summary + "</p>");
        console.log(data[i]._id);
    }
});

// on click event to scrape

// on click event for p tag
$(document).on("click", "p", function() {
    // empty notes
    $("#notes").empty();

    // save id of p tag
    const thisId = $(this).attr("data-id");

    // ajax call for article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // add note to page
        .then(function (data) {
            // add note inputs
            $("#notes").append(data.title);
            $("#notes").append("<input id='titleInput' name='title'>");
            $("#notes").append("<textarea id='bodyInput' name='body'></textarea>");
            $("#notes").append("<button class='btn waves-effect waves-light grey' data-id='" + data._id + "' id='saveNote'>Save</button>");
            $("#notes").append("<button class='btn waves-effect waves-light grey' data-id='" + data._id + "' id='deleteNote'>Delete</button>");

            // display note if exists
            if (data.note) {
                $("#titleInput").val(data.note.title);
                $("#bodyInput").val(data.note.body);
            }
        });
});

// on click event to save note
$(document).on("click", "#saveNote", function() {
    const thisId = $(this).attr("data-id");

    // ajax post request to update note
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    })
    .then(function(data) {
        console.log(data);
        $("#notes").empty();
    });

    $("#titleInput").val("");
    $("#bodyInput").val("");
});

// on click event to delete note
$(document).on("click", "#deleteNote", function() {
    const thisId = $(this).attr("data-id");

    // ajax request to delete note
    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisId
    })
    .then(function(data) {
        console.log(data);
        location.reload();
    });
});
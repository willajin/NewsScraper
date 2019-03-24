// on click event to scrape articles

// grab articles as json
$.getJSON("/articles", function(data) {
    for (const i = 0; i < data.length; i++) {
        // display articles
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].url + "</p>");
    }
});
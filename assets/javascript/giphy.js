//Array where our dynamic buttons will be created from
var topic = ["thug life", "crying jordan", "deal with it", "office monkey", "kermit", "white guy blinking",];
//the function that gives the classes, attributes, etc to the new buttons and buttons in the array
function preButtons() {
    $("#buttons").empty();

    for (var i = 0; i < topic.length; i++) {
        var dynamicButton = $("<button>");
        dynamicButton.addClass("meme");
        dynamicButton.addClass("btn btn-primary");
        dynamicButton.attr("data-name", topic[i]);
        dynamicButton.text(topic[i]);
        $("#buttons").append(dynamicButton);
    }
}

//This block of code targets the user input in the form and removes white space as well as preventing submission or refersh of site
$("#add-meme").on("click", function () {

    event.preventDefault();

    var userinput = $("#meme-input").val().trim();
    topic.push(userinput);

    preButtons();

    $("#meme-input").val("");
    return false;


});

//this function uses the Giphy API to pull the values, use that valueto search in giphy and get our images, then we add attributes and classes to the objects (gifs) pulled from the API. Limit of 
//ten gifs per query. This also adds the rating in a paragraph tag and the images to our div.
function popGifs() {
    var popMemes = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + popMemes + "&api_key=juboqjsdSH8ymCbXBHhTXFonPMNydXtl&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        $("#pop-memes").empty();

        for (var j = 0; j < results.length; j++) {
            var gifDiv = $("<div class=gifs>");
            var gifView = results[j].images.fixed_height.url;
            var fixedStill = results[j].images.fixed_height_still.url;
            

            var memeImage = $("<img>").attr("src", fixedStill).attr('data-animate', gifView).attr('data-still', fixedStill);
            memeImage.attr('data-state', 'still');
            memeImage.width(300).height(200)
            var rating = results[j].rating;
            var showRating = $("<p>").text("Rating: " + rating);
            $("#pop-memes").prepend(showRating);
            memeImage.addClass('gif');
            gifDiv.append(memeImage);
            $("#pop-memes").prepend(gifDiv);
            memeImage.on("click", pausePlayGif);

            
            
        }

    })


//This is the code that allows you to pause and play a gif that was populated above

    function pausePlayGif() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    }

};

//last few lines of code that run our functions 

$(document).on("click", ".meme", popGifs);

preButtons();

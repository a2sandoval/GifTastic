$(document).ready(function(){
 var topic = ["success kid", "sponge bob meme","bear meme","reddit meme"];

function ShowMemeButtons() {
    $("#memebuttons").empty(); 

    for (var i = 0; i <topic.length; i++) {
        var j = $("<button>");
        j.addClass("btn btn arraytopics");
        j.attr("data-name", topic[i]);
        j.text(topics[i]);
        $("#memebuttons").append(j);
        $('#memeInput').val('')
        console.log(topic);

    }
    
}
    




})

ShowMemeButtons();
//How to Pause/Play a GIF
$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
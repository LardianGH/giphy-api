
var topics = ["cat", "dog", "fish", "snail"];

var addGif = function() {

    var searchTerm = $(this).attr("data-name");

    var key = "pZgX54Wez0czcsiYa1Nuj0pr6CaMSzwl"

    var gifNumber = 3

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + key + "&limit=" + gifNumber

    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {


        var gifBox = $("<div>");

        var gif = $("<img>")
        
        gif.attr("src", response.data[0].images.original.webp);

        gif.attr("alt", (searchTerm + " gif"));

         $("#output").prepend(gif);
         
        console.log(response)
        

      });
}

var addButtons = function() {

    $("#buttonBox").html("")

    for (var i = 0; i < topics.length; i++) { //loops through all topics

        var button = $("<button>");

        button.addClass("button");

        button.attr("data-name", topics[i]);

        button.text(topics[i]);

        $("#buttonBox").append(button);

    }

}

$("#add-topic").on("click", function(event) {

    event.preventDefault();

    var newTopic = $("#input").val().trim(); //gets the string entered into the textbox and removes whitespace

    topics.push(newTopic);

    $("#input").val("")

    addButtons();

})
    
$(document).on("click", ".button", addGif);

addButtons(); //inital run to add the starting buttons
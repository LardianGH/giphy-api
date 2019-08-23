
var topics = ["cat", "dog", "fish", "snail"];

var addGif = function() {

    var searchTerm = $(this).attr("data-name").replace(/\s/g,''); //gets the input without spaces

    var key = "pZgX54Wez0czcsiYa1Nuj0pr6CaMSzwl"

    var gifNumber = $("#gifNum").val()

    for (i=0; i<gifNumber; i++) {

    var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=" + key + "&tag=" + searchTerm

    console.log(queryURL)
    console.log(searchTerm)
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {


        var gifBox = $("<div>").addClass("box");

        var gif = $("<img>").addClass("gif");

        gif.attr("data-play", response.data.images.fixed_height.webp);

        gif.attr("data-stop", response.data.images.fixed_height_still.url);

        gif.attr("data-state", "still")
        
        gif.attr("src", (gif).attr("data-stop")); //initial spawning state

        gif.attr("alt", (searchTerm + " gif"));

        $(gifBox).append($(gif));

        $(gifBox).append("<br>" + response.data.title);

         $("#output").prepend(gifBox);
         
        console.log(response)
        
      
      });
    }
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

    if ($("#input").val() === "") {
        return null;
    }
    else {

    var newTopic = $("#input").val().trim(); //gets the string entered into the textbox and removes whitespace

    topics.push(newTopic);

    $("#input").val("")

    addButtons();

    }

})

var pausePlay = function() {

  var state = ($(this).attr("data-state"))

  console.log(state)

  if (state === "still") {

    $(this).attr("data-state", "play")

    $(this).attr("src", $(this).attr("data-play"))

    $(this.parentElement).css("border-color", "green");

    $(this).css("opacity", 1)

  }

  else {

    $(this).attr("data-state", "still")

    $(this).attr("src", $(this).attr("data-stop"))

    $(this.parentElement).css("border-color", "darkgray");

    $(this).css("opacity", 0.4)

}

}


    
$(document).on("click", ".button", addGif);

$(document).on("click", ".gif", pausePlay);

addButtons(); //inital run to add the starting buttons
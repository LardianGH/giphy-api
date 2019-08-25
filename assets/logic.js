
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

        var saveBut = $("<button>")

        saveBut.addClass("saveBut");

        saveBut.text("save gif");

        gif.attr("data-play", response.data.images.fixed_height.webp);

        gif.attr("data-stop", response.data.images.fixed_height_still.url);

        gif.attr("data-state", "still")
        
        gif.attr("src", (gif).attr("data-stop")); //initial spawning state

        gif.attr("alt", (searchTerm + " gif"));

        $(gifBox).append($(gif));

        $(gifBox).append("<br>")

        $(gifBox).append(saveBut)

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

var saving = function() {
var grabGif = $(this).siblings()[0]
  // console.log($(this.next()).attr("data-state")) //Trying to grab the gif, not working.
console.log(grabGif.src)
console.log(grabGif.dataset.play)
console.log(grabGif.dataset.stop)
console.log(grabGif.dataset.state)

var source = grabGif.src
var alt = grabGif.alt
var playing = grabGif.dataset.play
var stopping = grabGif.dataset.stop
state = grabGif.dataset.state

//adding the saveBoxes

var gifBox = $("<div>").addClass("box");

var gif = $("<img>").addClass("gif");

var delBut = $("<button>")

delBut.addClass("delBut");

delBut.text("delete");

gif.attr("data-play", playing);

gif.attr("data-stop", stopping);

gif.attr("data-state", state)

gif.attr("src", source); //initial spawning state

gif.attr("alt", alt);

$(gifBox).append($(gif));

$(gifBox).append("<br>")

$(gifBox).append(delBut)

 $("#saved").prepend(gifBox);

//end adding the saveBoxes
}

var yeet = function() {

  $(this.parentElement).css("display", "none")

}


    
$(document).on("click", ".button", addGif);

$(document).on("click", ".gif", pausePlay);

$(document).on("click", ".saveBut", saving);

$(document).on("click", ".delBut", yeet);

addButtons(); //inital run to add the starting buttons
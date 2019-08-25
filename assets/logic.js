
var topics = ["cat", "dog", "fish", "snail"];

var delBut = $("<button>")

delBut.addClass("delBut");

delBut.text("delete");

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

        var delBut = $("<button>")

        delBut.addClass("delBut");

        delBut.text("delete");

        gif.attr("data-play", response.data.images.fixed_height.webp);

        gif.attr("data-stop", response.data.images.fixed_height_still.url);

        gif.attr("data-state", "still")

        gif.attr("data-name", response.data.title);

        var name =  gif.attr("data-name")

        console.log(response.data.title)
        
        gif.attr("src", (gif).attr("data-stop")); //initial spawning state

        gif.attr("alt", (searchTerm + " gif"));

        $(gifBox).append($(gif));

        $(gifBox).append("<br>")

        $(gifBox).append(saveBut)

        $(gifBox).append(delBut);

        $(gifBox).append("<br>")

        $(gifBox).append(name + " ");

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
  console.log(grabGif)
console.log(grabGif.title)

localStorage.setItem("source", (grabGif.src));
localStorage.setItem("alt", (grabGif.alt));
localStorage.setItem("playing", (grabGif.dataset.play));
localStorage.setItem("stopping", (grabGif.dataset.stop));
localStorage.setItem("gifName", grabGif.dataset.name);
localStorage.setItem("state", (grabGif.dataset.state));

var source = localStorage.getItem("stopping");
var alt = localStorage.getItem("alt");
var playing = localStorage.getItem("playing");
var stopping = localStorage.getItem("stopping");
var name = localStorage.getItem("gifName");
state = localStorage.getItem("state");

//adding the saveBoxes

var gifBox = $("<div>").addClass("saveBox");

var gif = $("<img>").addClass("gif");

gif.attr("data-play", playing);

gif.attr("data-stop", stopping);

gif.attr("data-state", state)

gif.attr("src", source); //initial spawning state

gif.attr("alt", alt);

$(gifBox).append("Favorie Gif:");

$(gifBox).append("<br>");

$(gifBox).append($(gif));

$(gifBox).append("<br>");

$(gifBox).append(name + " ");

$(gifBox).append(delBut);

 $("#saved").html(gifBox);

//end adding the saveBoxes
}

var yeet = function() {

  $(this.parentElement).css("display", "none")
  localStorage.clear();
}

var loadSavedGif = function() {
  
var source = localStorage.getItem("stopping");
var alt = localStorage.getItem("alt");
var playing = localStorage.getItem("playing");
var stopping = localStorage.getItem("stopping");
var name = localStorage.getItem("gifName");
state = localStorage.getItem("state");

var gifBox = $("<div>").addClass("saveBox");

var gif = $("<img>").addClass("gif");

gif.attr("data-play", playing);

gif.attr("data-stop", stopping);

gif.attr("data-state", state)

gif.attr("src", source); //initial spawning state

gif.attr("alt", alt);

$(gifBox).append("Favorie Gif:");

$(gifBox).append("<br>")

$(gifBox).append($(gif));

$(gifBox).append("<br>")

$(gifBox).append(name + ' ');

$(gifBox).append(delBut)

 $("#saved").html(gifBox);


}


    
$(document).on("click", ".button", addGif);

$(document).on("click", ".gif", pausePlay);

$(document).on("click", ".saveBut", saving);

$(document).on("click", ".delBut", yeet);

addButtons(); //inital run to add the starting buttons

if (localStorage.getItem("source") !== null) {
loadSavedGif();
}

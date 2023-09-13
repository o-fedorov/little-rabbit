// Define the app configuration
var appConfig = {
  1: {
    allowedNext: [2, 3],
    transitionText: {
      2: "You are moving from location 1 to location 2.",
      3: "You are moving from location 1 to location 3."
    },
    locationText: "You are at location 1."
  },
  2: {
    allowedNext: [1, 5],
    transitionText: {
      1: "You are moving from location 2 to location 1.",
      5: "You are moving from location 2 to location 5."
    },
    locationText: "You are at location 2."
  },
  3: {
    allowedNext: [1, 4],
    transitionText: {
      1: "You are moving from location 3 to location 1.",
      4: "You are moving from location 3 to location 4."
    },
    locationText: "You are at location 3."
  },
  4: {
    allowedNext: [3, 6],
    transitionText: {
      3: "You are moving from location 4 to location 3.",
      6: "You are moving from location 4 to location 6."
    },
    locationText: "You are at location 4."
  },
  5: {
    allowedNext: [2, 7],
    transitionText: {
      2: "You are moving from location 5 to location 2.",
      7: "You are moving from location 5 to location 7."
    },
    locationText: "You are at location 5."
  },
  6: {
    allowedNext: [4, 8],
    transitionText: {
      4: "You are moving from location 6 to location 4.",
      8: "You are moving from location 6 to location 8."
    },
    locationText: "You are at location 6."
  },
  7: {
    allowedNext: [5, 9],
    transitionText: {
      5: "You are moving from location 7 to location 5.",
      9: "You are moving from location 7 to location 9."
    },
    locationText: "You are at location 7."
  },
  8: {
    allowedNext: [6, 9],
    transitionText: {
      6: "You are moving from location 8 to location 6.",
      9: "You are moving from location 8 to location 9."
    },
    locationText: "You are at location 8."
  },
  9: {
    allowedNext: [7],
    transitionText: {
      7: "You are moving from location 9 to location 7.",
      8: "You are moving from location 9 to location 8.",
    },
    locationText: "You are at location 9."
  },
};

var locations = document.querySelectorAll(".location");
var display = document.getElementById("display");
var audio = document.getElementById("audio");
var home = document.getElementById("home");

var currentLocation = 0;
var previousLocation = 0;

function updateDisplay() {
  display.innerHTML = "";

  if (appConfig[previousLocation] && appConfig[previousLocation].transitionText) {
    var transitionText = appConfig[previousLocation].transitionText[currentLocation];
    if (transitionText) {
      display.innerHTML += "<p>" + transitionText + "</p>";
    }
  }

  if (appConfig[currentLocation] && appConfig[currentLocation].locationText) {
    var locationText = appConfig[currentLocation].locationText;
    display.innerHTML += "<p>" + locationText + "</p>";
  }
}

function updateAudio() {
  var transitionAudio = "transition_" + previousLocation + "_" + currentLocation;
  var locationAudio = "location_" + currentLocation;

  audio.pause();
  audio.src = transitionAudio;

  audio.onended = function () {
    audio.src = locationAudio;
    audio.play();
  };

  audio.play();
}

function updateButtons() {
  for (var i = 0; i < locations.length; i++) {
    var buttonValue = parseInt(locations[i].value);

    if (appConfig[currentLocation] && appConfig[currentLocation].allowedNext) {
      var allowedNext = appConfig[currentLocation].allowedNext;

      if (allowedNext.includes(buttonValue)) {
        locations[i].disabled = false;
      } else {
        locations[i].disabled = true;
      }
    } else {
      locations[i].disabled = false;
    }
  }
}

function setCallbacks() {
  locations.forEach(
    (e) => e.addEventListener("click", function () {
      previousLocation = currentLocation;
      currentLocation = parseInt(this.value);

      updateButtons();
      updateDisplay();
      updateAudio();
    })
  )
  home.addEventListener("click", function () {
    previousLocation = 0;
    currentLocation = 0;

    updateButtons();
    updateDisplay();
    updateAudio();
  })
}

// Initialize the app by updating the display, audio, and buttons
setCallbacks();
updateButtons();
updateDisplay();

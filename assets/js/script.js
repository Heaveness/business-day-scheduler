$(document).ready(function () {
  // Variables for the script to use in a global scope.
  var dayDisplayEl = $("#day-display");
  var textBlockEl = $(".time-block");

  // Variable for modal.
  var modal = document.getElementById("myModal");
  // Variable for modal button.
  var btn = document.getElementById("clear-history");
  // Variable for the appropriate element that closes the modal.
  var span = document.getElementsByClassName("confirmNoBtn")[0];
  // Variable for the appropriate element that clears the local storage.
  var clear = document.getElementsByClassName("confirmYesBtn")[0];
  

  // Function to display the current time through day.js API.
  displayDay();
  function displayDay() {
    var currentTime = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
    dayDisplayEl.text(currentTime);
  }
  setInterval(displayDay, 1000); // Interval to properly countdown the time.

  // Onclick function when save button element is clicked.
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();

    // Stores HTML elements of textarea and time-block into a variable for local storage.
    scheduleTime = $(this).parent().prop("id");
    scheduleWork = $(this).siblings(".description").val();

    // Sets the local storage with the new variables above.
    localStorage.setItem(scheduleTime, scheduleWork);
  });

  // For loop to check each time-block HTML element
  for (var i = 0; i < textBlockEl.length; i++) {
    // A variable for each class converted into an id.
    var scheduledTime = $(textBlockEl[i]).prop("id");

    // If statement to check if local storage has value then be printed to the description classes.
    if (localStorage.getItem(scheduledTime)) {
      $(textBlockEl[i]).children(".description").text(localStorage.getItem(scheduledTime));
    }
  }

  // A function to check each time block to change class based on current time. (Taken & modified from stackoverflow)
  nowTimer();
  function nowTimer() {
    var dayHour = dayjs().hour();

    $(".time-block").each(function () {
      var scheduleHour = parseInt($(this).prop("id").split("-")[1]);
      if (scheduleHour > dayHour) {
        $(this).addClass("future");
      } else if (scheduleHour < dayHour) {
        $(this).addClass("past");
      } else if (scheduleHour === dayHour) {
        $(this).addClass("present");
      }
    });
  }

  // Onclick function when the user clicks the button, opens the modal.
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // Onclick function when the user clicks on No button, closes the modal.
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Onclick function when the user clicks anywhere outside of the modal, closes the modal.
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Onclick function when the user clicks on Yes button. It closes the modal then clears the local storage and reload the page.
  clear.onclick = function () {
    modal.style.display = "none";
    localStorage.clear();
    window.location.reload();
  };
});

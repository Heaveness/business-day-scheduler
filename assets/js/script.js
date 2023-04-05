// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Global variables for the script to use in a global scope.
var dayDisplayEl = $('#day-display');
var textBlockEl = $('.textarea')
var timeBlockEl = $('.hour');

// Function to display the current time through day.js API.
displayDay();
function displayDay() {
  var currentTime = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  dayDisplayEl.text(currentTime);
}
setInterval(displayDay, 1000); // Interval to properly countdown the time.

$('.saveBtn').on('click', function(event) {
  event.preventDefault();
  localStorage.setItem($(".time-block").prop("id"), $(".description").val());
  console.log("Saved!");
});

// A function to check each time block to change class based on current time. (Taken from stackoverflow)
nowTimer();
function nowTimer(){
  var dayHour = dayjs().hour();

  $('.time-block').each(function(){
    var scheduleHour = parseInt($(this).prop("id").split("-")[1]);
    if(scheduleHour > dayHour){
      $(this).addClass("future");
    }else if(scheduleHour < dayHour){
      $(this).addClass("past");
    }else if(scheduleHour === dayHour){
      $(this).addClass("present");
    }
  });
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("clear-history");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("confirmNoBtn")[0];
var clear = document.getElementsByClassName("confirmYesBtn")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

clear.onclick = function() {
  modal.style.display = "none";
  localStorage.clear();
}


$(function () {


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage? (Incomplete)
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time? (Completed)
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this? (Incomplete)
  //
  // TODO: Add code to display the current date in the header of the page. (Completed)
});

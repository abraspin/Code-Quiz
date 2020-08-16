// code will not execute until page load is complete
$(document).ready(function () {
  // Variable  declarations
  var timeRemaining = 75;

  //HTML span that contains the on-screen timeRemaining text
  var timerDisplay = $("#time-remaining");

  //local storage initializations - time remaining resets to the above value, current question resets to 0
  localStorage.setItem("timeRemaining", timeRemaining);
  localStorage.setItem("currentQuestion", 0);

  // question arrays containing the code questions, answer choices, and correct answer index.
  // The 0th element in each array is going to contain as its value, the index of that array which contains the correct answer.
  var questionOneArray = ["4", "Commonly used data types DO NOT include: ", "strings", "booleans", "alerts", "numbers"];
  var questionTwoArray = [
    "5",
    "Arrays in JavaScript can be used to store _____.",
    "numbers and strings",
    "other arrays",
    "booleans",
    "all of the above",
  ];
  var questionThreeArray = [
    "4",
    "The condition in an if / else statement is enclosed within _____.",
    "quotes",
    "curly brackets",
    "parentheses",
    "square brackets",
  ];
  var questionFourArray = [
    "4",
    "String values must be enclosed within _____ when being assigned to variables.",
    "commas",
    "curly brackets",
    "quotes",
    "parentheses",
  ];

  var questionFiveArray = [
    "5",
    "This useful tool is used for printing content to the debugger during development and debugging:",
    "JavaScript",
    "terminal / bash",
    "for loops",
    "console.log",
  ];

  //master question array is an array containing one question array in each index
  var masterQuestionsArray = [questionOneArray, questionTwoArray, questionThreeArray, questionFourArray, questionFiveArray];

  ///////////////////////////////////////////   click event to start the quiz  //////////////////////////////////////////////////
  $("#start-quiz-btn").on("click", function () {
    // display time remaining on the page
    timerDisplay.text(timeRemaining);

    //clear appropriate local storage, last game's high scorer and their score
    // localStorage.setItem("newHighScore", "");
    // localStorage.setItem("scoreThisround", timeRemaining);

    //setting current question to the index of the first question in the master questions array.
    localStorage.setItem("currentQuestion", "0");

    //start the quiz
    postNewQuestion(questionOneArray);
  });

  //////////////////////////////////////////////POST NEW QUESTION FUNCTION////////////////////////////////////////////////
  function postNewQuestion(questionArray) {
    if (parseInt(localStorage.getItem("currentQuestion")) === masterQuestionsArray.length) {
      gameOver();
      return;
    }

    //convert the local storage value for "what question we're on" to an int
    var currentQuestionInt = parseInt(localStorage.getItem("currentQuestion"));

    //this is the code block to render whether or not the user answered the previous question correctly.
    // if it's the first question (currentQuestionInt === 0) then display nothing there.
    if (currentQuestionInt != 0) {
      if (localStorage.getItem("previousQuestionCorrect")) {
        $("#questionMiddleRow").html("correct");
      } else {
      }
    }

    //Begin the timer each time a new question is posed, it will be passed the previous timeRemaining value
    var timeInterval = setInterval(function () {
      timerDisplay.text(timeRemaining);

      //gotta update the local storage on each tick of the timer
      localStorage.setItem("timeRemaining", timeRemaining);
      timeRemaining--;

      // if you run out of time - game over
      if (timeRemaining <= 0) {
        timerDisplay.text(timeRemaining);
        clearInterval(timeInterval);
        gameOver();
        return;
      }
    }, 1000);

    //empty the 3 rows of contents to prepare to fill them
    //with the question and answer choices
    $("#questionTopRow, #questionMiddleRow, #questionBottomRow").empty();

    // render the question and answer options text onto the page
    $("#questionTopRow").html("<h1>" + questionArray[1] + "</h1>");
    $("#questionTopRow").addClass("text-left");

    //starting this loop at 2, because 0 contains the correct answer index, and 1 contains the question text.
    for (var i = 2; i < questionArray.length; i++) {
      console.log("i: " + i);
      console.log(questionArray[0]);
      console.log("i to string: " + i.toString());

      // if the index of the element currently being made into a button matches the value in index 0 of the passed array then it
      // will mark this button with the class "correct-answer", otherwise it gets class "incorrect answer"
      // (index 0 contains the value of the index which contains the correct answer text)

      var answerOptionBtn;

      if (i.toString() === questionArray[0]) {
        answerOptionBtn = $(
          " <button type='button' class='correct-answer  btn btn-primary answerChoiceButton float-left' ></button>  "
        );
      } else {
        answerOptionBtn = $(
          " <button type='button' class='incorrect-answer  btn btn-primary answerChoiceButton float-left' ></button>  "
        );
      }
      $("#questionMiddleRow").append(answerOptionBtn);
      answerOptionBtn.text(i - 1 + ". " + questionArray[i]);
    }

    // this will double check to make sure we don't show any "right/wrong for last question" feedback if they're on the first question
    // otherwise it will tell them if they got it wrong or right, then fade after 1.5 seconds hardcoded
    if (localStorage.getItem("currentQuestion") != 0) {
      if (localStorage.getItem("previousQuestionCorrect") === "true") {
        $("#questionBottomRow").html("<h4 class= 'col md-12  answer-feedback' >Correct!</h4>");

        //after 1.5 seconds, the right/wrong answer feedback will be removed.
        setTimeout(function () {
          $("#questionBottomRow h4").fadeOut();
        }, 1500);
      } else {
        $("#questionBottomRow").html("<h4 class= 'col md-12 answer-feedback' >Incorrect!</h4>");

        //after 1.5 seconds, the right/wrong answer feedback will be removed.
        setTimeout(function () {
          $("#questionBottomRow h4").fadeOut();
        }, 1500);
      }
    }
    // if they click on the correct answer, it will increment the current question variable and post the next question in the masterquestionsarray
    $(".correct-answer").on("click", function () {
      clearInterval(timeInterval);
      currentQuestionInt++;
      localStorage.setItem("currentQuestion", currentQuestionInt);
      localStorage.setItem("previousQuestionCorrect", true);
      postNewQuestion(masterQuestionsArray[currentQuestionInt]);
    });

    // if they click on the incorrect answer, it will reduce time remaining by 10 seconds, and
    // increment the current question variable, and post the next question in the masterquestionsarray
    $(".incorrect-answer").on("click", function () {
      timeRemaining = localStorage.getItem("timeRemaining");
      timeRemaining = timeRemaining - 10;
      localStorage.setItem("timeRemaining", timeRemaining);
      clearInterval(timeInterval);
      currentQuestionInt++;
      localStorage.setItem("currentQuestion", currentQuestionInt);
      localStorage.setItem("previousQuestionCorrect", false);
      postNewQuestion(masterQuestionsArray[currentQuestionInt]);
    });
  }
  ///////////////////////////////////////////GAMEOVER FUNCTION/////////////////////////////////////////////////
  function gameOver() {
    $("#questionTopRow, #questionMiddleRow, #questionBottomRow").empty();

    //render game over page and prompt user to enter their initials to be posted to high scores list
    $("#questionTopRow").html("<h1 class='col-md-12'>All done!</h1>");
    $("#questionTopRow").addClass("text-center");
    $("#questionMiddleRow").append($("<p class = 'mx-auto'> Your final score is: " + timeRemaining + "!</p>"));

    $("#questionBottomRow").append($("<div class='col-md-4 float-right my-auto'> Enter Initials: </div>"));

    $("#questionBottomRow").append(
      $("<input  type='text' class = 'col-md-4' placeholder='Your initials' name='high-initials-text' id='initials-text' />")
    );
    $("#questionBottomRow").append(
      $("<button   type='button' class='btn btn-primary col-md-4 ' id='submit-score-btn'>Submit</button>")
    );
    $("#questionBottomRow").addClass("all-done-row mx-auto ");
  }

  ///////////////////////////////////////////EVENT LISTENERS/////////////////////////////////////////////////

  //this event listener will grab the user's initials when they click the "submit button" after the game is over
  $(document).on("click", "#submit-score-btn", function (e) {
    //prevents the page refreshing between button click and grabbing the form data
    e.preventDefault();

    var newInitials = $("#initials-text").val();

    // Return from function early if submitted todoText is blank
    if (newInitials === "") {
      alert("Please enter your initials for posterity!");
    } else {
      var username = JSON.parse(localStorage.getItem("users")) || [];
      var scores = JSON.parse(localStorage.getItem("userscore")) || [];

      // unshift puts the latest user/score on the top of the array

      username.unshift(newInitials);
      scores.unshift(timeRemaining);
      localStorage.setItem("users", JSON.stringify(username));
      localStorage.setItem("userscore", JSON.stringify(scores));

      //navigate to high scores page, which contains the rendering javscript located at ./javascript-high-score.js
      document.location = "./high-scores.html";
    }
  });
});

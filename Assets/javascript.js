//is it inapropritate to wrap the ENTIRE JS  file in a document.ready function?
$(document).ready(function () {
  // Variable  declarations
  var initialsText = $("#initials-text");
  var timeRemaining = 75;
  //HTML span that contains the on-screen timeRemaining text
  var timerDisplay = $("#time-remaining");

  //local storage initializations - time remaining resets to the above value, current question resets to 0
  localStorage.setItem("timeRemaining", timeRemaining);
  localStorage.setItem("currentQuestion", 0);

  // console.log(masterQuestionsArray);
  //arrays containing the code questions, answer choices, and correct answer index.
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

  var masterQuestionsArray = [questionOneArray, questionTwoArray, questionThreeArray, questionFourArray, questionFiveArray];

  ///////////////////////////////////////////   functions //////////////////////////////////////////////////
  $("#start-quiz-btn").on("click", function () {
    // display time remaining on the page
    timerDisplay.text(timeRemaining);

    //clear appropriate local storage, last game's high scorer and their score
    localStorage.setItem("newHighScore", "");
    localStorage.setItem("scoreThisround", timeRemaining);

    //setting current question to the index of the first question in the master questions array.
    localStorage.setItem("currentQuestion", "0");

    //start the quiz
    postNewQuestion(questionOneArray);
  });

  //////////////////////////////////////////////POST NEW QUESTION FUNCTION////////////////////////////////////////////////
  function postNewQuestion(questionArray) {
    if (parseInt(localStorage.getItem("currentQuestion")) === masterQuestionsArray.length) {
      // console.log(
      //   "I entered the game over if and the current question value in local storage is: " +
      //     parseInt(localStorage.getItem("currentQuestion"))
      // );
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

    console.log("passed question array: " + questionArray);

    //Begin the timer each time a new question is posed, it will be passed the previous
    // timeRemaining value and --maybe an argument for whether or not the person answered correctly?

    //why does the timer take so long to start after showing the first question?
    var timeInterval = setInterval(function () {
      timerDisplay.text(timeRemaining);

      //gotta update the local storage on each tick of the timer
      localStorage.setItem("timeRemaining", timeRemaining);
      timeRemaining--;

      // if you run out of time game over
      // if you run out of quesitons - game over -- this function will be passed undef or null or something if we go beyond
      // the range of available questions in the master question array.
      if (timeRemaining <= 0) {
        timerDisplay.text(timeRemaining);
        clearInterval(timeInterval);

        gameOver();

        //NOT 100% SURE ON THIS RETURN CAUSE I ADDED IT TO THE IF STATEMENT AT THE START BUT THIS WORKED
        // OK BEFORE I CHANGED IT?
        return;
      }
    }, 1000);

    //empty the 3 rows of contents to prepare to fill them
    //with the question and answer choices
    $("#questionTopRow, #questionMiddleRow, #questionBottomRow").empty();

    //I also need to change the class attribute so it
    // stops center-justifying everything
    // $("#questionTopRow").attr("class", "questionBlock")
    $("#questionTopRow").html("<h1>" + questionArray[1] + "</h1>");
    $("#questionTopRow").addClass("text-left")
    //starting this for loop at 2, because 0 contains the correct answer index, and 1 contains the question text.
    for (var i = 2; i < questionArray.length; i++) {
      console.log("i: " + i);
      console.log(questionArray[0]);
      console.log("i to string: " + i.toString());

      // if the index of the element currently being made into a button matches the value in index 0 of the passed array(index 0
      // contains the value of the index containing the correct answer text), then it
      // will mark this button with the class "correct-answer", otherwise it gets class "incorrect answer"
      var answerOptionBtn;

      if (i.toString() === questionArray[0]) {
        answerOptionBtn = $(
          // these buttons used to have id='start-quiz-btn' but I think that was an incorrect vestige
          " <button type='button' class='correct-answer  btn btn-primary answerChoiceButton float-left' ></button>  "
        );
        console.log("i printed the right answer button");
      } else {
        answerOptionBtn = $(
          " <button type='button' class='incorrect-answer  btn btn-primary answerChoiceButton float-left' ></button>  "
        );
        console.log("i printed a wrong answer button");
      }

      $("#questionMiddleRow").append(answerOptionBtn);
      answerOptionBtn.text(i - 1 + ". " + questionArray[i]);

      //i dont think this is how you modify styling through js but those buttons are MESSED UP
      // $("#main-content").attr("text-align" ,"center");
      // $("#questionTopRow").style["text-align"] = "right";
    }

    //FIXME:
    //THERE IS A BUG HERE WHERE THE TIMER CARRIES OVER TO THE NEXT QUESTION IF THE ANSWER IS SELECTED BEFORE the timeout MS runs out
    //double check to make sure we don't show any "right/wrong for last question" feedback if it's the first question
    if (localStorage.getItem("currentQuestion") != 0) {
      if (localStorage.getItem("previousQuestionCorrect") === "true") {
        $("#questionBottomRow").html("<h4 class= 'col md-12  answer-feedback' >Correct!</h4>");
        //after 4 seconds, the right/wrong answer feedback will be removed.
        setTimeout(function () {
          $("#questionBottomRow h4").fadeOut();
        }, 1500);
      } else {
        $("#questionBottomRow").html("<h4 class= 'col md-12 answer-feedback' >Incorrect!</h4>");
        //after 4 seconds, the right/wrong answer feedback will be removed.
        setTimeout(function () {
          $("#questionBottomRow h4").fadeOut();
        }, 1500);
      }
    }

    //is it a mistake to put these inside this function? I'm thinking no...
    $(".correct-answer").on("click", function () {
      // console.log("i in the click loop: " + i);
      clearInterval(timeInterval);
      console.log(currentQuestionInt);
      currentQuestionInt++;
      console.log(currentQuestionInt);
      localStorage.setItem("currentQuestion", currentQuestionInt);
      localStorage.setItem("previousQuestionCorrect", true);
      postNewQuestion(masterQuestionsArray[currentQuestionInt]);
      console.log("correct answer selected");
    });

    $(".incorrect-answer").on("click", function () {
      timeRemaining = localStorage.getItem("timeRemaining");
      timeRemaining = timeRemaining - 10;
      localStorage.setItem("timeRemaining", timeRemaining);
      clearInterval(timeInterval);
      console.log("i in the click loop: " + i);
      currentQuestionInt++;
      localStorage.setItem("currentQuestion", currentQuestionInt);
      localStorage.setItem("previousQuestionCorrect", false);
      postNewQuestion(masterQuestionsArray[currentQuestionInt]);
      console.log("incorrect answer selected");
    });
  }
  ///////////////////////////////////////////GAMEOVER FUNCTION/////////////////////////////////////////////////
  function gameOver() {
    //it this actually necessary?
    $("#questionTopRow, #questionMiddleRow, #questionBottomRow").empty();

    $("#questionTopRow").html("<h1 class='col-md-12'>All done!</h1>");
    $("#questionTopRow").addClass("text-center")
    $("#questionMiddleRow").append($("<p class = 'mx-auto'> Your final score is: " + timeRemaining + "!</p>"));


    $("#questionBottomRow").append($("<div class='col-md-4 float-right my-auto'> Enter Initials: </div>"));

    $("#questionBottomRow").append(
      $("<input  type='text' class = 'col-md-4' placeholder='Your initials' name='high-initials-text' id='initials-text' />")
    );
    $("#questionBottomRow").append(
      $("<button   type='button' class='btn btn-primary col-md-4 ' id='submit-score-btn'>Submit</button>")
    );
    $("#questionBottomRow").addClass("all-done-row mx-auto ")
  }
  ///////////////////////////////////////////RENDER HIGH SCORES FUNCTION/////////////////////////////////////////////////
  //TODO: I definitely need a way to validate whether the local storage variable key exists  before
  //FIXME: looking for it to populate this list, if it exists and is populated, right?
  function renderHighScoresPage() {
    var scoresListEl = $("#high-score-box");
    //test
    localStorage.setItem("newHighScore", "abe");
    localStorage.setItem("scoreThisRound", 60);

    // highScoresArray = ["A.S -- 52", "A.b -- 67"];
    console.log(localStorage.getItem("previousScoresListHTML"));
    highScoresArray = JSON.parse(localStorage.getItem("previousScoresListHTML"));
    console.log(highScoresArray);
    scoresListEl.append($("<ol id='scores-ordered-list'></ol>"));

    for (var i = 0; i < highScoresArray.length; i++) {
      $("#scores-ordered-list").append($("<li>" + highScoresArray[i] + "</li>"));
    }

    
//TODO: typo for local storage
    //end test

    // // this code is to try and figure out how to get either an existing list, or a new list, into an OL. b/c i can't
    // // seem to grab just the content of the OL (just the li's)
    // if (localStorage.getItem("previousScoresListHTML")) {
    //   console.log("I didnt think it was empty");
    //   scoresListEl.append(
    //     $(
    //       "<ol id='scores-ordered-list'>" +
    //         localStorage.getItem("previousScoresListHTML") +
    //         "</ol>"
    //     )
    //   );
    // } else {
    //   console.log("I thought it was empty");
    //   console.log(scoresListEl.html());
    //   scoresListEl.append(
    //     $("<ol id='scores-ordered-list'>" + " test" + " </ol>")
    //   );
    // }
    // $("#scores-ordered-list").append($("<li>" + "item1" + "</li>"));

    //prepend this person's high score to the list

    $("#scores-ordered-list").prepend(
      $("<li>" + localStorage.getItem("newHighScore") + " -- " + localStorage.getItem("scoreThisRound") + "</li>")
    );

    // localStorage.setItem("previousScoresListHTML", $("#high-score-box").html());
    localStorage.setItem("previousScoresListHTML", JSON.stringify($("#high-score-box").text()));
  }

  //ON THE HIGH SCORES PAGE when the user clicks "clear high scores button"
  //it will empty the div containing the list of high scores. A new OL must therefore be made when repopulating.
  $("#clear-highscores-btn").click(function () {
    $("#high-score-box").empty();
    localStorage.setItem("previousScoresListHTML", "");
  });

  ///////////////////////////////////////////EVENT LISTENERS/////////////////////////////////////////////////

  //this event listener will grab the user's initials when they click the "submit button" after the game is over
  $(document).on("click", "#submit-score-btn", function (e) {
    //prevents the page refreshing between button click and grabbing the form data
    e.preventDefault();

    // var newInitials = initialsText.val();  why this doens't work, but the below does? else returns undef
    // DUH BECAUSE THAT ELEMENT DIDN'T EXIST YET DUM DUM I MADE IT DYNAMICALLY
    var newInitials = $("#initials-text").val();
    console.log("submit score button was pressed!");
    console.log(newInitials);
    console.log("initials text is: " + newInitials);

    localStorage.setItem("newHighScore", newInitials);
    localStorage.setItem("scoreThisround", timeRemaining);
    // Return from function early if submitted todoText is blank
    if (newInitials === "") {
      alert("Please enter your initials for posterity!");
    } else {
          //Changes-Tutoring session
    var username = JSON.parse(localStorage.getItem("users"))|| []
    var scores = JSON.parse(localStorage.getItem("userscore")) || []
    // unshift puts the element in the top of the array
    username.unshift(newInitials);
    scores.unshift(timeRemaining);
    localStorage.setItem("users",JSON.stringify(username))
    localStorage.setItem("userscore",JSON.stringify(scores))
    
      //navigate to high scores page and render the content
      document.location = "./high-scores.html";

      //wait for the page to load? I don't think so...
      //FIXME: why does it not render the scores when it arrives at the high scores page from the submit initials button click event?
      // $(document).ready(function () {
        //it ONLY renders the local storage into HTML for the high scores list if you got there via this click event
        // renderHighScoresPage();
      // });
    }
  });

  // renderHighScoresPage();
});

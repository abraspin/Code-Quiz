//is it inapropritate to wrap the ENTIRE JS  file in a document.ready function?
$(document).ready(function () {
  //i can use the 3 rows i already made for the "main-content" and replace with the question h1, answer button options, and "correct!"/"wrong!"

  // one array with the questions, and then a corresponding array of answers? is there a better premade data objectfor this?
  //ACTUALLY illtry one array per quesiton, index 0 has the question, 1-4 have the answer options. array.length=5

  //if i was super duper fancy the answer options would just be the words and the function adds the 1., 2. etc

  //I SHOULD ABSOLUTELY USE OBJECTS

  var questionObj = {
    questionText: "",
    answerOne: "",
    answerTwo: "",
    answerThree: "",
    answerFour: "",
  };
  // The 0th element in each array is going to contain as its value, the index of that array which contains the correct answer.

  var questionOneArray = [
    "4",
    "Commonly used data types DO NOT include: ",
    "strings",
    "booleans",
    "alerts",
    "numbers",
  ];
  var questionTwoArray = [
    "5",
    "Arrays in JavaScript can be used to store _____.",
    "1. numbers and strings",
    "2. other arrays",
    "3. booleans",
    "4. all of the above",
  ];
  var questionThreeArray = [
    "4",
    "The condition in an if / else statement is enclosed within _____.",
    "1. quotes",
    "2. curly brackets",
    "3. parentheses",
    "4. square brackets",
  ];
  var questionFourArray = [
    "4",
    "String values must be enclosed within _____ when being assiend to variables.",
    "1. commas",
    "2. curly brackets",
    "3. quotes",
    "4. parentheses",
  ];

  var questionFiveArray = [
    "5",
    "A very useful tool used during development and debugging for printing content to the debugger is:",
    "1. JavaScript",
    "2. terminal / bash",
    "3. for loops",
    "4. console.log",
  ];

  var masterQuestionsArray = [
    questionOneArray,
    questionTwoArray,
    questionThreeArray,
    questionFourArray,
    questionFiveArray,
  ];
  // console.log("master questions array length: " + masterQuestionsArray.length);
  //time remaining and score
  var timeRemaining = 75;
  // console.log(masterQuestionsArray);

  //HTML span that contains the on-screen timeRemaining text
  var timerDisplay = $("#time-remaining");
  timerDisplay.text(timeRemaining);

  //
  localStorage.setItem("timeRemaining", timeRemaining);

  var currentQuestion = parseInt(localStorage.getItem("currentQuestion"));

  localStorage.setItem("currentQuestion", 0);
  // console.log("I SET THE LOCAL STORAGE VALUE FOR CURRENT QUESITON TO 0!!");
  // localStorage.setItem("previousQuestionCorrect");

  ///////////////////////////////////////////   functions //////////////////////////////////////////////////
  $("#start-quiz-btn").on("click", function () {
    //start the quiz
    postNewQuestion(questionOneArray);
    //setting current question to the index of the first question in the master questions array.
    localStorage.setItem("currentQuestion", "0");
  });

  //should I add an index passed as an argument for this function
  // that tells it which one is the correct answer?

  function postNewQuestion(questionArray) {
    if (
      parseInt(localStorage.getItem("currentQuestion")) ===
      masterQuestionsArray.length
    ) {
      console.log(
        "I entered the game over if and the current question value in local storage is: " +
          parseInt(localStorage.getItem("currentQuestion"))
      );
      gameOver();
      return;
    }
    if (currentQuestion != 0) {
      if (localStorage.getItem("previousQuestionCorrect")) {
        $("#questionMiddleRow").html("correct");
      } else {
        // Wro;
        // WHAT HIS GOING ON HERE
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

    $("#questionTopRow").empty();
    $("#questionMiddleRow").empty();
    $("#questionBottomRow").empty();

    // $("#questionMiddleRow").append("<div>");

    //I also need to change the class attribute so it
    // stops center-justifying everything
    // $("#questionTopRow").attr("class", "questionBlock")

    $("#questionTopRow").html("<h1>" + questionArray[1] + "</h1>");
    //starting this for loop at 2, because 0 contains the correct answer index, and 1 contains the question text.
    for (var i = 2; i < questionArray.length; i++) {
      //if the index currently being made into a button matches the value in index 0 of the passed array(index 0
      // contains the value of the index containing the correct answer text), then it
      // will mark this button with the class "correct-answer"
      console.log("i: " + i);
      console.log(questionArray[0]);
      console.log("i to string: " + i.toString());
      var answerOptionBtn;
      if (i.toString() === questionArray[0]) {
        answerOptionBtn = $(
          " <button type='button' class='correct-answer row btn btn-primary answerChoiceButton float-left' id='start-quiz-btn'></button>  "
        );
        console.log("i printed the right answer button");
      } else {
        answerOptionBtn = $(
          " <button type='button' class='incorrect-answer row btn btn-primary answerChoiceButton float-left' id='start-quiz-btn'></button>  "
        );
        console.log("i printed a wrong answer button");
      }
      $("#questionMiddleRow").append(answerOptionBtn);
      answerOptionBtn.text(i - 1 + ". " + questionArray[i]);

      //i dont think this is how you modify styling through js
      // $("#main-content").attr("text-align" ,"center");
      // $("#questionTopRow").style["text-align"] = "right";

      //peudo code
      // if buttonPressed.text === (i + '. ' + questionArray[correctAnswerIndex]){
      //
      // }
    }

    //this used to be inside each click event. now its up top
    // var currentQuestion = parseInt(localStorage.getItem("currentQuestion"))
    // console.log("i in the loop but outside clicks: " +i);
    $(".correct-answer").on("click", function () {
      // console.log("i in the click loop: " + i);
      clearInterval(timeInterval);
      console.log(currentQuestion);
      currentQuestion++;
      console.log(currentQuestion);
      localStorage.setItem("currentQuestion", currentQuestion);
      localStorage.setItem("previousQuestionCorrect", true);
      postNewQuestion(masterQuestionsArray[currentQuestion]);
      console.log("correct answer selected");
    });

    $(".incorrect-answer").on("click", function () {
      timeRemaining = localStorage.getItem("timeRemaining");
      timeRemaining = timeRemaining - 10;
      localStorage.setItem("timeRemaining", timeRemaining);
      clearInterval(timeInterval);
      console.log("i in the click loop: " + i);
      currentQuestion++;
      localStorage.setItem("currentQuestion", currentQuestion);
      localStorage.setItem("previousQuestionCorrect", false);
      postNewQuestion(masterQuestionsArray[currentQuestion]);
      console.log("incorrect answer selected");
    });
  }

  function gameOver() {
    //are these actually necessary?
    $("#questionTopRow").empty();
    $("#questionMiddleRow").empty();
    $("#questionBottomRow").empty();

    $("#questionTopRow").html("<h1>All done!</h1>");
    $("#questionMiddleRow").append(
      $("<p class = 'row'> Your final score is: " + timeRemaining + ".</p>")
    );
    $("#questionMiddleRow").append(
      $("<div class='col-md-4'> Enter Initials: </div>")
    );
    //gotta somehow put that entry form in there and grab it for local storage
    // $("#questionMiddleRow").append($("<div class='col-md-4'>  </div>"));

    $("#questionMiddleRow").append(
      $(
        "<input  type='text' class = 'col-md-4' placeholder='Your initials' name='high-initials-text' id='initials-text' />"
      )
    );
    $("#questionMiddleRow").append(
      $(
        "<button   type='button' class='btn btn-primary col-md-4 ' id='submit-score-btn'>Submit</button>"
      )
    );
  }

  //ON THE HIGH SCORES PAGE when the user clicks "clear high scores button"
  //it will empty the div containing the list of high scores. A new OL must therefore be made when repopulating.
  $("#clear-highscores-btn").click(function () {
    $("#high-score-box").empty();
  });
  //the above SHOULD do the below
  // var clearButton = $("#clear-highscores-btn");
  //   clearButton.click( function (){$('#high-score-box').empty();

  //use something like  init() function in activity 28 in web apis to pull old high scores onto page

  // postNewQuestion(questionOneArray, 3);
  gameOver();

  $(document).on("click", "#submit-score-btn", function (e) {
    // var initialsText = $("#initials-text");

    //prevents the page refreshing between button click and grabbing the form data
    e.preventDefault();

    var initialsText = $("#initials-text").val();
    console.log("submit score button was pressed!");

    console.log(initialsText);
    console.log("initials text is: " + initialsText);

    // var newInitials = initialsText.value;
    // console.log( JSON.parse(initialsText))
    // var newInitials = initialsText.value;
    // console.log(newInitials);
    // console.log("the initials form input text is: " + newInitials);

    // // Return from function early if submitted todoText is blank
    // if (newInitials === "") {
    //   return;
    // }

    //  ///////////// // Add new todoText to todos array, clear the input
    //   todos.push(todoText);
    //   todoInput.value = "";

    //  //////////////// // Store updated todos in localStorage, re-render the list
    //   storeTodos();
    //   renderTodos();
    // });
  });

  function addHighScore() {
    // var initials = $("#initials-text").submit()
    // alert(initials);
  }
});

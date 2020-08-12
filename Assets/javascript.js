//is it inapropritate to wrap the ENTIRE JS  file in a document.ready function?
$(document).ready(function(){

//i can use the 3 rows i already made for the "main-content" and replace with the question h1, answer button options, and "correct!"/"wrong!"

// one array with the questions, and then a corresponding array of answers? is there a better premade data objectfor this?
//ACTUALLY illtry one array per quesiton, index 0 has the question, 1-4 have the answer options. array.length=5

//if i was super duper fancy the answer options would just be the words and the function adds the 1., 2. etc
var questionOneArray = [
  "Commonly used data types DO NOT include: ",
  "1. strings",
  "2. booleans",
  "3. alerts",
  "4. numbers",];
var questionTwoArray = ["Arrays in JavaScript can be used to store _____.",
"1. numbers and strings",
"2. other arrays",
"3. booleans",
"4. all of the above"]; 
var questionThreeArray = ["The condition in an if / else statement is enclosed within _____.",
"1. quotes",
"2. curly brackets",
"3. parentheses",
"4. square brackets"];
var questionFourArray = ["String values must be enclosed within _____ when being assiend to variables.",
"1. commas",
"2. curly brackets",
"3. quotes",
"4. parentheses"];

var questionFiveArray = ["A very useful tool used during development and debuigging for printing content to the debugger is:",
"1. JavaScript",
"2. terminal / bash",
"3. fore loops",
"4. console.log"];

// var timeRemaining;
var timeRemaining = 75;

var timerSpan = $("#time-remaining");
timerSpan.text(timeRemaining);

$("#start-quiz-btn").on("click", function () {
  //start the quiz
  
});

//should I add an index passed as an argument for this function
// that tells it which one is the correct answer? 

function postNewQuestion(questionArray, previousQuestionCorrect) {

  //Begin the timer each time a new question is posed, it will be passed the previous 
  // timeRemaining value and --maybe an argument for whether or not the person answered correctly?

  var timeInterval = setInterval(function() {
    // timerEl.textContent = timeLeft + " seconds remaining";
    timerSpan.text (timeRemaining);
    timeRemaining--;

    if (timeRemaining <= 0) {
      timerSpan.text(timeRemaining);
      clearInterval(timeInterval);

     gameOver();
    }

  }, 1000);


    //first we empty the 3 rows of contents to prepare to fill them
    //with the question and answer choices

    $("#questionTopRow").empty();
    $("#questionMiddleRow").empty();
    $("#questionBottomRow").empty();
    
    //I also need to change the class attribute so it 
    // stops center-justifying everything
    // $("#questionTopRow").attr("class", "questionBlock")

  $("#questionTopRow").text(questionArray[0]);
  for (var i = 1; i < questionArray.length; i++) {
    var answerOptionBtn = $(
      "<button type='button' class='row btn btn-primary answerChoiceButton float-left' id='start-quiz-btn'>Start Quiz</button>"
    );
    //WHY ON EARTH DID THIS NOT WORK UNTIL I ADDED THE BREAKS
    $("#questionMiddleRow").append("<br><br>");
    $("#questionMiddleRow").append(answerOptionBtn);
    answerOptionBtn.text(questionArray[i]);

    //i dont think this is how you modify styling through js
    // $("#main-content").attr("text-align" ,"center");
    // $("#questionTopRow").style["text-align"] = "right";
  }
}

function gameOver(){
  
  //are these actually necessary?
  $("#questionTopRow").empty();
  $("#questionMiddleRow").empty();
  $("#questionBottomRow").empty();
  
  
  $("#questionTopRow").html("<h1>All done!</h1>");
  $("#questionMiddleRow").append($("<p> Your final score is: " + timeRemaining + ".</p>"));
  $("#questionMiddleRow").append($("<div class='col-md-4'> Enter Initials: </div>"));
  //gotta somehow put that entry form in there and grab it for local storage 
  // $("#questionMiddleRow").append($("<div class='col-md-4'>  </div>"));



  $("#questionMiddleRow").append($("<input  type='text' class = 'col-md-4' placeholder='Your initials' name='todo-text' id='todo-text' />"));
  $("#questionMiddleRow").append($("<button   type='button' class='btn btn-primary col-md-4 float-right' id='submit-score-btn'>Submit</button>"));
  
  
}

//ON THE HIGH SCORES PAGE when the user clicks "clear high scores button"
//it will empty the div containing the list of high scores. A new OL must therefore be made when repopulating.
$("#clear-highscores-btn").click( function (){$('#high-score-box').empty()});
//the above SHOULD do the below
  // var clearButton = $("#clear-highscores-btn");
  //   clearButton.click( function (){$('#high-score-box').empty();
    


//use something like  init() function in activity 28 in web apis to pull old high scores onto page




// postNewQuestion(questionOneArray);
// gameOver()

});
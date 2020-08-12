//i can use the 3 rows i already made for the "main-content" and replace with the question h1, answer button options, and "correct!"/"wrong!"

// one array with the questions, and then a corresponding array of answers? is there a better premade data objectfor this?
//ACTUALLY illtry one array per quesiton, index 0 has the question, 1-4 have the answer options. array.length=5

//if i was super duper fancy the answer options would just be the words and the function adds the 1., 2. etc
var questionOneArray = [
  "Commonly used data types DO NOT include: ",
  "1. strings",
  "2. booleans",
  "3. alerts",
  "4. numbers",
];
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

$("#start-quiz-btn").on("click", function () {
  //start the quiz
  
});

//should I add an index passed as an argument for this function
// that tells it which one is the correct answer? 
function postNewQuestion(questionArray) {
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

postNewQuestion(questionOneArray);


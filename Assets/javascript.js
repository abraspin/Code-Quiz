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
var questionTwoArray = [""];

$("#start-quiz-btn").on("click", function () {
  //start the quiz
  
});

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


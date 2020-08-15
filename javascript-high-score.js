///////////////////////////////////////////RENDER HIGH SCORES FUNCTION/////////////////////////////////////////////////
  //TODO: I definitely need a way to validate whether the local storage variable key exists  before
  //FIXME: looking for it to populate this list, if it exists and is populated, right?
  
  $(document).ready(function () {
        renderHighScoresPage();
      });
  
  
  function renderHighScoresPage() {
    var scoresListEl = $("#high-score-box");
    //test
    // localStorage.setItem("newHighScore", "abe");
    // localStorage.setItem("scoreThisRound", 60);

    // highScoresArray = ["A.S -- 52", "A.b -- 67"];
    console.log(localStorage.getItem("users"));
   let highScoresArray = JSON.parse(localStorage.getItem("userscore")) || [];
   let usersArray = JSON.parse(localStorage.getItem("users")) || [];
    console.log(highScoresArray,usersArray);
    scoresListEl.append($("<ol id='scores-ordered-list'></ol>"));

    for (var i = 0; i < highScoresArray.length; i++) {
      $("#scores-ordered-list").append($("<li>" + highScoresArray[i] + " -- " + 
      usersArray[i] + "</li>"));
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

    //abe's obsolete code pre-tutoring 
    // $("#scores-ordered-list").prepend(
    //   $("<li>" + localStorage.getItem("newHighScore") + " -- " + localStorage.getItem("scoreThisRound") + "</li>")
    // );

    // localStorage.setItem("previousScoresListHTML", $("#high-score-box").html());
    localStorage.setItem("previousScoresListHTML", JSON.stringify($("#high-score-box").text()));
  }

  //ON THE HIGH SCORES PAGE when the user clicks "clear high scores button"
  //it will empty the div containing the list of high scores. A new OL must therefore be made when repopulating.
  $("#clear-highscores-btn").click(function () {
    $("#high-score-box").empty();

    // localStorage.setItem("users", "");
    // localStorage.setItem("userscore", "");
    localStorage.removeItem("users");
    localStorage.removeItem("userscore");
  });

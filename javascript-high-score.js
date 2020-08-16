///////////////////////////////////////////RENDER HIGH SCORES FUNCTION/////////////////////////////////////////////////

  $(document).ready(function () {
        renderHighScoresPage();
      });
  
  
  function renderHighScoresPage() {
    var scoresListEl = $("#high-score-box");
   let highScoresArray = JSON.parse(localStorage.getItem("userscore")) || [];
   let usersArray = JSON.parse(localStorage.getItem("users")) || [];
    scoresListEl.append($("<ol id='scores-ordered-list'></ol>"));

    for (var i = 0; i < highScoresArray.length; i++) {
      $("#scores-ordered-list").append($("<li>" + highScoresArray[i] + " -- " + 
      usersArray[i] + "</li>"));
    }

    // localStorage.setItem("previousScoresListHTML", JSON.stringify($("#high-score-box").text()));
  }

  //ON THE HIGH SCORES PAGE when the user clicks "clear high scores button"
  //it will empty the div containing the list of high scores. A new OL must therefore be made when repopulating.
  $("#clear-highscores-btn").click(function () {
    $("#high-score-box").empty();

    //remove the local storage items so they don't wind up in a surprise location
    localStorage.removeItem("users");
    localStorage.removeItem("userscore");
  });

// question selection logic
for (let i = 0; i < 10; i++) {
  $("#change-to-question" + (i + 1)).on("click", () => {
    $.post("/feed/setcurrentquestion/" + (i + 1), function(data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    });
    $.post("/feed/markquesasdone/" + (i + 1), function(data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    });
    toastMessage("Selected Question " + (i + 1));
    $.ajax({
      url: `/fetch/question/${i + 1}`,
      success: function(result) {
        let data = result.question[0].question;

        if (result && result.question.length > 0) {
          $("#question").text(data.statement);
          $("#correctoptions").empty();
          for (let i = 0; i < data.correctoptions.length; i++) {
            let x = $("<li></li>");
            $(x).text(data.correctoptions[i].option + " - " + (100 - 10 * i));
            $("#correctoptions").append(x);
          }
        } else {
          $("#question").text("");
          $("#correctoptions").empty();
          toastMessage("Question not found!");
        }
      }
    });
  });
}
$("#change-to-question-none").on("click", () => {
  $.post("/feed/setcurrentquestion/none", function(data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
  toastMessage("No question selected");
});
// calls API that sets isDone flag for all questions to false (i.e. to its default value)
$("#rest-isquestiondone-flag").on("click", () => {
  $.post("/feed/resetquesdone", function(data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
  toastMessage("isDone flags set to false! refresh to see the changes");
});
// bluffmaster reset logic(sets no one as bluffmaster)
$("#resetbluff").on("click", () => {
  $.post("/feed/resetbluffmaster", function(data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
  toastMessage("No one is bluffmaster now");
  $("#bluffteam").text("None");
});
// bluffmaster selection logic
for (let i = 0; i < 6; i++) {
  $("#participant" + (i + 1)).on("click", () => {
    $.post("/feed/selectbluffmaster/" + (i + 1), function(data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    });
    toastMessage("team" + (i + 1) + " is now the bluffmaster!");
    $("#bluffteam").text("team" + (i + 1));
  });
}

// fetch voting details
$("#fetch-voting-details").on("click", () => {
  $.ajax({
    url: "/fetch/votes",
    success: function(result) {
      if (result.votes.length > 0) {
        $("#voting-details").empty();
        for (let i = 0; i < result.votes.length; i++) {
          let x = $("<li></li>");
          let message;
          if (result.votes[i].votedFor === 0) {
            message = result.votes[i].team + " have not voted!";
          } else {
            message =
              result.votes[i].team +
              " voted for team" +
              result.votes[i].votedFor;
          }
          $(x).text(message);
          $("#voting-details").append(x);
        }
        toastMessage("votes fetched successfully!");
      } else {
        $("#voting-details").empty();
        let errorMsg = $("<h3></h3>");
        $(errorMsg).text("No votes recorded!");
        $("#voting-details").append(errorMsg);
      }
    }
  });
});

// reset votes
$("#reset-votes").on("click", () => {
  $.post("/feed/resetvotes", function(data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
  toastMessage("votes reset successfully!");
});

// remove teams
$("#div6").on("click", () => {
  $.ajax({
    url: "/fetch/participants",
    success: function(result) {
      if (result.participants.length > 0) {
        $("#teams-left").empty();
        for (let i = 0; i < result.participants.length; i++) {
          if (
            result.participants[i].isRemoved ||
            result.participants[i].username === "admin" ||
            result.participants[i].username === "audience"
          )
            continue;
          let x = $("<button></button>");
          $(x)
            .attr("class", "btn btn-danger mb-2 ml-2")
            .text(result.participants[i].name)
            .attr("onclick", `removeTeam(${result.participants[i].p_id})`);
          $("#teams-left").append(x);
        }
      }
    }
  });
});
function removeTeam(team) {
  $.post("/feed/removeteam/team" + team, function(data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
  toastMessage("team" + team + " removed successfully!");
}
// undo remove participants
$("#undo-remove").on("click", () => {
  $.post("/feed/undoremove", function(data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
  toastMessage("team removal revoked!");
});

// enable voting
$("#enable-voting").on("click", () => {
  $.post("/admin/voting/enable", function(data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
  toastMessage("Participants can now vote!");
});

//disable voting
$("#disable-voting").on("click", () => {
  $.post("/admin/voting/disable", function(data, status) {
    console.log("Data: " + data + "\nStatus: " + status);
  });
  toastMessage("Voting has been disabled!");
});

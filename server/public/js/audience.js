function showOrHideOption(optionNo, optionText) {
  if ($("#optiontext" + optionNo).text() === "--------" + optionNo + "--------")
    $("#optiontext" + optionNo).text(optionText);
  else $("#optiontext" + optionNo).text("--------" + optionNo + "--------");
}
fetch("http://localhost:3000/fetch/question/1")
  .then((res) => res.json())
  .then(({ question }) => {
    const optionsArray = question[0].question.correctoptions;
    console.log(optionsArray);
    $("#question-statement").text(`${question[0].qno}.
        ${question[0].question.statement}`);
    optionsArray.map((opt) => {
      const optLi = $("<li />")
        .addClass("list-group-item options")
        .attr("id", `option${opt.optionNo}`);
      const optText = $("<h5 />")
        .attr("id", `optiontext${opt.optionNo}`)
        .text(`--------${opt.optionNo}--------`);
      $(optLi).append(optText);
      $("#option-list").append(optLi);
      $(optLi).on("click", () => {
        console.log("clicked");
        showOrHideOption(opt.optionNo, opt.option);
      });
      $(optLi).on({
        mouseenter: function () {
          $(optLi).css(
            "background-image",
            "linear-gradient(to right, #806ca3, #633ea3, #806ca3)"
          );
        },
        mouseleave: function () {
          $(optLi).css(
            "background-image",
            "linear-gradient(to right,#633ea3, #806ca3, #633ea3)"
          );
        },
      });
    });
  });

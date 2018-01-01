$(document).ready(function() {
  var ans = undefined;
  var displayAns, calcDisplay,
    internalCalc = "";
  
  function internalCalcToCalcDisplayConverter () {
    calcDisplay = internalCalc;
    if (/\*/.test(calcDisplay) === true) {
    calcDisplay = calcDisplay.replace(/\*/g, "&times;");
    }
    if (/\//.test(calcDisplay) === true) {
    calcDisplay = calcDisplay.replace(/\//g, "&divide;");
    }
  }

  function genericButtonPress() {
    if (/operator/.test($(this).attr("class")) === true && /(\*|\+|\-|\/)$/.test(internalCalc[internalCalc.length - 1]) === true) {
        internalCalc = internalCalc.substr(0, internalCalc.length - 1);  
    }
    internalCalc += $(this).attr("id");
    internalCalcToCalcDisplayConverter();
    $(".top").html(calcDisplay);
  }

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  function standardForm() {
    displayAns = ans + "";
    if (displayAns.length > 13 && displayAns.indexOf("e") === -1){
      displayAns = Number(displayAns).toExponential(13);
    }
    if (displayAns.indexOf("e") !== -1){
      var num = displayAns.slice(0, displayAns.indexOf("e"));
      var expo = displayAns.slice(displayAns.indexOf("e") + 1);
      displayAns = num + " &times; 10<sup>" + expo + "</sup>"; 
    }  
  }

  function allClear() {
    internalCalc = "";
    calcDisplay = "";
    ans = undefined;
    displayAns = "";
    $(".subscreen").text(internalCalc);
    /*$("#screen2").text(internalCalc);*/
    console.log("Cleared!");
  }

  function evaluate() { 
    if (internalCalc.length !== 0){       
      internalCalc = internalCalc.replace(/(--)/g, "+");      
      ans = eval(internalCalc); 
      standardForm();  
      $(".bottom").html(displayAns);
    }
  }
  
  function del () {     
    internalCalc = internalCalc.slice(0, internalCalc.length - 1);
    internalCalcToCalcDisplayConverter();
    $(".top").html(calcDisplay);
    $(".bottom").text("");
  }
  
  function negativeSign () {
    if (/(--)$/.test(internalCalc) === false){
      internalCalc += "-";
      internalCalcToCalcDisplayConverter();
      $(".top").text(calcDisplay);
    }
  }
  
  function ansKey () {
    if (typeof ans === "number") {
      if (/(\*|\+|\-|\/)$/.test(internalCalc[internalCalc.length - 1]) === true) {
      internalCalc += ans;
      internalCalcToCalcDisplayConverter();
      $(".top").html(calcDisplay);
      } else {
        $(".bottom").text("ans must follow an operator!");
      }
    } else {
      $(".bottom").text("ans is not yet defined!");
    }
  }

  $(".notequals").on("click", genericButtonPress);
  $(".negative").on("click", negativeSign);
  $("#ans").on("click", ansKey);
  $("#ac").on("click", allClear);
  $("#equals").on("click", evaluate);
  $("#empty").on("click", standardForm);
  $("#del").on("click" , del);
  $(".subscreen").on("click", standardForm)
});

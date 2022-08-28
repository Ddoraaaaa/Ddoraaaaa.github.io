let _ = undefined;

function beautifyButton(myButton) {
  myButton.style("align-items", "center");
  myButton.style("background-clip", "padding-box");
  myButton.style("background-color", "#0cb39a");
  myButton.style("border", "1px solid transparent");
  myButton.style("border-radius", ".25rem");
  myButton.style("box-shadow", "rgba(0, 0, 0, 0.02) 0 1px 3px 0");
  myButton.style("box-sizing", "border-box");
  myButton.style("color", "#fff");
  myButton.style("cursor", "pointer");
  myButton.style("display", "inline-flex");
  myButton.style(
    "font-family",
    'system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif'
  );
  myButton.style("font-size", "16px");
  myButton.style("font-weight", "600");
  myButton.style("justify-content", "center");
  myButton.style("line-height", "1.25");
  myButton.style("margin", "0");
  myButton.style("min-height", "3rem");
  myButton.style("padding", "calc(.875rem - 1px) calc(1.5rem - 1px)");
  myButton.style("position", "relative");
  myButton.style("text-decoration", "none");
  myButton.style("transition", "all 250ms");
  myButton.style("user-select", "none");
  myButton.style("-webkit-user-select", "none");
  myButton.style("touch-action", "manipulation");
  myButton.style("vertical-align", "baseline");
  myButton.style("width", "auto");
}

function deepClone(obj){
  return JSON.parse(JSON.stringify(obj));
}
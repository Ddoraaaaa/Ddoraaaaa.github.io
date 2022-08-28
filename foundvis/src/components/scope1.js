/// <reference path="../libraries/TSDef/p5.global-mode.d.ts" />

/* Variable decl begins */ 

// Code snippet variables
let snippet = {
  codeText: 
  [
    `int`, 
    `main(`,
    `     int argc,`, 
    `               char *argv[]`,
    `                           ) {`,
    `  int`,
    `      x=3,`,
    `           z=5;`,
    `  printf("main; x=%2d, z=%2d\\n", x, z);`,
    `  func(x);`,
    `  printf("main: x=%2d, z=%2d\\n", x, z);`,
    `  func(z);`,
    `  printf("main: x=%2d, z=%2d\\n", x, z);`,
    `  return 0;`,
    `}`, 
    ``, 
    `void`, 
    `func(`, 
    `     int x`,
    `          ) {`, 
    `  int z=7;`,
    `  x = x+1;` ,
    `  z = x+z+1;`, 
    `  printf("func: x=%2d, z=%2d\\n", x, z);`,
    `}`,
  ], 
  lineWeight: [1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], // 25 lines
	needHigh: 1,
	needLen: 1,
	curHigh: 0,
  curLen: 0,
}; 
let xSnippet, ySnippet; 

// Stack visualizer variables
let curStep; 
let xStack, yStack; 
let curXStack, curYStack; 
let steps = [ 
  {line: 1, len: 2, value: "bg main()", explanation: "Executing main()"}, 
  {line: 3, len: 1, val: "", value: "argc main()", explanation: "Allocate 4 bytes for argc in stack."}, 
  {line: 4, len: 1, val: "", value: "argv main()", explanation: "Allocate 4 bytes for argv in stack."}, 
  {line: 7, len: 1, val: 3, value: "x main()", explanation: "Allocate 4 bytes for x in stack, storing the number 3"}, 
  {line: 8, len: 1, val: 5, value: "z main()", explanation: "Allocate 4 bytes for z in stack, storing the number 5"}, 
  {line: 9, len: 1, value: "print 3 5", explanation: "Print x (3) and z (5) seperated by a space to the console. "}, 
  {line: 10, len: 1, value: "bg func()", explanation: "Call func() with x as its argument."}, 
  {line: 17, len: 2, value: "bg func()", explanation: "Executing func()"}, 
  {line: 19, len: 1, val: 3, value: "x func()", explanation: 
  "Allocate 4 bytes for x in stack with value 3. x here is DIFFERENT from the x created in main()." }, 
  {line: 21, len: 1, val: 7, value: "z func", explanation: 
  "Allocate 4 bytes for x in stack with value 3. z here is DIFFERENT from the z created in main()."}, 
  {line: 22, len: 1, value: "update x = 4", explanation: "Update value of x (local variable of func()) to 4."}, 
  {line: 23, len: 1, value: "update z = 12", explanation: "Update value of z (local variable of func()) to (x + z + 1) = (4 + 7 + 1) = 12."}, 
  {line: 24, len: 1, value: "print 4 12", explanation: "Print x and z created in func()."}, 
  {line: 11, len: 1, value: "print 3 5", explanation: 
  "Exit func(). Notice how the local variables x and z are not removed from the stack - we have to do that manually. However, the x and z being printed out are created in main() (3 and 5). "}, 
  {line: 12, len: 1, value: "bg func", explanation: "Call func() with z as its argument - W IN PROGRESS"}, 
]; 

// Console variables
let xConsole, yConsole; 
let __Console = []; 

// Explanation variables
let mxExpl; 
let xExpl, yExpl; 

// Control variables
let prevButton, playButton, nextButton; 
let xButton, yButton; 

/* Variable dec ends */

function preload() {
  ConsolasFont = loadFont('../../public/assets/consolas.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  textFont(ConsolasFont); 
  frameRate(60);
  xSnippet = width/12 - width/30, ySnippet = height/6; 
  xStack = width/2 - width/25, yStack = height - height/12;
  xConsole = width - width/3.5, yConsole = height/6;
  xExpl = width/12 - width/30, yExpl = height - height/4; 
  xButton = width/12 + width/30, yButton = height*3.9/6; 
  mxExpl = 0; 
  curStep = 0; 
  for (let i = 0; i < steps.length; i++) {
    steps[i]['color'] = [random(255), random(100), random(100, 255)];
    mxExpl = max(mxExpl, steps[i]['explanation'].length); 
  }
  // draw button
  drawButton(); 
}

function nextState() {
  curStep = (curStep + 1) % steps.length; 
  updateHigh(snippet, steps[curStep]["line"], steps[curStep]["len"]); 
}

function prevState() {
  curStep = (curStep - 1 + steps.length) % steps.length; 
  updateHigh(snippet, steps[curStep]["line"], steps[curStep]["len"]);
}

function drawStack() {
  let rowHeight = height / 50;   
  let rowIdLength = width / 50; 
  let nameLength = rowIdLength * 5; 
  let holderLength = rowIdLength * 2; 
  let margin = 0; 
  let segmentSize = [5, 7, 31]; 
  let segmentColor = ["#ffcc66", "#ff9933", "#00b33c"]; 
  let segmentText = ["Program Code Segment", "Program Data Segment", "Stack"]; 
  let row = 0; 
  stroke(28, 55, 74);
  for (let seg = 0; seg < 3; seg++) {
    for (let i = 0; i < segmentSize[seg]; i++) {
      // Coordinates
      let x = xStack + (nameLength + margin); 
      let y = yStack - (rowHeight + margin) * row;
      // Draw the stack
      fill('white');
      rect(x, y, rowIdLength, rowHeight); 
      fill(segmentColor[seg]); 
      x += rowIdLength + margin; 
      rect(x, y, holderLength, rowHeight);
      // Draw segment name
      if (i == segmentSize[seg] - 1) {
        let W = nameLength, H = rowHeight * segmentSize[seg] + margin * (segmentSize[seg] - 1);
        fill(segmentColor[seg]); 
        rect(xStack, y, W, H); 
        fill(0);
        noStroke(); 
        text(segmentText[seg], xStack + W/5, y + H/5, W - W/4, H - H/4); 
        stroke(28, 55, 74); 
      }  
      row++; 
    }
  } 
  // Simulate pushing items to stack
  curXStack = xStack + (nameLength + margin) + rowIdLength;  
  curYStack = yStack - (rowHeight + margin) * (segmentSize[0] + segmentSize[1]); 
  for (let it = 0; it <= curStep; it++) {
    let step = steps[it]; 
    fill(...step['color']); 
    let s = step['value']; 
    if (s.startsWith('print')) {
      __Console.push(s.slice(6)); 
    }
    else if (!s.startsWith('bg') && !s.startsWith('update')) {
      for (let i = 0; i < 4; i++) {
        rect(curXStack, curYStack, holderLength, rowHeight); 
        if (i == 2) {
          push(); 
          fill('white');
          textSize(18);
          noStroke();
          text(step['val'], curXStack + holderLength / 6, curYStack + rowHeight);
          fill(0);
          text(s, curXStack + holderLength / 4 + holderLength, curYStack + rowHeight); 
          pop();
        }
        curYStack -= (rowHeight + margin); 
      }
    }
  }
}

function drawConsole() {
  push(); 
  noStroke(); 
  textSize(27);
  fill(0); 
  rect(xConsole, yConsole - 2 * textSize(), 300, 200);
  fill('white');
  text(' Console', xConsole, yConsole - textSize()); 
  textSize(24);
  fill('green'); 
  for (let i = 0; i < __Console.length; i++) {
    text('>> ' + __Console[i], xConsole, yConsole + i * textSize()); 
  }
  pop(); 
}

function drawExplanation() {
  push(); 
  noStroke(); 
  fill(0);
  textSize(30); 
  textSize(24); 
  text("Explanation", xExpl, yExpl + 30); 
  textSize(18); 
  text(steps[curStep]['explanation'], xExpl, yExpl + 40, 300, 400); 
  pop(); 
}

function drawSnippet() {
  push(); 
  fill(0); 
  textSize(30);
  text("How does C handles memory?", xSnippet, ySnippet - height / 20);
  textSize(18); 
  text("scope1.c", xSnippet, ySnippet - height / 60); 
  pop(); 
  showCode(snippet, xSnippet, ySnippet, 13, 400); 
}

function reset() {
  background('#a2f5dc'); 
  // frameRate(min(0.7, 0.3 * mxExpl / steps[curStep]['explanation'].length));
  __Console = [];
}

function beautify(symbol, x, y) {
  let button = createButton(symbol); 
  beautifyButton(button);
  button.position(x, y); 
  return button; 
}

function drawButton() {
  prevButton = beautify('<', xButton, yButton); 
  playButton = beautify('▶', xButton + 63, yButton); 
  nextButton = beautify('>', xButton + 127, yButton); 
  nextButton.mousePressed(nextState);
  prevButton.mousePressed(prevState); 
}

function drawProgress() { 
  let x = 0, y = 0; 
  let x2 = curStep * 1.0 / steps.length * windowWidth, y2 = 0.005 * windowHeight; 
  push(); 
  fill(28, 55, 74); 
  rect(x, y, x2, y2); 
  pop(); 
}

function draw() {
  reset();
  drawSnippet(); 
  drawStack();
  drawConsole(); 
  drawExplanation();
  drawProgress(); 
}
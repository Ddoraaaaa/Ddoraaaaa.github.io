let myCode = {
  codeText: [
    "void sort(int A[], int n)",                          // 1
    "  int i, j;",                                        // 2
    "  for(i = 1;",                                       // 3
    "             i < n;",                                // 4
    "                    i++) {",                         // 5
    "    for(j = i - 1;",                                 // 6 
    "                   j >= 0",                          // 7
    "                          && A[j+1] < a[j];",        // 8
    "                                            j--) {", // 9
    "      swap(&A[j], &A[j+1]);",                        // 10
    "    }",                                              // 11
    "  }",                                                // 12
  ],
  lineWeight: [1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1],
  needHigh: 1,
  needLen: 1,
  curHigh: 1,
  curLen: 1,
};

let startButton, resetButton;
let gui = null;
var speed;
var my_array;
let n;

let pState = 'idle';
let curState;
let states = [];
// state content:
// n = 0
// curLine = 1
// i = 0
// j = 0;
// arrVal = []
// compI = [];

let curI;
let curJ;
let opaI;
let opaJ;
let curpos = [];

function setup() {
  _init();
}

function findSpeed(U, V){
  if(abs(U-V)<0.05) return (U-V)/5*speed;
  return (U-V)/8*speed;
}

function _init() {
  states = [];
  pState = 'idle';

  createCanvas(windowWidth, windowHeight);
  background("#a2f5dc");
  if(gui == null) {
    makeGUI();
  }
  gui.setPosition(windowWidth * 0.8, windowHeight*0.1);
  startButton.show();
  resetButton.hide();
}

function makeGUI() {
  gui = createGui('Input').setPosition(windowWidth * 0.8, windowHeight*0.1);

  sliderRange(0.25, 2, 0.25);
  speed = 1;
  gui.addGlobals('speed');

  my_array = "1, 7, 8, 9, 3, 2, 6";
  gui.addGlobals('my_array');

  startButton = createButton("Start");
  beautifyButton(startButton);
  startButton.position(windowWidth*0.8, windowHeight*0.1 - 50);
  startButton.mousePressed(startVis);
  
  resetButton = createButton("Reset");
  beautifyButton(resetButton);
  resetButton.position(startButton.x, startButton.y);
  resetButton.mousePressed(_init);
}

function startVis() {
  startButton.hide();
  resetButton.show();
  gui.setPosition(-10000, -10000);
  simAlgo();
}

function simAlgo() {

  let s = {};
  s.arrVal = my_array.split(',').map(Number);
  n = s.arrVal.length;
  s.curLine = 1;
  s.i = -1;
  s.j = -1;
  updateS(s, 1);
  
  s.i = 0;
  s.j = 0;
  updateS(s, 2);

  s.i = 1;
  updateS(s, 3);

  while(true) {

    updateS(s, 4);
    if(s.i < n) {
      s.j = s.i - 1;
      updateS(s, 6);

      while(true){

        updateS(s, 7);
        if(s.j >= 0) {

          s.compI=[s.j+1, s.j];
          updateS(s, 8);
          if(s.arrVal[s.j+1] < s.arrVal[s.j])
          {
            [s.arrVal[s.j+1], s.arrVal[s.j]] = [s.arrVal[s.j], s.arrVal[s.j+1]]
            updateS(s, 10);
          }
          else {
            break;
          }
        }
        else {
          break;
        }
        
        s.j--;
        updateS(s, 9);
      }
    }
    else {
      break;
    }

    s.i++;
    updateS(s, 5);
  }
  updateS(s, 12);

  curI = -2;
  curJ = -1;
  opaI = 0;
  opaJ = 0;
  myCode.needHigh=1;
  for(let i = 0; i < n; i++){
    curpos.push(i+0.0000001);
  }
  curState = 0;
  pState = 'fin';
  console.log(states);
}

function updateS(s, atLine) {
  s.curLine = atLine;
  states.push(deepClone(s))
}

function keyPressed() {
  console.log("KEY");
  // return;
  if(pState != 'fin') {
    return;
  }
  if (keyCode === RIGHT_ARROW&&curState<states.length-1) {
    console.log("KEY1");
    curState = min(curState+1, states.length-1);
    updateState(states[curState], states[curState-1]);
  } else if (keyCode === LEFT_ARROW && curState>0) {
    console.log("KEY2");
    curState = max(curState-1, 0);
    updateState(states[curState], states[curState+1]);
  }
}

function updateState(thisState, lastState) {
  myCode.needHigh=thisState.curLine;
  for(let i = 0; i < n; i++){
    console.log(curpos[i], curpos[lastState.arrVal.indexOf(thisState.arrVal[i])], "SIIIIIIIIIIIIIUUUUU");
    if(lastState.arrVal.indexOf(thisState.arrVal[i])!=i){
      [curpos[i], curpos[lastState.arrVal.indexOf(thisState.arrVal[i])]] = [curpos[lastState.arrVal.indexOf(thisState.arrVal[i])], curpos[i]];
      break;
    }
  }
  console.log(curpos);
}

function draw() {
  background("#a2f5dc");
  if(pState!= 'fin'){
    return;
  }
  showCode(
    myCode,
    windowWidth / 50,
    windowHeight / 1.3,
    windowWidth / 80,
    windowWidth / 2.7
  );
  drawColumns();
  progressBar();
}

let tempAddSpeed = 1;
let tempAdd = 0;

function drawColumns(){
  let thisState = states[curState];
  let arrW = windowWidth*0.7;
  let arrH = windowHeight * 0.3;
  let colW = arrW/n;
  let corX = windowWidth/2-arrW/2;
  let corY = windowHeight/2+arrH/8;
  curI -= findSpeed(curI, thisState.i);
  curJ -= findSpeed(curJ, thisState.j);
  if(thisState.i>=0) opaI -= findSpeed(opaI, 255);
  if(thisState.j>=0) opaJ -= findSpeed(opaJ, 255); 
  for(let i = 0; i < n; i++)
  {
    // console.log(i);
    // console.log(curpos[i]);
    curpos[i] -= findSpeed(curpos[i], i);
    rmv = 50 - 10 * Math.log(thisState.arrVal[i]);
    push();
    textAlign(CENTER);
    drawText(corX+curpos[i]*colW+30, corY+windowWidth/30, thisState.arrVal[i], 50, "#1dc495", 255);
    drawText(corX+curI*colW+17, corY+windowWidth/15, 'i', 50, "#1dc495", opaI);
    drawText(corX+curJ*colW+43, corY+windowWidth/15, 'j', 50, "#1dc495", opaI);

    if(thisState.curLine==8){ 
      tempAdd = min(255, tempAdd+tempAddSpeed);
    }
    else{
      tempAdd = max(0, tempAdd - tempAddSpeed);
    }
    if(thisState.curLine==8&&thisState.compI.includes(i)){
      drawCollumn(corX+curpos[i]*colW, corY, colW, arrH*thisState.arrVal[i]/10, min(57-rmv+tempAdd, 107), min(247-rmv+tempAdd, 255), min(193-rmv+tempAdd, 255));
    }
    else{
      drawCollumn(corX+curpos[i]*colW, corY, colW, arrH*thisState.arrVal[i]/10, 57-rmv, 247-rmv, 193-rmv);
    }
    pop();
  }
}

function drawCollumn(_x, _y, colW, colH, R, G, B){
  push();
  noStroke();
  fill(R, G, B);

  rect(_x, _y, colW-10, -colH);
  pop();
}

function drawText(_x, _y, num, _textSize, _col, _alpha){
  push();
  textFont(ConsolasFont);
  textSize(_textSize);
  let __color = color(_col);
  __color.setAlpha(_alpha);
  fill(__color);
  text(String(num), _x, _y);
  pop();
}

function progressBar() { 
  var x = 0, y = 0; 
  var x2 = curState * 1.0 / states.length * windowWidth, y2 = 0.005 * windowHeight; 
  push(); 
  noStroke();
  fill('gray'); 
  rect(x, y, x2, y2); 
  pop(); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background("#a2f5dc");
}

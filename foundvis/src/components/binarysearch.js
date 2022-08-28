/// <reference path="../libraries/TSDef/p5.global-mode.d.ts" />

// Pseudo code

var codeText = [
    'lo, hi <- 0, n',           // 1
    'while lo < hi do',         // 2
    '    m <- (lo + hi) / 2',   // 3
    '    if x < A[m] then',     // 4
    '      hi <- m',            // 5
    '    else if x > A[m] then',// 6
    '      lo <- m + 1',        // 7
    '    else return m',           // 8
    'return notfound'           // 9
];

var lineWeight = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; 

// Input

var n, array, x; 

var N; 
var A; 
var X; 

// UI stuff

var gui; 
var speed; 
var backgroundColor; 
var secondBGColor; 
var correctAnswerColor; 
var testedColor; 
var progressBarColor; 
var resetButton; 
var prevButton; 
var nextButton; 
var playButton; 
var pauseButton; 


// Logic stuff

var _IsPaused; 
var curFrame;
var curPhase;  
var curlpos; 
var currpos;
var phases = []; 
var LoAndHi = []; 
var corrLines = []; 
var descriptions = [];
var frameSum; 
var phaseNum; 


const NOT_FOUND = -1; 

// length of operations

var INITLength; 
var COMPLength;
var ASSILength; 
var RETLength;

// display 

var sumElementWidth;
var elementWidth; 
var element_y1; 
var elementHeight; 

// background stuff

var vnum = 100; 
var vx = []; 
var vy = [];

function setup() {
    createCanvas(windowWidth, windowHeight); 
    backgroundColor = '#a2f5dc';    
    secondBGColor = color(180, 211, 217); 
    correctAnswerColor = color(114, 214, 56); 
    testedColor = color(168, 141, 50); 
    progressBarColor = color(28, 55, 74); 

    sumElementWidth = 0.5 * windowWidth; 

    noStroke(); 
    frameRate(60); 
    textSize(23); 
    textFont(ConsolasFont); 

    createController(); 

    readInputAndInitialize(); // initialize for default data
}

function createController() { 
    gui = createGui('Controller'); 
    gui.setPosition(0.835 * windowWidth, 0.05 * windowHeight); 

    sliderRange(0.5, 2, 0.1); 
    speed = 1; let speedMin = 0.5, speedMax = 2, speedStep = 0.1; 
    gui.addGlobals('speed');

    n = '10'; 
    array = '1, 2, 3, 4, 5, 6, 7, 8, 9, 10'; 
    x = '7'; 
    gui.addGlobals('n', 'array', 'x');  

        
    generateResetButtons(); 

    generatePlayPauseButtons(); 

    generateNextPrevButtons(); 
}

function generateResetButtons() { 
    let buttonX =  windowWidth * 0.875, buttonY = windowHeight * 0.4; 

    resetButton = createButton('Reset');
    beautifyButton(resetButton); 
    resetButton.mousePressed(readInputAndInitialize);; 

    resetButton.position(buttonX, buttonY);  
}

function generatePlayPauseButtons() { 
    let buttonX =  windowWidth * 0.5 - 40, buttonY = windowHeight * 0.8; 
    playButton = createButton('▶'); 
    beautifyButton(playButton); 
    playButton.mousePressed(playButtonPressed);

    pauseButton = createButton('| |'); 
    beautifyButton(pauseButton); 
    pauseButton.mousePressed(pauseButtonPressed); 

    playButton.position(buttonX, buttonY);
    pauseButton.position(buttonX, buttonY); 
}

function generateNextPrevButtons() { 
    let prevButtonX = windowWidth * 0.5 - 100 - 50, nextButtonX = windowWidth * 0.5 + 50, buttonY = windowHeight * 0.8; 

    prevButton = createButton('<<'); 
    beautifyButton(prevButton); 
    prevButton.mousePressed(prevButtonPressed); 

    nextButton = createButton('>>'); 
    beautifyButton(nextButton); 
    nextButton.mousePressed(nextButtonPressed); 

    prevButton.position(prevButtonX, buttonY); 
    nextButton.position(nextButtonX, buttonY); 
}

function prevButtonPressed() { 
    if(curPhase === 0) [curFrame, curPhase, curlpos, currpos] = [0, 0, convert_coordinate(0), convert_coordinate(N)]; 
    else { 
        let desPhase = curPhase - 1; 
        let [deslo, deshi] = LoAndHi[desPhase]; 
        [curFrame, curPhase, curlpos, currpos] = [phases[desPhase][2], desPhase, convert_coordinate(deslo), convert_coordinate(deshi)]; 
    }
}

function nextButtonPressed() { 
    let desPhase = (curFrame === phases[curPhase][2] && curPhase + 1 != phaseNum)? curPhase + 1: curPhase; 
    let [deslo, deshi] = LoAndHi[desPhase]; 
    [curFrame, curPhase, curlpos, currpos] = [phases[desPhase][2], desPhase, convert_coordinate(deslo), convert_coordinate(deshi)]; 
}

function pauseButtonPressed() { 
    pausePlay(); 
}

function playButtonPressed() { 
    pausePlay(); 
}

function pausePlay() { 
    if(_IsPaused == 1) _play(); 
    else _pause(); 
}
function _pause() { 
    _IsPaused = 1; 

    pauseButton.hide(); 
    playButton.show(); 
}
function _play() { 
    _IsPaused = 0; 

    playButton.hide(); 
    pauseButton.show(); 
}

function readInputAndInitialize() { 
    N = parseInt(n); 
    A = array.split(',').map(function(item) {
        return parseInt(item, 30);
    });
    X = parseInt(x); 

    elementWidth = sumElementWidth / N; 
    elementHeight = elementWidth; 
    element_y1 = 0.5 * windowHeight - 0.5 * elementHeight; 

    INITLength = 75 / speed; 
    COMPLength = 75 / speed; 
    ASSILength = 75 / speed; 
    RETLength = 75 / speed; 

    generate_phases(); 
    
    _pause(); 

    curFrame  = 0; 
    curPhase = 0; 
    curlpos = convert_coordinate(0); 
    currpos = convert_coordinate(N); 

    _pause(); 

}

function generate_phases() { 
    let lo = 0, hi = N; 
    function addPhase(arg1, arg2, duration, lines, description) { 
        phases[phaseNum] = [arg1, arg2, frameSum + duration]; 
        LoAndHi[phaseNum] = [lo, hi]; 
        corrLines[phaseNum] = lines; 
        descriptions[phaseNum] = description; 
        frameSum += duration;
        phaseNum++; 
    }
    frameSum = 0; 
    phaseNum = 0; 
    addPhase('I', 0, INITLength, [1, 1], 'Initializing..'); 
    while(1) { 
        addPhase('lohi', lo < hi, COMPLength, [2, 2], 'Check condition lo < hi: ' + (lo < hi? 'True': 'False')); 
        if(lo < hi) { 
            addPhase('mid', floor((lo + hi) / 2), COMPLength, [3, 3], 'Assign mid = ' + String(floor((lo + hi) / 2)));
            let mid = floor((lo + hi) / 2); 
            addPhase('C', mid, COMPLength, [4, 4], 'Check condition X < A[mid]: ' + (X < A[mid]? 'True': 'False')); 
            if(X < A[mid]) { 
                addPhase('hi', mid, ASSILength, [5, 5], 'Assign hi = ' + String(mid)); 
                hi = mid; 
            }
            else { 
                addPhase('C', mid, COMPLength, [6, 6], 'Check condition: X > A[mid]: ' + (X > A[mid]? 'True': 'False')); 
                 if(X > A[mid]) {
                    addPhase('lo', mid + 1, ASSILength, [7, 7], 'Assign lo = ' + String(mid + 1)); 
                    lo = mid + 1; 
                }
                else { 
                    addPhase('R', mid, RETLength, [8, 8], 'X is at position: ' + String(mid)); 
                    return mid; 
                }
            }
        }
        else break; 
    }
    addPhase('R', NOT_FOUND, RETLength, [9, 9], 'X is not in array A'); 
    return NOT_FOUND; 
}

function convert_coordinate(p) { 
    return windowWidth / 2 - elementWidth * N / 2 + elementWidth * p; 
}

function draw() {
    if(curFrame + 1 > frameSum) _pause(); 
    if(_IsPaused === 0) getNextFrame(); 

    drawFrame(); 
    displayCode(); 
    outputProgress();
}
let params = { 
    codeText: codeText,
    lineWeight: lineWeight,
    needHigh: 0,
    needLen: 1,
    curHigh: 0,
    curLen: 0
}
function displayCode() { 
    let lastPhase = curPhase == 0? 0: curPhase - 1; 
    params.needHigh = corrLines[curPhase][0];
    showCode(params, windowWidth * 0.01, windowHeight * 0.02, 18, windowWidth * 0.2); 
}

function outputProgress() { 
    var x = 0, y = 0; 
    var x2 = curFrame * 1.0 / frameSum * windowWidth, y2 = 0.005 * windowHeight; 
    push(); 
    fill(progressBarColor); 
    rect(x, y, x2, y2);     
    pop(); 
}

function getNextFrame() { 
    curFrame++; 
    if(curFrame > phases[curPhase][2]) ++curPhase; 

    let p = phases[curPhase]; 
    if(p[0] === 'I') { 

    }
    else if(p[0] === 'lohi') { 

    }
    else if(p[0] === 'mid') { 

    }
    else if(p[0] === 'hi') { 
        let desHi = p[1]; 
        let desrpos = convert_coordinate(desHi); 
        let frameLeft = p[2] - curFrame + 1; 
        currpos += (desrpos - currpos) / frameLeft; 
    }
    else if(p[0] === 'lo') { 
        let desLo = p[1]; 
        let deslpos = convert_coordinate(desLo); 
        let frameLeft = p[2] - curFrame + 1; 
        curlpos += (deslpos - curlpos) / frameLeft; 
    }
    else if(p[0] === 'R') { 

    }
    showDescription(); 
}

function showDescription() { 
    showOutput([descriptions[curPhase]], windowWidth * 0.01, windowHeight * 0.6, 21, 10, windowWidth * 0.2); 
}

function drawFrame() { 
    background(backgroundColor); 

    let p = phases[curPhase]; 

    push();
    fill(240); 
    rect(convert_coordinate(0), element_y1, elementWidth * N, elementHeight); 
    pop(); 

    push(); 
    fill('white') 
    strokeWeight(1.5); 
    rect(curlpos, element_y1, currpos - curlpos, elementHeight); 
    pop(); 

    for(let i = 0; i < N; i++) {        
        let x = convert_coordinate(i), y = element_y1;  

        push(); 
        fill(0);
        text(String(A[i]), x + elementWidth / 2 - 8, y + elementHeight / 2 + 8); 
        pop();  
    }

    for(let i = 1; i < N; i++) { 
        let x = convert_coordinate(i), y = element_y1; 

        push(); 
        stroke(245); 
        strokeWeight(2); 
        line(x, y + 1, x, y + elementHeight - 1); 
        pop(); 
    }

    push(); 
    fill('black'); 
    textAlign(CENTER, CENTER); 
    text('L', curlpos, element_y1 + elementHeight, elementWidth, elementHeight); 
    text('R', currpos, element_y1 - elementHeight, elementWidth, elementHeight); 
    pop(); 
    
    if(p[0] === 'C') { 
        let mid = p[1]; 
        push(); 
        noFill(); 
        stroke(168, 141, 50); 
        strokeWeight(3);  
        rect(convert_coordinate(mid), element_y1, elementWidth, elementHeight); 
        pop(); 
    }

    if(p[0] === 'R' && p[1] != NOT_FOUND) { 
        push(); 
        noFill(); 
        stroke(correctAnswerColor); 
        strokeWeight(3);  
        rect(convert_coordinate(p[1]), element_y1, elementWidth, elementHeight); 
        pop(); 
    }
}
/// <reference path="../libraries/TSDef/p5.global-mode.d.ts" />

function getSpeed(x, y) {
  if (abs(x - y) < 0.01) return x - y;
  return (x - y) / 13 + 0.01 * (x - y > 0 ? 1 : -1);
}

function updateHigh(curCode, newHigh, newLen) {
  console.log(newHigh);
  console.log(newLen);
  curCode.needHigh = newHigh;
  curCode.needLen = newLen;
}

function showCode(curCode, corX = 0, corY = 0, textSz = 30, boxW = 500) {
  push();

  let lineH = 1.2 * textSz;
  noStroke();

  textFont(ConsolasFont);
  textSize(textSz);

  let codeText = curCode.codeText;
  let lineWeight = curCode.lineWeight;
  let needHigh = curCode.needHigh;
  let needLen = curCode.needLen;
  let curHigh = curCode.curHigh;
  let curLen = curCode.curLen;
  fill("#32d9cb");
  let lineCnt = 0;
  for (let i = 0; i < codeText.length; i++) {
    rect(corX, corY + lineCnt * lineH + textSz * 0.25, boxW, lineH);
    lineCnt += lineWeight[i];
  }

  if (needLen) {
    let temp = lineWeight[needHigh-1]==0;
    for(let i = 0; i < needHigh; i++) {
      temp+=lineWeight[i];
    }
    
    fill("#4df0d6");
    curHigh = curHigh - getSpeed(curHigh, temp);
    curCode.curHigh = curHigh;

    curLen = curLen - getSpeed(curLen, needLen);
    curCode.curLen = curLen;

    rect(
      corX,
      corY + (curHigh - 1) * lineH + textSz * 0.25,
      boxW,
      lineH * curLen
    );
  }

  lineCnt = 0;
  for (let i = 0; i < codeText.length; i++) {
    if (i>=needHigh-1&&i<=needHigh+needLen-2) {
      fill("white");
    } else {
      fill("black");
    }

    text(codeText[i], corX + 0.2 * textSz, corY + (lineCnt + 1) * lineH);
    lineCnt += lineWeight[i];
  }

  pop();
}

function showOutput(
  curOutp,
  corX = 0,
  corY = 0,
  textSz = 30,
  maxLine = 5,
  boxW = 1000
) {
  push();

  while (curOutp.length > maxLine) {
    curOutp.shift();
  }

  let lineH = 1.2 * textSz;

  textFont(ConsolasFont);
  textSize(textSz);

  lineCnt = 0;
  for (ln of curOutp) {
    fill("black");
    rect(corX, corY + lineCnt * lineH + textSz * 0.25, boxW, lineH);

    fill("white");
    text(ln, corX + 0.2 * textSz, corY + (lineCnt + 1) * lineH);

    lineCnt++;
  }

  while (lineCnt < maxLine + 2) {
    fill("black");
    rect(corX, corY + lineCnt * lineH + textSz * 0.25, boxW, lineH);

    lineCnt++;
  }

  pop();
}

let x = 300;
let y = 600;
let y1 = 600;
let y2 = 600;
let org = 600;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#a2f5dc");  
}
let scaled = 3;
function draw() {
  
  let drew1 = org - y;
  let drew2 = org-y1;
  let drew3 = org-y2;
  let tot = drew3 + drew1 + drew2;
  strokeWeight(2);
  r = floor(randomGaussian(300*scaled,10*scaled));
  rscaled = r*4-2850;
  
// most common results -- 34% of the time each
  if (r < 300*scaled && r > 290*scaled) {
      stroke("#2b9bbd");
      y=y-1;
      ellipse(rscaled,y,1);
   }
  else if (r< 310*scaled && r> 300*scaled) {
      stroke("#2b9bbd");
      y = y-1;
      ellipse(rscaled,y,1);
  }
// next most likely -- 13.5% of the time each
  else if (r <290*scaled && r> 280*scaled) {
    stroke("#444ceb");
    y1 = y1-1;
    ellipse(rscaled,y1,1);
  }
  else if (r<320*scaled && r> 310*scaled) {
    stroke("#444ceb");
    y1 = y1-1;
    ellipse(rscaled,y1,1); 
  }
  
  else if (r< 280*scaled ) {
    stroke(194,153,252);
    y2 = y2-1;
    ellipse(rscaled,y2,1); 
  }
  else if (r > 320*scaled) {
    stroke(194,153,252);
    y2 = y2-1;
    ellipse(rscaled,y2,1);
  }
  push();
  noStroke();
  fill("#a2f5dc");
  
  rect(0, 630,2000, 1000);
  textSize(20);
  fill("#2b9bbd");
  text((drew1/tot*100).toFixed(2) + '%\n\n 68%', windowWidth/2-60, windowHeight/1.3);
  fill("#444ceb");
  text((drew2/tot*100).toFixed(2) + '%\n\n 27%', windowWidth/2-200, windowHeight/1.3);
  text((drew2/tot*100).toFixed(2) + '%\n\n 27%', windowWidth/2+80, windowHeight/1.3);
  fill(194,153,252);
  text((drew3/tot*100).toFixed(2) + '%\n\n 5%', windowWidth/2-300, windowHeight/1.3);
  text((drew3/tot*100).toFixed(2) + '%\n\n 5%', windowWidth/2+230, windowHeight/1.3);
  fill("#2b9bbd");
  text("Sample" + '\n\nExpected', windowWidth/2-500, windowHeight/1.3);
  pop();
}

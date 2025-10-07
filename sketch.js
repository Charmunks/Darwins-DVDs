var blocks = [];

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; 
}

function randomDirection() {
  return randomInRange(1, 9)
}

function pick(opt1, opt2, opt3) {

 var picked = randomInRange(1,4)
 if (picked == 1){
  return opt1
 }

 if (picked == 2){
  return opt2
 }

 if (picked == 3){
  return opt3
 }
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  clear();
  background(220);
  fleeFromLargerBlocks();
  handleCornerSplits(); 
  blocks.forEach(moveBlock);
  checkCollisions();
  blocks.forEach(drawSquare);
}

function mousePressed() {
  let block = [mouseX, mouseY, 0, 1, 1];
  blocks.push(block);
  console.log(blocks);
}

function drawSquare(item) {
  fill(0); 
  noStroke();
  rectMode(CENTER);
  rect(item[0], item[1], 10*item[4], 10*item[4]);
}

function moveBlock(item) {
  item[3]++;

  if (item[3] >= 200 / item[4]) {
    item[2] = randomDirection();
    item[3] = 0;
  }

  if (item[0] > 450) item[2] = pick(2, 5, 8);
  if (item[0] < 50) item[2] = pick(1, 6, 7);
  if (item[1] < 50) item[2] = pick(3, 7, 8);
  if (item[1] > 450) item[2] = pick(4, 5, 6);

  switch (item[2]) {
    case 0:
      item[2] = randomDirection();
      break;
    case 1:
      item[0]+= item[4];
      break;
    case 2:
      item[0]-= item[4];
      break;
    case 3:
      item[1]+= item[4];
      break;
    case 4:
      item[1]-= item[4];
      break;
    case 5:
      item[1] -= 0.7 * item[4];
      item[0] -= 0.7 * item[4];
      break;
    case 6:
      item[1] -= 0.7 * item[4];
      item[0] += 0.7 * item[4];
      break;
    case 7:
      item[1] += 0.7 * item[4];
      item[0] += 0.7 * item[4];
      break;
    case 8:
      item[1] += 0.7 * item[4];
      item[0] -= 0.7 * item[4];
      break;
  }
}

function checkCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    for (let j = i + 1; j < blocks.length; j++) {
      let b1 = blocks[i];
      let b2 = blocks[j];
      if (isColliding(b1, b2)) {
        console.log("collided!");
        if (b1[4] >= b2[4]){
        blocks[i][4]+= (b2[4] / 2)
        blocks.splice(j, 1)
        } else {
        blocks[j][4] += (b1[4] / 2)
        blocks.splice(i, 1)
        }
      }
    }
  }
}



function isColliding(b1, b2) {
  let size = 10 * ((b1[4] + b2[4]) * 0.5);
  return (
    abs(b1[0] - b2[0]) < size &&
    abs(b1[1] - b2[1]) < size
  );
}

function isNearby(b1, b2) {
  let size = (10 * ((b1[4] + b2[4]) * 0.5) + 100);
  return (
    abs(b1[0] - b2[0]) < size &&
    abs(b1[1] - b2[1]) < size
  );
}

function directionAwayFrom(b1, b2) {
  const dx = b1[0] - b2[0]; 
  const dy = b1[1] - b2[1]; 

 if (abs(dx) < 5 && abs(dy) < 5) return 0;

  if (abs(dx) > abs(dy)) {
    return dx > 0 ? 1 : 2; 
  } else if (abs(dy) > abs(dx)) {
    return dy > 0 ? 3 : 4; 
  } else {
    if (dx < 0 && dy < 0) return 5; 
    if (dx > 0 && dy < 0) return 6; 
    if (dx > 0 && dy > 0) return 7; 
    if (dx < 0 && dy > 0) return 8; 
  }
}

function fleeFromLargerBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    let current = blocks[i];
    for (let j = 0; j < blocks.length; j++) {
      if (i === j) continue;
      let other = blocks[j];
      if (isNearby(current, other) && other[4] >= 2 * current[4]) {
        current[2] = directionAwayFrom(current, other);
        break; 
      }
    }
  }
}

function checkNewBoxes(num) {
 size = 1
 num -= 1
 size += num * 2
 return size
}

function handleCornerSplits() {
  for (let i = blocks.length - 1; i >= 0; i--) {
    let b = blocks[i];
    let atCorner = 
      (b[0] <= 75 && b[1] <= 75) ||
      (b[0] >= 425 && b[1] <= 75) ||
      (b[0] <= 75 && b[1] >= 425) ||
      (b[0] >= 425 && b[1] >= 425);

    if (atCorner) {
      if (b[4] > 1){
      let newCount = checkNewBoxes(b[4]);

      for (let n = 0; n < newCount; n++) {
        let newBlock = [250 + randomInRange(-50, 50), 250 + randomInRange(-50, 50), randomDirection(), 0, 1];
        blocks.push(newBlock);
      }

      blocks.splice(i, 1);
    }
  }
}
}

let balloons = [];
let balloonState = true;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(250);
  
  balloons = [...new Array(75).fill(0)].map( (d,i) => {
    
    if(i < 15){
      return new Balloon("🧁")
    } else if(i >= 15 && i < 30){
      return new Balloon("😸")
    } else if(i >= 30 && i < 45){
      return new Balloon("🎉")
    }
      else if(i >= 45 && i < 55){
      return new Balloon("🍾")
    }
      else if(i >= 55 && i < 65){
      return new Balloon("🎁")
    }
      else if(i >= 65 && i < 66){
      return new Balloon("🎂")
    } else {
      return new Balloon("🎈")
    } 
    
  
  });
    
  colorMode(HSB);
  console.log('New version running')

  setTimeout(() => {
    console.log('Fireworks started')
    balloons = []
    balloonState = false;
    setupFireworks()

  }, 5000)
}

function draw() {
  if(balloonState === true) {
    background(255, 100, 100);
  
    balloons.forEach(d => {
      d.update();
      d.render();
    })
    
    
    textAlign(CENTER);
  
    fill(255);
    stroke(255);
    strokeWeight(4);
    textSize(80);  
    
    text('Happy', width*0.25,height*0.25)
    text('Birthday', width*0.5,height*0.5)
    text('Vanessa!!!', width*0.75,height*0.75)
  }
  else  {
    colorMode(RGB);
    background(0, 0, 0, 25);
    renderFireworks();
  }
  
}

class Balloon {

  constructor(val){
  this.x = random(width);
  this.y = height;
    this.speed = random(1, 3);
  this.val = val ||"🎈";
    this.xNoise = 0;
  }
  
  update(){
    this.xNoise +=0.01;
    this.x = this.x +  noise(this.xNoise) * random(-1,1);
    this.y -= 1 * this.speed;
    
    this.checkTop();
  }
  
  render(){
    text(this.val, this.x, this.y);
  }
  
  checkTop(){
    if(this.y < 0){
      this.y = height;
    }
  }
}

// Fireworks code:

let fireworks = [];
let gravity;
let letter;
let textCounter = 0;
let font;

function preload() {
  font = loadFont('fonts/Courgette-Regular.ttf');
}


function setupFireworks() {
  
  letter = 'HAPPY BIRTHDAY VANESSA'.replace(/\s/g, '').split('');
  textCounter = 0;
  gravity = createVector(0, 0.2);
  
  fireTheFireworks();
  
}

function fireTheFireworks(){
  let currentWord = 0;
  setInterval(() => {
    if(currentWord === 0) {
    [...new Array(5).fill(0)].map( (d,i) => {
      setTimeout(() => {
        addFirework((i+1)*100)  
      }, i*100)
    })
    setTimeout(() => {
        currentWord += 1
    }, 1000)
    } else if(currentWord === 1){
      [...new Array(8).fill(0)].map( (d,i) => {
      setTimeout(() => {
          
        addFirework((i+1)*100 + 300, i === 0)  
      }, i*100)
    })
    setTimeout(() => {
        currentWord += 1
    }, 1000)
    } else if(currentWord === 2) {
      [...new Array(7).fill(0)].map( (d,i) => {
      setTimeout(() => {
        addFirework((i+1)*100 + 400)  
      }, i*100)
      })
      setTimeout(() => {
        currentWord += 1
    }, 1000)
    } else {
      setTimeout(() => {
        currentWord = 0
      }, 3000)
    }
 
  }, 5000)
}

function addFirework(ind, deb) {
  fireworks.push(new Firework(ind, deb));
}

function renderFireworks() {
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
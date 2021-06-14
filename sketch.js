let balloons = [];
let balloonState = true;
let startedSong = false;
let song;

function mousePressed() {
  song.play();
  startedSong = true;
}

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

  setTimeout(() => {
    balloons = []
    balloonState = false;
    setupFireworks()

  }, 25000)
}

function draw() {
  if(startedSong === false) {
    textSize(80);  
    textAlign(CENTER);
    text('😺😺😺😺😺😺',  width*0.5,height*0.75) 
    text('😺 Click me 😺', width*0.5,height*0.5)
    text('😺😺😺😺😺😺',  width*0.5,height*0.25)
    return
  }
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
  font = loadFont('fonts/JosefinSans-LightItalic.ttf');
  song = loadSound('music/Happy_birthday.mp3')
}


function setupFireworks() {
  
  letter = 'HAPPY BIRTHDAY VANESSA'.replace(/\s/g, '').split('');
  textCounter = 0;
  gravity = createVector(0, 0.2);
  
  fireTheFireworks();
  
}

function fireTheFireworks(){
  let currentWord = 0;
  const wordCallback = (w) => {currentWord = w} 
  fireWord(currentWord, wordCallback);
  setInterval(() => {
   fireWord(currentWord, wordCallback);
  }, 3000)
}

function fireWord(currentWord, updateWord){
    if(currentWord === 0) {
        [...new Array(5).fill(0)].map( (d,i) => {
          setTimeout(() => {
            addFirework((i+1)*100)  
          }, i*100)
        })
            updateWord(currentWord += 1)
        } else if(currentWord === 1){
          [...new Array(8).fill(0)].map( (d,i) => {
          setTimeout(() => {   
            addFirework((i+1)*100)  
          }, i*100)
        })
        updateWord(currentWord += 1)
        } else if(currentWord === 2) {
          [...new Array(7).fill(0)].map( (d,i) => {
          setTimeout(() => {
            addFirework((i+1)*100)  
          }, i*100)
          })
          updateWord(currentWord += 1)
        } else {
            updateWord(0)
        }
}

function addFirework(ind) {
  fireworks.push(new Firework(ind));
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
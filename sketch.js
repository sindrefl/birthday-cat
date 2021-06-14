let balloons = [];
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
}

function draw() {
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


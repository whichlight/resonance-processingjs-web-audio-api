/**
 tiaga

 kawandeep virdee
 **/


int width=600;
int height=600;
int t=0;
float yval=300;
boolean saveFrames=false;

void setup() {
  smooth();
  frameRate(15);
  colorMode(HSB, 360, 100, 100, 100);
  size(width, height);
}

void draw() {

  yval =450+50*sin(radians(5*t));
  if (mouseY!=0) {
    yval=mouseY;
  }
  float y = max(height-(yval), 100);
  float res = height/(y/10);
  float sat=50;
  float val = map(height-yval, 0, height, 10, 20);
  background(234, 5, 100);

  for (int i=0; i<height; i+=res) {
    noStroke();
    fill(100, 70, val, 2+res);
    rect(0, y+i, width, 1*i*res);
  }

  if (saveFrames) {
    save("images/"+str(t)+".gif");
  }
  t++;
}

void keyPressed() {
  if (key == CODED) {
    if (keyCode == UP) {
      println("Start saving frames");
      saveFrames=true;
    }
    else if (keyCode == DOWN) {
      println("Stop saving frames");
      saveFrames=false;
    }
  }
}

// connecting to some js functions in synth.js

void mouseDragged(){
    float pitch = map(mouseY,height,0,200,780);
    updateNotes(pitch,100);
    onNotes();
}

void mouseReleased() { offNotes();}
void mousePressed(){
    float pitch = map(mouseY,height,0,200,780);
    updateNotes(pitch,100);
    onNotes();
}

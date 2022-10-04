status = "";
objects = "";

function preload(){

}

function setup(){
  canvas = createCanvas(250, 250);
  canvas.center();
  camera = createCapture(VIDEO);
  camera.size(250, 250);
  camera.hide();

}

function draw(){
  image(camera, 0, 0, 250, 250);

  if(status != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(camera, gotResult);
    for(i = 0; i < objects.length; i++){
      document.getElementById("status1").innerHTML = "OBJECTS DETECTED";
      document.getElementById("number_of_objects1").innerHTML = objects.length;

      fill(r, g, b);
      percentage = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percentage + "%", objects[i].x + 5 , objects[i].y + 15);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status1").innerHTML = "DETECTING OBJECTS";
}

function modelLoaded(){
    console.log("Model is ready!");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log("An error has occured..");
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
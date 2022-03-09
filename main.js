
Webcam.set({
    width : 300,
    height : 350,
    image_format : 'png',
    png_quality : 90
});

camera = document.getElementById("webcam");
Webcam.attach(camera);

function Capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("output_img").innerHTML = "<img id='output_image' src='"+data_uri+"'></img>";
    });
}

console.log('ml5 version : '+ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/fiwmgMm_8/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function Identify(){
    captured_image = document.getElementById("output_image");
    classifier.classify(captured_image , define_person);
}

function define_person(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("people").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}
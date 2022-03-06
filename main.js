prediction1="";
prediction2="";

Webcam.set({
    width: 300,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

webcamera= document.getElementById("webcamera");
Webcam.attach("#webcamera");

function capture(){
    Webcam.snap(function (data_uri){
        document.getElementById("snapcam").innerHTML="<img id='snappie' src="+data_uri+">"
    });
}

console.log("ml5 version is", ml5.version)

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/j2AqXCq7f/model.json", modelLoaded);

function modelLoaded(){
    console.log("The model has been initialized");
}


function speak(){
    var synth = window.speechSynthesis;
    sd1="The first prediction is "+ prediction1;
    sd2="and the second prediction is "+ prediction2;
    var ut = new SpeechSynthesisUtterance(sd1+sd2);
    synth.speak(ut);
}

function identify(){
    img=document.getElementById("snappie");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results)
        
        document.getElementById("emoji_name1").innerHTML=results[0].label;

        document.getElementById("emoji_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();

        if (results[0].label=="Happy"){
            document.getElementById("emoji1").innerHTML="😁"
        }

         if (results[0].label=="Angry"){
            document.getElementById("emoji1").innerHTML="👿"
        }

         if (results[0].label=="Sad"){
            document.getElementById("emoji1").innerHTML="😥"
        }

        if(results[1].label=="Happy"){
            document.getElementById("emoji2").innerHTML="😁"
        }

        if(results[1].label=="Angry"){
            document.getElementById("emoji2").innerHTML="👿"
        }

        if(results[1].label=="Sad"){
            document.getElementById("emoji2").innerHTML="😥"
        }
    }
}
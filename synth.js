var synths = [];
var gainVal = 0.03;
var qval = 25;

function openNotes(){
       synths.push(setupSynth(150));
       synths.push(setupSynth(100));
       synths.push(setupSynth(200));
       synths.push(setupSynth(250));
       synths.push(setupSynth(300));
}

function closeNotes(){
   for(var i=0; i<synths.length; i++){
       synths[i].source.noteOff(0);
    }
}

function updateNotes(pitch, variance){
   for(var i=0; i<synths.length; i++){
       synths[i].filter.frequency.value = pitch + variance*Math.random();
    }
}

function onNotes(){
   for(var i=0; i<synths.length; i++){
       synths[i].volume.gain.value=gainVal;
    }
}


function offNotes(){
   for(var i=0; i<synths.length; i++){
       synths[i].volume.gain.value=0;
    }
}

function setupSynth(f){
    var nodes={};
    nodes.source = context.createOscillator();
    nodes.source.type=1;
    nodes.source.frequency.value = f;
    nodes.filter = context.createBiquadFilter();
    nodes.filter.Q.value =qval;
    nodes.volume = context.createGainNode();
    nodes.filter.type=0; //0 is a low pass filter

    nodes.volume.gain.value = gainVal;
    nodes.source.connect(nodes.filter);
    nodes.filter.connect(nodes.volume);
    //frequency val
    nodes.filter.frequency.value=400;


    //reverb
    nodes.reverb = context.createConvolver();

    nodes.volume.connect(nodes.reverb);
    nodes.reverb.connect(context.destination);
    nodes.volume.gain.value=0;
    nodes.source.noteOn(0);
    nodes.volume.gain.value=0;
    setReverbImpulseResponse('reverb.mp3', nodes.reverb, function() {
      nodes.source.noteOn(0);
    });
    return nodes;
}

function setReverbImpulseResponse(url, convolver, callback) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        request.onload = function () {
            convolver.buffer = context.createBuffer(request.response, false);
            callback();
        }
        request.send();
    }

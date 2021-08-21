console.log("App started");
class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.play = document.querySelector('.play')
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound')
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 40;
    }
// we check that the index of 0 dosnt go over 8 elements
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        console.log(activeBars);
        this.index++;



    }
// start the BeatMaker
    start() {
        // The speed of steps 
        const speed = this.bpm * 1000 / 60
        setInterval(() => {
            this.repeat();
        }, speed)
    }
// Change the pads class to active color 
    activePad(){
       this.classList.toggle('active')
    }
}


const drumKit = new DrumKit();
// Run start Method 
drumKit.play.addEventListener('click',function(){
    drumKit.start();
})

// loop throw pads to change css backgrounds

drumKit.pads.forEach(pad => {
    pad.addEventListener('click',drumKit.activePad)
})
console.log("App started");
class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.play = document.querySelector('.play')
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound')
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 200;
    }
    // we check that the index of 0 dosnt go over 8 elements
    repeat() {
        // reset index.0 after 7 element
        let step = this.index % 8;
        // we catch b class element to loop throw
        const activeBars = document.querySelectorAll(`.b${step}`);
        // we catch each bar in active bars and ease it in-out by keyFrame
        activeBars.forEach((bar) => {
            bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
            // Check if pads are active
            if (bar.classList.contains('active')) {
                // check if each sound is clicked
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.play();
                    //reset the time 
                    this.kickAudio.currentTime=0;
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.play();
                    this.snareAudio.currentTime=0;
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.play();
                    this.hihatAudio.currentTime=0;
                }
            }
        })
        console.log(activeBars);
        this.index++;
    }



    // Methods

    // start the BeatMaker
    start() {
        // The speed of steps 
        const speed = this.bpm * 1000 / 60
        setInterval(() => {
            this.repeat();
        }, speed)
    }
    // Change the pads class to active color 
    activePad() {
        this.classList.toggle('active')
    }
}









const drumKit = new DrumKit();
// Run start Method 
drumKit.play.addEventListener('click', function () {
    drumKit.start();
})

// loop throw pads to change css backgrounds

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad)
    pad.addEventListener("animationend", function () {
        pad.style.animation = '';
    })
})
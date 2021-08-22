console.log("App started ...");
class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play')
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound')
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.currentKick = './sounds/kick-808.wav';
        this.currentSnare = './sounds/hihat-analog.wav';
        this.currentHihat = './sounds/snare-analog.wav';
        this.index = 0;
        this.bpm = 20;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
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
                    this.kickAudio.currentTime = 0;
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.play();
                    this.snareAudio.currentTime = 0;
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.play();
                    this.hihatAudio.currentTime = 0;
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
        const speed = (this.bpm / 60 )* 1000 ;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, speed)
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;

        }
    }
    // Change the pads class to active color 
    activePad() {
        this.classList.toggle('active')
    }

    // update the button while click 
    updateBtn() {
        if (this.isPlaying) {
            this.playBtn.innerHTML = 'play';
            this.playBtn.classList.remove('active');

        } else {
            this.playBtn.innerHTML = 'Stop';
            this.playBtn.classList.add('active');
        }
    }

    // Change sound options
    changeSound(e) {
        const selectedName = e.target.name;
        const selectedValue = e.target.value;
        switch (selectedName) {
            case 'kick-select':
                this.kickAudio.src = selectedValue
                break;
            case 'snare-select':
                this.snareAudio.src = selectedValue
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectedValue
                break;
        }
    }
    // Mute button

    onMute(e) {
        // we catch the attribute data-track to know which button is our value 
        const muteIndex = e.target.getAttribute('data-track');
        // we add active class to change the background of the button while mute
        e.target.classList.toggle('active');
        // we make conditon if the target is active thats mean it gonna be muted
        if (e.target.classList.contains('active')) {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 0
                    break;
                case '1':
                    this.hihatAudio.volume = 0
                    break;
                case '2':
                    this.snareAudio.volume = 0
                    break;
            }
            // else its unMute
        } else {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 1
                    break;
                case '1':
                    this.hihatAudio.volume = 1
                    break;
                case '2':
                    this.snareAudio.volume = 1
                    break;
            }

        }
    }
    onTempoChange(e){
        const tempNum= document.querySelector('.tempo-nr');
        tempNum.innerHTML=e.target.value;
        
    }
    onUpdateTempo(e){
        this.bpm=e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying=null;
        if(this.playBtn.classList.contains('active'))
        this.start()
        
    }
}






// Event Listeners

const drumKit = new DrumKit();
// Run start Method 
drumKit.playBtn.addEventListener('click', function () {
    drumKit.start();
    drumKit.updateBtn();
})

// loop throw pads to change css backgrounds

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad)
    pad.addEventListener("animationend", function () {
        pad.style.animation = '';
    })
})

drumKit.selects.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    })
})


drumKit.muteBtn.forEach(btn => {
    btn.addEventListener('click', function (e) {
        drumKit.onMute(e)
    })
})


drumKit.tempoSlider.addEventListener('input',function(e){
    drumKit.onTempoChange(e);
})


drumKit.tempoSlider.addEventListener('change',function(e){
    drumKit.onUpdateTempo(e);
})
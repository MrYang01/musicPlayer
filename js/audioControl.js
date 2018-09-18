(function($, root){
    function audioControl(){
        this.audio = new Audio();
        this.status = "pause";
    }

    audioControl.prototype={
        play: function(){
            this.status = "play";
            this.audio.play();
        },
        pause: function(){
            this.status = "pause";
            this.audio.pause();
        },
        setSource: function(src){
            // console.log(src);
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function(time){
            this.audio.currentTime = time;
            this.play();
        }
    }

    root.audioControl = audioControl;
})(window.Zepto, window.player || (window.player = {}))
(function ($, root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var startTime;
    var lastPercent = 0;

    function formatTime(time){
        var time = Math.round(time);
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        minutes = minutes < 10 ? ("0" + minutes) : minutes;
        seconds = seconds < 10 ? ("0" + seconds) : seconds;
        return minutes + ":" + seconds;
    }

    function renderAllTime(duration){
        curDuration = duration;
        lastPercent = 0;
        var allTime = formatTime(duration);
        $scope.find(".all-time").html(allTime);
    }

    function update(percent){
        var curTime = percent * curDuration;
        // console.log(curTime)
        curTime = formatTime(curTime);
        $scope.find(".cur-time").html(curTime);

        var percentage = (percent - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            transform: 'translateX(' + percentage + ')'
        })
    }

    function play(percentage){
        lastPercent = percentage === undefined ? lastPercent : percentage; 
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function Frame(){
            var curTime = new Date().getTime();
            var percent = lastPercent + (curTime - startTime) / (curDuration * 1000);
            // console.log(percent);
            if(percent < 1){
                frameId = requestAnimationFrame(Frame);
                update(percent);
            }else {
                $scope.find(".next-btn").trigger("click");
            }
        }
        Frame();
    }

    function stop (){
        var stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }
    root.progress = {
        play: play,
        renderAllTime: renderAllTime,
        update: update,
        stop: stop
    }
})(window.Zepto, window.player || (window.player = {}))
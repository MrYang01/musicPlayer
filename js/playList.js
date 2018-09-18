(function($, root){
    var $scope = $(document.body);
    var control;
    var $playList = $('<div class="list-wrapper"><div class="cover"></div>\
                        <div class="list-content">\
                            <div class="play-header">播放列表</div>\
                            <ul class="play-list"></ul>\
                        </div>\
                        </div>');
    function renderList(data){
        var len = data.length;
        var songList = '';
        for(var i = 0; i < len; i ++){
            songList += '<li>' + data[i].title + '<span> - ' + data[i].author + '</span></li>';
        }
        $playList.find(".play-list").html(songList);

        // console.log($playList);
        $scope.append($playList);
    }

    function activeSong(index){
        $playList.find(".active").removeClass("active");
        $playList.find("ul li").eq(index).addClass("active");
    }

    function show(controlmanager){
        control = controlmanager;
        $playList.addClass("show");
        activeSong(root.curIndex);
        bindEvent();
    }

    function bindEvent(){
        $playList.on("click", $(".cover"), function(e){
            // console.log(111)
            // e.stopPropagation();
            setTimeout(function(){
                $playList.removeClass("show");
            }, 0)
        })
        $playList.find("li").on("click", function(){
            var index = $(this).index();
            activeSong(index);
            // control.index = index;
            $scope.trigger("playPause", [index, true]);
            $scope.find(".play-btn").addClass("playing");
            // setTimeout(function(){
            //     $playList.removeClass("show")
            // }, 200);
        })
    }

    root.playList={
        renderList : renderList,
        show: show
    }
})(window.Zepto, window.player || (window.player = {}))
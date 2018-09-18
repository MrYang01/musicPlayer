var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList;
var controlmanager;
var curIndex;
var audio = new root.audioControl();


function bindClick(){
    $scope.on('playPause',function(event, index, flag){
        // console.log(songList)
        // console.log(songList[index]);
        audio.setSource(songList[index].url);
        root.curIndex = index;
        if(audio.status == "play" || flag){
            audio.play();
            root.progress.play();
        }
        root.render(songList[index]);
        root.progress.renderAllTime(songList[index].time);
        root.progress.update(0);
    })
    $scope.find(".search").on("click", "li", function (e) {
        $scope.find(".search-list").removeClass("show");
        var i = e.target.dataset.id;
        // root.render(songList[i]);
        // console.log(i)
        songList = root.songList;
        // console.log(songList);
        root.playList.renderList(songList);
        $scope.trigger("playPause",i);
    })

    $scope.on('click','.prev-btn', function(){
        var index = controlmanager.prev();
        $scope.trigger("playPause",index);
    })
    $scope.on('click','.next-btn', function(){
        var index = controlmanager.next();
        $scope.trigger("playPause",index);
    })
    $scope.on('click','.play-btn', function(){
        // console.log('click')
        if(audio.status == "play"){
            audio.pause();
            root.progress.stop();
        }else {
            audio.play();
            root.progress.play();
        }
        $(this).toggleClass("playing");
    })
    $scope.on("click", ".list-btn", function(e){
        root.playList.show(controlmanager);
        // console.log(controlmanager)
    })
}

function bindTouch(){
    var $slidePoint = $scope.find(".slider-point");
    var offset = $scope.find(".pro-bottom").offset();
    var width = offset.width;
    var left = offset.left;

    $slidePoint.on("touchstart", function(){
        root.progress.stop();
    }).on("touchmove", function (e){
        //计算拖拽的百分比 更新我们的当前时间和进度条
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0;
        }
        root.progress.update(percent);
    }).on("touchend", function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0;
        }
        var curDuration = songList[root.curIndex].time;
        var curTime = curDuration * percent;
        audio.playTo(curTime);
        root.progress.play(percent);
        $scope.find(".play-btn").addClass("playing");
    })
}

// function getData(url){
//     $.ajax({
//         type : "GET",
//         url : url,
//         dataType: "jsonp",
//         success : function(data){
//             console.log(data);
//             songList = data.data.lists;
//             bindClick();
//             bindTouch();
//             root.search();
//             root.render(data.data);
//             root.playList.renderList(data);
//             console.log(data.length);
//             controlmanager = new root.controlManager(data.length);
//             $scope.trigger("playPause",0);
//         },
//         error : function(){
//             console.log("error")
//         }
//     })
// }

// getData('http://www.kugou.com/yy/index.php?r=play/getdata&hash=2E337E69AC38C35A01BF098E75CBB0EE&album_id=584616&callback=jQuery33105220341481598885_1533631088204&_=1533631088206');

// var url = 'https://api.hibai.cn/api/index/index';
// root.playList.renderList(songList);
// controlmanager = new root.controlManager(data.length);
// $scope.trigger("playPause",0);

function enterFullScreen() {
    var de = document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
    }
}
function init(){
    var url = "https://api.hibai.cn/api/index/index";
    $.ajax({
        type: "POST",
        // url: 'http://songsearch.kugou.com/song_search_v2?keyword='+ name + '&page=1&pagesize=10&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0',
        url: url,
        data: {
            "TransCode": "020116",
            "OpenId": "Test",
            "Body": {
                "key": "空白格"
            }
        },
        success: function (data) {
            // console.log(data)
            songList = data.Body;
            // root.songList = songList;
            root.render(songList[0])
            root.playList.renderList(songList);
            controlmanager = new root.controlManager(songList.length);
            $scope.trigger("playPause",0);
        }
    })
    bindClick();
    bindTouch();
    root.search();
}
init();
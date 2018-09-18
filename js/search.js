(function ($, root) {
    var $scope = $(document.body);
    var songList;

    // function $_GET(name, urls) {
    //     var url = urls || window.location.href;
    //     if (!name == true) {
    //         var data = url.match(new RegExp("([^?&]*)=([^?&]*)", "ig"));
    //         return data != null ? data : [];
    //     } else {
    //         var test = new RegExp(name + "=", "i").test(url);
    //         return test ? url.match(new RegExp(name + "=([^?&]*)", "i"))[1] : "";
    //     }
    // };

    // 将会包装事件的 debounce 函数 防抖节流
    function debounce(fn, delay) {
        // 维护一个 timer
        let timer = null;

        return function () {
            // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
            let context = this;
            let args = arguments;

            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    }


    function renderSearchList(data) {
        var str = "";
        // console.log(data);
        if (data == "null") {
            // console.log(111);
            $scope.find(".search-list").removeClass("show");
            return;
        }
        var len = data.length;
        for (var i = 0; i < len; i++) {
            // var id = $_GET("id", data[i].url)
            str += '<li data-id="' + i + '" >' + data[i].title + '&nbsp; - &nbsp;' + data[i].author + '</li>';
        }
        // console.log(str)
        $scope.find(".search ul").html(str);
        $scope.find(".search-list").addClass("show");
    }

    function searchInput() {
        $scope.on("input", "#search", debounce( function () {
            var key = $(this).val();
            var url = "https://api.hibai.cn/api/index/index";
            $.ajax({
                type: "POST",
                // url: 'http://songsearch.kugou.com/song_search_v2?keyword='+ name + '&page=1&pagesize=10&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0',
                url: url,
                data: {
                    "TransCode": "020116",
                    "OpenId": "Test",
                    "Body": {
                        "key": key
                    }
                },
                // dataType:"jsonp",
                success: function (data) {
                    // console.log(data)
                    renderSearchList(data.Body);
                    songList = data.Body;
                    root.songList = songList;
                }
            })
        },500))
    }

    function playSong() {
        $scope.find(".search").on("click", "li", function (e) {
            $scope.find(".search-list").removeClass("show");

            var i = e.target.dataset.id;
            // console.log(e)
            console.log(songList[i])
            root.render(songList[i]);
            root.progress.renderAllTime(songList[i].time)
            // root.playList.renderList(songList[i]);

            // console.log($(this))
            // $.ajax({
            //     type: "GET",
            //     url: 'http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + hash + '&album_id=' + id,

            //     success: function (data) {
            //         // console.log(data);
            //         // root.render(data.data);
            //         // data = data;
            //         root.render(data.data);
            //         root.playList.renderList(data);
            //         // controlmanager = new root.controlManager(data.length);
            //         $scope.trigger("playPause", 0);
            //     }
            // })
        })
    }

    root.search = function () {
        searchInput();
        // debounce(searchInput,500)
        // playSong();
        // console.log(songList)
        return songList;
    }
    // root.search = {
    //     songList :
    // }
})(window.Zepto, window.player)
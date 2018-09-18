(function ($, root) {
    var $scope = $(document.body);

    function getUrlBase64(url, ext, callback) {
        var canvas = document.createElement("canvas");   //创建canvas DOM元素
        var ctx = canvas.getContext("2d");
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = function () {
            canvas.height = 100; //指定画板的高度,自定义
            canvas.width = 100; //指定画板的宽度，自定义
            ctx.drawImage(img, 0, 0, canvas.height, canvas.width); //参数可自定义
            var dataURL = canvas.toDataURL("image/" + ext);
            callback.call(this, dataURL); //回掉函数获取Base64编码
            canvas = null;
        };
    }

    // function renderImg(src) {
    //     var img = new Image();
    //     src = getBase64Image(src);
    //     img.onload = function () {
    //         $scope.find(".img-wrapper img").attr("src", src);
    //         root.blurImg(img, $scope);
    //     }
    //     img.src = src;
    // }

    function renderImg(src){
        getUrlBase64(src,"jpg",function(dataURL){
            $scope.find(".img-wrapper img").attr("src", src);
            var img = new Image();
            img.src = dataURL;
            img.onload=function(){
               root.blurImg(img, $scope);
            }
        })
    }

    function renderInfo(data) {
        // console.log(data)
        var songInfo = '<div class="song-name">' + data.title + '</div>\
            <div class="singer-name">' + data.author + '</div>';
            // <div class="album-name">' + data.album_name + '</div>';

        $scope.find(".song-info").html(songInfo);
    }

    function renderIsLike(isLike) {
        if (isLike) {
            $scope.find('.like-btn').addClass('liking');
        } else {
            $scope.find('.like-btn').removeClass('liking');
        }
    }


    root.render = function (data) {
        renderImg(data.pic);
        renderInfo(data);
        renderIsLike(data.isLike);
    }

})(window.Zepto, window.player || (window.player = {}))
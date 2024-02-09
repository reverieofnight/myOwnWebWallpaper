const backgroundModule = (function () {
    let timeout = 15000; //切换图片时间
    let background = '';//背景图片元素
    let IntervalTimer = '';
    function init() {
        console.log('backgroundJS');
        background = document.querySelector('#background');
        window.wallpaperPropertyListener = {
            applyUserProperties:function(properties){
                if(properties.imagedirectory){
                    console.log('图片路径改变',properties.imagedirectory);
                    window.wallpaperRequestRandomFileForProperty('imagedirectory',switchBackgroundImage)
                };
                if(properties.timeout){
                    timeout = properties.timeout.value * 1000;
                    resetTimeInterval();
                }
            }
        }
        //添加初始背景图片
        window.wallpaperRequestRandomFileForProperty('imagedirectory',switchBackgroundImage)
    }
    function resetTimeInterval(){
        if(IntervalTimer){
            clearInterval(IntervalTimer);
        }
        IntervalTimer = setInterval(() => {
            window.wallpaperRequestRandomFileForProperty('imagedirectory',switchBackgroundImage)
        }, timeout);
    }
    function switchBackgroundImage(propertyName,filePath) {
        let path  = "file:///" + filePath;
        let url = "url('" + path + "')";
        console.log('切换图片');
        let beforeImage = document.createElement('div');
        beforeImage.classList.add('beforeImage');
        beforeImage.style.backgroundImage = url;
        beforeImage.style.transition = "opacity 2s cubic-bezier(0.25,0.1,0.25,1)"
        beforeImage.style.opacity = '0';
        background.append(beforeImage);

        setTimeout(() => {
            beforeImage.style.opacity = '1';
            setTimeout(() => {
                background.removeChild(beforeImage);
                background.style.backgroundImage = url;
            }, 2000);
        }, 100);
    }
    return {init,switchBackgroundImage}
})()

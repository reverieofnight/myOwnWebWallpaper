const backgroundModule = (function () {
    let timeout = 15000; //切换图片时间
    let background = '';//背景图片元素
    let IntervalTimer = '';
    let exist = false;
    function init() {
        //添加背景层
        initBackgroundContainer();
        //图片路径改变回调函数
        propertiesRecalls['imagedirectory'] = function(property){
            console.log('图片路径改变',property);
            window.wallpaperRequestRandomFileForProperty('imagedirectory',switchBackgroundImage)
        }
        //持续时间改变回调函数
        propertiesRecalls['timeout'] = function(property){
            timeout = property.value * 1000;
            resetTimeInterval();
        }
        //添加初始背景图片
        window.wallpaperRequestRandomFileForProperty('imagedirectory',switchBackgroundImage)
        exist = true;
    }
    //初始化背景图层
    function initBackgroundContainer(){
        background = document.createElement('background');
        background.setAttribute('id','background');
        viewer.appendChild(background);
    }
    // 重设持续时间
    function resetTimeInterval(){
        if(IntervalTimer){
            clearInterval(IntervalTimer);
        }
        IntervalTimer = setInterval(() => {
            window.wallpaperRequestRandomFileForProperty('imagedirectory',switchBackgroundImage)
        }, timeout);
    }
    //切换背景图片
    function switchBackgroundImage(propertyName,filePath) {
        let path  = "file:///" + filePath;
        let url = "url('" + path + "')";
        console.log('切换图片',url);
        let beforeImage = document.createElement('div');
        beforeImage.classList.add('beforeImage');
        beforeImage.style.backgroundImage = url;
        beforeImage.style.transition = "all 2s cubic-bezier(0.25,0.1,0.25,1)"
        beforeImage.style.opacity = '0';
        // beforeImage.style.transform = 'translate(-100%,0)';
        background.append(beforeImage);

        setTimeout(() => {
            beforeImage.style.opacity = '1';
            // beforeImage.style.transform = 'translate(0,0)';

            setTimeout(() => {
                background.style.backgroundImage = url;
                background.removeChild(beforeImage);
            }, 2000);
        }, 100);
    }
    //销毁背景图层
    function destroy(){
        if(exist){
            console.log('销毁背景图层');
            // 去除回调函数
            if(IntervalTimer){
                clearInterval(IntervalTimer);
            }
            delete propertiesRecalls.imagedirectory;
            delete propertiesRecalls.timeout;
            viewer.removeChild(background);
            exist = false;
        }
    }
    return {init,destroy}
})()

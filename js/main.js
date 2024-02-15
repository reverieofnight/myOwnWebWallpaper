window.viewer = document.querySelector('#view-container');
    window.wallpaperRegisterAudioListener(wallpaperAudioListener);
    function wallpaperAudioListener(){

    }
    window.propertiesRecalls = {};
    window.userProperties = {
        timeout:'15000',
        imagedirectory:'',
        showbackground:'',
        showclock:'',
        showvisualizer:'',
    }
    window.wallpaperSettings = {
        fps:0
    }
    window.wallpaperPropertyListener = {
        applyUserProperties:function(properties){
            console.log('用户属性改变',properties);
            setUserProperties(properties);
            let keyList = Object.keys(properties);
            if(keyList.length > 0){
                keyList.forEach((e) => {
                    let recall = window.propertiesRecalls[e]
                    if(recall && typeof recall === 'function' ){
                        recall(properties[e]);
                    }
                })
            }
            
        },
        applyGeneralProperties:function(properties){
            if(properties.fps){
                wallpaperSettings.fps = properties.fps;
            }
        }
    }
    //设置用户属性
    function setUserProperties(properties){
        for(let key in window.userProperties){
            if(properties[key]){
                window.userProperties[key] = properties[key].value;
            }
        }
    }
    //控制显示背景渲染与销毁
    propertiesRecalls['showbackground'] = function(property){
        console.log('显示背景属性改变',property);
        let value =  property.value;
        if(value === true){
            backgroundModule.init();
        } else {
            backgroundModule.destroy();
        }
        
    }
    //显示时钟
    propertiesRecalls['showclock'] = function(property){
        console.log('显示时钟属性改变',property);
        let value =  property.value;
        if(value === true){
            clockModule.init();
        } else {
            clockModule.destroy();
        }
    }
    //显示音频可视化
    propertiesRecalls['showvisualizer'] = function(property){
        console.log('音频可视化属性改变',property);
        let value =  property.value;
        if(value === true){
            visualizerModule.init();
        } else {
            visualizerModule.destroy();
        }
    }
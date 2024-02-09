window.onload = function (){
    window.viewer = document.querySelector('#view-container');
    window.propertiesRecalls = {};
    window.wallpaperPropertyListener = {
        applyUserProperties:function(properties){
            let keyList = Object.keys(properties);
            if(keyList.length > 0){
                keyList.forEach((e) => {
                    let recall = window.propertiesRecalls[e]
                    if(recall && typeof recall === 'function' ){
                        recall(properties[e]);
                    }
                })
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
}
const visualizerModule = (function(){
    function init(){
        console.log('音频可视化初始化');
    }
    function destroy(){
        console.log('销毁音频可视化');
    }
    return {init, destroy}
})()
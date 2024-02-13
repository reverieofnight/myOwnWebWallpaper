const visualizerModule = (function(){
    let visualizerLayer = '';//音频可视化层
    let canvas = '';
    let left = 0;
    let top = 0;
    let width = '100'
    let height = '100';
    let ctx = '';
    let barArr = [];
    let audioArrayCache = [];
    let audioArrayDrawCache = [];
    let musicEnd = false;
    let exist = false;
    function init(){
        console.log('音频可视化初始化');
        initLayers();
        exist = true;
        window.wallpaperRegisterAudioListener(wallpaperAudioListener);
    }
    function initLayers(){
        visualizerLayer = document.createElement('div');
        visualizerLayer.setAttribute('id','visualizer');
        visualizerLayer.style.left = left;
        visualizerLayer.style.top = top;
        visualizerLayer.style.width = width + '%';
        visualizerLayer.style.height = height + '%';
        viewer.appendChild(visualizerLayer);
        // canvas绘制
        canvas = document.createElement('canvas');
        canvas.setAttribute('id','AudioCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.opacity = '0.7';
        ctx = canvas.getContext('2d');
        visualizerLayer.appendChild(canvas);
    }
    function wallpaperAudioListener(audioArray){
        if(exist){
            if(audioArray[0] !== 0){
                if(musicEnd){
                    musicEnd = false;
                }
                if(audioArrayCache.length === 0){
                    audioArrayCache.push(audioArray);
                    requestAnimationFrame(drawBars);
                } else {
                    let middleArr = [];
                    for(let i = 0; i < audioArray.length;i++){
                       let before = audioArrayCache[audioArrayCache.length - 1][i];
                       let after = audioArray[i];
                       let middle = (before + after) / 2;
                       middleArr.push(middle);
                    }
                    audioArrayCache.push(middleArr);
                    audioArrayCache.push(audioArray);
                }
            } else if(!musicEnd){
                musicEnd = true;
                ctx.clearRect(0,0,canvas.width,canvas.height);
            }
        }
    }
    function drawBars(){
        let arr = audioArrayCache.shift();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        let barWidth = Math.round(1.0 / 128 * canvas.width);
        ctx.fillStyle = 'rgb(255,255,255)';
        for(let i = 0; i < 128; i++){
            let height = canvas.height * Math.min(arr[i],1);
            ctx.fillRect(barWidth * i,canvas.height - height,barWidth - 1,height)
        }
        if(audioArrayCache.length > 0){
            requestAnimationFrame(drawBars);
        }
    }
    function destroy(){
        console.log('销毁音频可视化');
        barArr = [];
        viewer.removeChild(visualizerLayer);
        exist = false;
    }
    return {init, destroy}
})()
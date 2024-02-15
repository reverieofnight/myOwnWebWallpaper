const visualizerModule = (function(){
    let visualizerLayer = '';//音频可视化层
    let canvas = '';
    let left = 0;
    let top = 0;
    let width = '100'
    let height = '100';
    let ctx = '';
    let musicEnd = false;
    let exist = false;
    let currentAudioArr = [];
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
                handleAudioArray(audioArray);
            } else if(!musicEnd){
                musicEnd = true;
                ctx.clearRect(0,0,canvas.width,canvas.height);
            }
        }
    }
    function handleAudioArray(audioArray){
        let arr = [];
        //合并左右声道
        for(let i = 0;i < 64; i++){
            arr.push(Math.max(audioArray[i],audioArray[i + 64]));
        }
        //扩增随机频率
        let arr2 = addRandomBars(arr,0);
        //平滑动画并输出
        smoothAudioArray(arr2);
    }
    //增加频率
    function addRandomBars(arr,time){
        if(time == 0){
            return arr;
        }
        let arr2 = [];
        for(let i = 0; i < arr.length;i++){
            let bar1 = arr[i];
            let bar3 = arr[i+1] ? arr[i+1] : Math.random() * bar1;
            let bar2 = Math.random()*(Math.abs(bar1 - bar3)) + Math.min(bar1,bar3);
            arr2.push(bar1);
            arr2.push(bar2);
        }
        time--;
        if(time > 0){
            return addRandomBars(arr2,time);
        } else {
            return arr2;
        }
    };
    //平滑动画
    function smoothAudioArray(audioArray){
        let step = 0.5;
        let trip = 0;
        if(currentAudioArr.length === 0){
            audioArray.forEach((e) => {
                currentAudioArr.push(e);
            })
        }
        while(trip < 1){
            for(let i = 0;i < audioArray.length; i++){
               if(audioArray[i] > currentAudioArr[i]){
                currentAudioArr[i] = audioArray[i]
               } else if(audioArray[i] < currentAudioArr[i]){
                let diff = audioArray[i] - currentAudioArr[i];
                currentAudioArr[i] = currentAudioArr[i] + diff * step;
               }
            }
            trip += step;
            requestAnimationFrame(drawBars(currentAudioArr));
        }
    }
    //绘制bar
    function drawBars(arr){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        let barWidth = Math.round(1.0 / arr.length * canvas.width);
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.shadowColor = 'rgba(255,255,255,0.5';
        ctx.shadowBlur = 10;
        for(let i = 0; i < arr.length; i++){
            let height = canvas.height * arr[i] * 0.5;
            ctx.fillRect(barWidth * i,canvas.height - height,barWidth - 1,height)
        } 
    }
    //销毁
    function destroy(){
        console.log('销毁音频可视化');
        viewer.removeChild(visualizerLayer);
        exist = false;
    }
    return {init, destroy}
})()
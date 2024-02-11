const clockModule = (function () {
    let exist = false;
    let clock = '';//时钟图层
    let left = 50;
    let top = 50;
    let fontFamily = 'digital';
    let color = 'white';
    let time = '';
    let timeLayer = '';
    let timeChild = {};
    let dotActive = false;
    let timeFontSize = 300;
    let dateLayer = '';
    let dateFontSize = 110;
    let yearLayer = '';
    let yearFontSize = 110;
    let timer = '';
    const zhWeekdayList = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
    ];
    const zhMonthList = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
    ]
    const enWeekdayList = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        
    ];
    const enMonthList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];


    function init() {
        console.log('初始化时钟');
        initClockLayer();
        timer = setInterval(() => {
            refreshTime();
        },1000)
        exist = true;
    }
    function initClockLayer(){
        clock = document.createElement('clock');
        clock.setAttribute('id','clock');
        clock.style.left = left + '%';
        clock.style.top = top + '%';
        clock.style.color = color;
        clock.style.fontFamily = fontFamily;
        clock.style.transform = 'translate3D(-50%,-' + (timeFontSize / 2) + 'px,0)';   
        viewer.appendChild(clock);
        timeLayer = document.createElement('div');
        timeLayer.classList.add('time');
        timeLayer.style.fontSize = timeFontSize + 'px';
        clock.appendChild(timeLayer);
        for (let index = 1; index <= 8; index++) {
            let num = timeChild['number' + index] = document.createElement('div');
            num.classList.add('number' + index);
            if(index === 3 || index === 6){
                num.classList.add('dot');
                num.style.fontSize = timeFontSize * 0.8 + 'px';
                num.style.marginTop = '-'
            } else {
                num.style.width = timeFontSize / 2 + 'px';
                num.style.textAlign = 'end';
            }
            timeLayer.appendChild(num);
        }
        dateLayer = document.createElement('span');
        dateLayer.classList.add('date');
        dateLayer.style.fontSize =  dateFontSize + 'px';
        clock.appendChild(dateLayer);
        yearLayer = document.createElement('span');
        yearLayer.classList.add('year');
        yearLayer.style.fontSize = yearFontSize + 'px';
        clock.appendChild(yearLayer);
        refreshTime();
    }
    function refreshTime(){
        let newtime = dayjs().format('HH:mm:ss');
        if(newtime !== time){
            dotActive = !dotActive;
        }
        time = newtime;
        for(let i = 1;i <= 8;i++){
            timeChild['number' + i].innerText = time.charAt(i - 1);
            if(i === 3 || i === 6){
                if(dotActive){
                    timeChild['number' + i].classList.add('active');
                } else {
                    timeChild['number' + i].classList.remove('active');
                }
            }
        }
        let weekday = enWeekdayList[dayjs().day()];
        let month = enMonthList[dayjs().month()];
        let date = dayjs().date();
        dateLayer.innerText = weekday + ',' + month + ',' + date;
        let year = dayjs().year();
        yearLayer.innerText = year;
        
        
    }
    function destroy() {
        if(exist){
            console.log('销毁时钟');
            clearInterval(timer);
            viewer.removeChild(clock);
        }
    }
    return { init, destroy }
})()
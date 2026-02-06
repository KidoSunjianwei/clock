// 数字转中文数字
const numberToString = (number) => {
    if (number.match(/\D/) || number.length >= 14) return;
    let zhArray = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']; // 数字对应中文
    let baseArray = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万']; //进位填充字符，第一位是 个位，可省略
    let string = String(number).split('').reverse().map((item, index) => { // 把数字切割成数组并倒序排列，然后进行遍历转成中文
        // 如果当前位为0，直接输出数字， 否则输出 数字 + 进位填充字符
        item = Number(item) == 0 ? zhArray[Number(item)] : zhArray[Number(item)] + baseArray[index];
        return item;
    }).reverse().join(''); // 倒叙回来数组，拼接成字符串
    string = string.replace(/^一十/, '十');  // 如果以 一十 开头，可省略一
    string = string.replace(/零+/, '零');  // 如果有多位相邻的零，只写一个即可
    return string;
}
// 获取农历
const getChineseDate = (time) => {
    let date = time ? new Date(time) : new Date();
    let dateString = date.toLocaleString('zh-CN-u-ca-chinese');
    dateString = dateString.replace(/(\d+)\s*?年/, (x, y) => {
        let result = '';
        result = "甲乙丙丁戊己庚辛壬癸".charAt((y - 4) % 10); // 天干
        result += "子丑寅卯辰巳午未申酉戌亥".charAt((y - 4) % 12); // 地支
        return result;
    });
    dateString = dateString.split(' ')[0]; // 取年月日
    let g = dateString.substr(0, 2);
    let m = dateString.substring(2, dateString.match('月').index) + '月';
    let d = dateString.match(/\d+/)[0];
    d = d < 11 ? '初' + numberToString(d) : numberToString(d);
    let animals = ["猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊"];
    let index = date.toLocaleString('zh-CN-u-ca-chinese').substr(0, 4) % 12;
    let a = animals[index] + '年';
    return {
        g, // 干支
        m, // 月
        d, // 日
        a  // 生肖
    };
}
function changeScreen() {
    const isFullScreen = document.webkitIsFullScreen || document.mozFullScreen || false;
    isFullScreen ? exitFullScreen() : fullScreen()
}
function fullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    //兼容火狐
    if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
    //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
    if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    }
    //兼容IE,只能写msRequestFullscreen
    if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
    }
}
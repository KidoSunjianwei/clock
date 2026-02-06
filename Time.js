class Time {
    state = {
        date: new Date(),
        template: '',
        chineseDate: getChineseDate()
    }
    timer = null
    componentDidMount(callback) {
        clearInterval(this.timer)
        const init = () => {
            this.state.date = new Date()
            this.state.chineseDate = getChineseDate()
            this.state.template = this.render()
            callback && callback(this.state.template)
            return true
        }
        init() && (this.timer = setInterval(init, 1000))
    }
    getLocalDate = () => {
        const { date } = this.state
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${year}年${month}月${day}日`
    }
    getWeek = (day) => {
        const weekEnum = {
            0: '星期日',
            1: '星期一',
            2: '星期二',
            3: '星期三',
            4: '星期四',
            5: '星期五',
            6: '星期六',
        }
        return weekEnum[day]
    }
    getLocaleTime = () => {
        const { date } = this.state
        const add0 = (num) => {
            num = num.toString()
            return num.length === 1 ? `0${num}` : num
        }
        let hours = date.getHours(), minute = date.getMinutes(), seconds = date.getSeconds()

        return `${add0(hours)}:${add0(minute)}`
    }
    render() {
        const { date } = this.state
        return (
            `<div class='time-wrap'>
                <h2 class='date-week'>
                    ${this.getLocalDate()}
                    &nbsp;
                    &nbsp;
                    ${this.getWeek(date.getDay())}
                </h2>
                <h4>
                    <span>${this.state.chineseDate.g}</span>&nbsp;
                    <span>${this.state.chineseDate.a}</span>&nbsp;
                    <span>${this.state.chineseDate.m}</span>
                    <span>${this.state.chineseDate.d}</span>
                </h4>
                <h1 class='time' onclick='changeScreen()'>${this.getLocaleTime()}</h1>
            </div>
            `
        )
    }
} 

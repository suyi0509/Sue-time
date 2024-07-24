import dayjs from 'dayjs';
import { observable } from 'mobx';
import Taro from '@tarojs/taro';
import { FontSizeEnum, themeEnum } from '../pages/config'


const globalStore = observable({
  theme: themeEnum.BLACK,
  timeSetting: {
    day: dayjs().format("YYYY-MM-DD"),
    hourMinute: dayjs().format("HH:mm"),
    second: dayjs().format("ss"),
    showDay: true,
    showSecond: false,
    timeSize: FontSizeEnum.normal,
    timeColor: '#fff',
    customText: ''
  },
  focuson: {
    state: 'close', // stop | run | close
    curTab: 15,//15 | 30
    time: 15// 秒
  },
  changeFocuson(key, value) {
    this.focuson[key] = value
  },
  changeFocusonObj(obj) {
    this.focuson = {
      ...this.focuson,
      ...obj
    }
  },
  getFocuson(key?: string) {
    return key ? this.focuson[key] : this.focuson
  },

  intervalFocuson() {
    let timerFocuson
    timerFocuson = setInterval(() => {
      if (this.focuson.state !== 'run') {
        clearInterval(timerFocuson)
      } else if (this.focuson.time) {
        this.changeFocuson('time', this.focuson.time - 1)
      } else {
        clearInterval(timerFocuson)
        Taro.vibrateLong();
        Taro.showModal({
          title: '番茄时间',
          content: "短暂的休息是为了更好的出发~",
          showCancel: false,
          confirmText: "我知道了",
          success: () => {
            this.changeFocusonObj({
              state: 'close',
              curTab: 15,//15 | 30
              time: 15 * 60,// 秒
            })
          }
        });
      }
    }, 1000)
  },


  changeTimeSetting(key, value) {
    if (key === 'time') {
      const parts = value.split(':')
      this.changeTimeSettingObj({
        hourMinute: `${parts[0]}:${parts[1]}`,
        second: `${parts[2]}`,
      })
    } else {
      this.timeSetting[key] = value
    }
  },

  changeTimeSettingObj(data) {
    const { time, ...other } = data
    let obj = {}
    if (time) {
      const parts = data.time.split(':')
      obj = {
        hourMinute: `${parts[0]}:${parts[1]}`,
        second: `${parts[2]}`,
      }
    }
    this.timeSetting = {
      ...this.timeSetting,
      ...other,
      ...obj,
    }
  },

  getTimeSetting(key?: string) {
    return key ? this.timeSetting[key] : this.timeSetting
  },

  changeTheme(value) {
    this.theme = value
  },

  getTheme() {
    return this.theme
  }
});

export default globalStore;

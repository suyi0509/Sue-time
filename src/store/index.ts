import dayjs from 'dayjs';
import { observable } from 'mobx';
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

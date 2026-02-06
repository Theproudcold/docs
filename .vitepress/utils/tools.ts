export const getSessionStorage = (key: string) => {
  if (typeof sessionStorage === 'undefined') return null
  return sessionStorage.getItem(key)
}

export const setSessionStorage = (key: string, value: string) => {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.setItem(key, value)
}

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const countWord = (data: string) => {
  const pattern = /[a-zA-Z0-9_\u00A0-\u02AF\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g
  const m = data.match(pattern)
  let count = 0
  if (m === null) return count
  for (let i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length
    } else {
      count += 1
    }
  }
  return count
}

export const countTransK = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num
}

export const formatDate = (time: string | Date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  const date = new Date(time)
  const o: { [key: string]: number } = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k].toString()) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

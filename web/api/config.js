import { getCookie } from '@/utils/cookie'
// 服务端接口地址
// eslint-disable-next-line
const APIS = {
  development: {
    authBase: '//127.0.0.1:3000/api/auth',
    photoBase: '//127.0.0.1:3000/api/photo'
  },
  production: {
    // authBase: '//bit2.cool/api/auth',
    // photoBase: '///bit2.cool/api/photo'
    authBase: '//152.136.253.151:999/api/auth',
    photoBase: '//152.136.253.151:999/api/photo'
  }
}

export const BASE_URL = APIS[process.env.NODE_ENV]
export const HEADERS = () => {
  return {
    Authorization: 'Bearer ' + getCookie('token'),
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
}

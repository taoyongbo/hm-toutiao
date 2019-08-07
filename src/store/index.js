const KEY = 'toutiao-user'
export default {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
    // alert(1)
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

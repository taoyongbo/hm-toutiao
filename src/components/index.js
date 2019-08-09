import MyBread from '@/components/my-bread'
import MyChinnel from '@/components/my-chinnel'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChinnel.name, MyChinnel)
  }
}

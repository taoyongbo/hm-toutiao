import MyBread from '@/components/my-bread'
import MyChinnel from '@/components/my-chinnel'
import MyImage from '@/components/my-image'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChinnel.name, MyChinnel)
    Vue.component(MyImage.name, MyImage)
  }
}

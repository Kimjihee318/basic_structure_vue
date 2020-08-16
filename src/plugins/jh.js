import Vue from 'vue'
import LibComponents from '@/lib'

// * 플러그인은 일반적으로 Vue에 글로벌 수준의 기능을 추가합니다.
var Jh = {
  // * install은 가능한 옵션과 함께 첫 번째 인수로 Vue 생성자를 사용하여 호출됩니다
  // ref. ex | MyPlugin.install = function (Vue, options) {}
  // vue plugin 정리 https://vuejs-kr.github.io/jekyll/update/2017/01/13/vuejs-plugin/
  install: function install(_vue) {
    // * _vue = Vue
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}

    if (this.installed) return
    this.installed = true

    if (Vue !== _vue) {
      console.log('Multiple instances of Vue detected.')
      return
    }

    // * add an instance method
    _vue.prototype.$jin = new _vue()
    ;(function registerComponents(components) {
      // console.log(components)

      if (components) {
        for (var key in components) {
          // console.log(`components's key: %s`, key)
          var component = components[key]
          // console.log('innerRegisterComponent ', key, component);
          // if (component && !registerComponents(component.$_vuetify_subcomponents)) {
          Vue.component(key, component)
          // }
        }
        return true
      }
      return false
    })(opts.components) // * 아래 components: { ... }
  },
  version: 'jihee-0.0.1'
}

// * Vue.use() 글로벌 메소드를 호출하여 플러그인을 사용합니다.
// * 이것은 new Vue()를 호출하여 응용 프로그램을 시작하기 전에 수행해야합니다.
// ref | Vue.use(MyPlugin, { someOption: true })
Vue.use(Jh, {
  components: {
    ...LibComponents
  }
})

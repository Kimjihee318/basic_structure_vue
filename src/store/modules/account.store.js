// import __C from '@/primitives/_constants_'
// import __F from '@/primitives/_function_'

// let ACCOUNT = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
export default {
  namespaced: true,
  state: {},
  mutations: {
    reset(state) {
      state.buidingNames = []
      state.buidingNums = []
      state.email = ''
      state.permission = null
      state.token = ''
      state.user = ''
      state.userInfo = {
        address: '',
        buildingname: '',
        buildingno: '',
        floor: '',
        maxunitno: '',
        maxfloor: '',
        unit: ''
      }
      state.userInfoIdx = ''
    }
  },
  actions: {}
}

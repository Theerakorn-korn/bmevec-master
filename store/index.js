import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      loginuser: {}
    },
    mutations: {
      increment (state) {
        state.counter++
      },
      getLoginUser(state, user){
          state.loginuser = JSON.parse(JSON.stringify(user))
      }
    }
  })
}

export default createStore
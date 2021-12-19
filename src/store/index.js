import { createStore } from 'vuex';
import axios from 'axios';

const url = 'http://localhost:3123/';

export default createStore({
  state: {
    users: null
  },

  getters: {
    getUsers: state => {
      return state.users;
    },
  },

  mutations: {
    setUsers: (state, payload) => {
      state.users = payload;
    },
    addUser: (state, payload) => {
      state.users.push(payload);
    },
    removeUser: (state, payload) => {
      let index = state.users.indexOf(payload);
      state.users.splice(index, 1);
    },
  },

  actions: {
    getUsers: async (context) => {
      let {data} = await axios.get(url);
      context.commit('setUsers', data);
    },

    addUser: async (context, payload) => {
      let {data} = await axios.post(url, payload);
      context.commit('addUser', data);
    },

    updateUser: async (context, payload) => {
      let uuid = payload.uuid;
      axios.put(url + uuid, payload);
    },

    removeUser: async (context, payload) => {
      let uuid = payload.uuid;
      axios.delete(url + uuid, payload)  
      .then(() => {
        context.commit('removeUser', payload);
      });
    },
  },

})

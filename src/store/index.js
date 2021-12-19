import { createStore } from 'vuex';
import axios from 'axios';

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
      let {data} = await axios.get('http://localhost:3123/');
      context.commit('setUsers', data);
    },

    addUser: async (context, payload) => {
      let {data} = await axios.post('http://localhost:3123/', payload);
      context.commit('addUser', data);
    },

    updateUser: async (context, payload) => {
      let uuid = payload.uuid;
      axios.put(`http://localhost:3123/${uuid}`, payload);
    },

    removeUser: async (context, payload) => {
      let uuid = payload.uuid;
      axios.delete(`http://localhost:3123/${uuid}`, payload)      
      .then(() => {
        context.commit('removeUser', payload);
      });
    },
  },

})

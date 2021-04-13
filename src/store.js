import Vuex from "vuex";
import axios from "@/axios";

export default (Vue) => {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {
            token: ""
        },
        mutations: {
            SET_TOKEN(token) {
                this.token = token;
            }
        },
        getters: {
            getToken: state => {
                return state.token;
            }
        },
        actions: {
            login: ({commit}, {email, password}) => {
                return axios.postUrl("/user/login", {
                    email,
                    password
                }).then(response => {
                    const {token} = response.data;
                    commit("SET_TOKEN", token);
                    localStorage.setItem("trvl-jwt", token);
                })
            },
            checkAuth: ({commit}) => {
                const token = localStorage.getItem("trvl-jwt");
                commit("SET_TOKEN", token);
            }
        }
    });

}

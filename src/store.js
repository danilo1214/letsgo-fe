import Vuex from "vuex";
import axios from "@/axios";

console.log(axios);
export default (Vue) => {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {
            token: ""
        },
        mutations: {
            SET_TOKEN(token) {
                this.token = token;
            },
            SET_USER(user) {
                this.user = user;
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
                axios.setToken(token);
                return axios.getUrl("/user/authenticate").then(result => {
                    const {data} = result;

                    commit("SET_USER", data);
                    commit("SET_TOKEN", token);
                }).catch(err=>{
                    console.log(err);

                    commit("SET_USER", null);
                    commit("SET_TOKEN", null);
                })
            }
        }
    });

}

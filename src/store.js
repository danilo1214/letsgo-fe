import Vuex from "vuex";
import axios from "@/axios";

console.log(axios);
export default (Vue) => {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {
            token: "",
            user: null
        },
        mutations: {
            SET_TOKEN(state,token) {
                state.token = token;
            },
            SET_USER(state,user) {
                state.user = user;
            }
        },
        getters: {
            loggedIn: state => {
                return !!state.token;
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
                    return token;
                }).catch(err=>{
                    throw err;
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
                    console.log(err.message);

                    commit("SET_USER", null);
                    commit("SET_TOKEN", null);
                })
            }
        }
    });

}

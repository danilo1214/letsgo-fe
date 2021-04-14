import axios from "axios";

export default class Axios {
    constructor(options) {
        this.instance = axios.create(options);
    }

    getUrl(path){
        return this.instance.get(path);
    }

    postUrl(path, data) {
        return this.instance.post(path, data);
    }

    setToken(token){
        this.instance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }


}

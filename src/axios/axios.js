import axios from "axios";

export default class Axios {
    constructor(options) {
        this.instance = axios.create(options);
    }

    getUrl(path, options){
        console.log(options);
        return this.instance.get(path, {
            ...options
        });
    }

    postUrl(path, data) {
        return this.instance.post(path, data);
    }

    setToken(token){
        this.instance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }


}

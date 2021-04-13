import axios from "axios";

export default class Axios {
    constructor(options) {
        this.instance = axios.create(options);
    }

    getUrl(path, options){
        return this.instance.get(path, options);
    }

    postUrl(path, data, options) {
        return this.instance.post(path, data, options);
    }
}

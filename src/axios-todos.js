import axios from "axios";

const instance = axios.create({
    baseURL: "https://simple-todo-7f88d.firebaseio.com",
    headers: {"Content-Type": "application/json"}
})

export default instance
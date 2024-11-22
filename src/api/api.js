import axios from "axios";
let api=axios.create({
  baseURL:"http://localhost:8000"  
})
api.interceptors.request.use((config)=>{
    console.log(config)
    return config
},(err)=>{
    return Promise.reject(err) 
})
api.interceptors.response.use((response)=>{
    console.log(response)
    return response
},(err)=>{
    return Promise.reject(err) 
})
export default api
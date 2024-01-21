import {create} from 'zustand';

export const useProbability = create((set) => ({
    probability: "",
    setProbability: (chance) => set({ probability: chance })
}))

export const useStatistics = create((set) => ({
    temperature: "",
    wind_direction: "",
    wind_speed: "",
    humidity: "",
    precipitation: "",
    coordinates: "",

    setStatistics: (statistic) => set({
        temperature: statistic.temperature,
        wind_direction: statistic.wind_dir,
        wind_speed: statistic.wind_speed,
        humidity: statistic.humidity,
        precipitation: statistic.precip,
        latitude: statistic.latitude,
        longitude: statistic.longitude
    })
}))

export const useToast = create((set)=>({
    message:"",
    type : "",
    setToast:(toast)=>{set({
        message:toast.message,
        type:toast.type
    })},
    clearToast :()=>{set({
       message:"",
       type: ""
    })}
}))

export const useTutorial = create((set)=>({
    path:"",
    setPath:(path_tutorial)=>{set({
        path:path_tutorial
    })}
}))

export const useUser = create((set)=>({
    contact:"",
    setUser :(contac)=>{set({
        contact:contac
    })}
}))

export const useLogin = create((set)=>({
    status:true,
    toggleLogin:()=>{set((state)=>({status:!state.status}))}
}))

export const useOTP = create((set)=>({
    otp_status:false,
    toggleOTP:()=>{set((state)=>({otp_status:!state.otp_status}))}
}))

export const usePage = create((set)=>({
    page:"home",
    changePage:(input)=>{set({page:input})}
}))

export const useAuthentication =create((set)=>({
    authentication:false,
    toggleAuthentication:()=>{set((state)=>({authentication:!state.authentication}))}
}))
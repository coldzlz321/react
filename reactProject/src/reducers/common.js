import {
    SHOW_LOADING,
    HIDE_LOADING
} from "@/constants/actionTypes"

inititalStates = {
    loading:true
}

export default function (state = inititalStates,action){
    switch(action.type){
        case SHOW_LOADING:
            return {...state,loading:true};
        case HIDE_LOADING:
            return {...state,loading:false};
        default:
            return state
    }
}
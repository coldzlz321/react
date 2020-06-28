import {
    SHOW_LOADING,
    HIDE_LOADING
}from "@/constants/actionTypes"

export const showLoading = (params,resolved,rejected) => ({
        type:SHOW_LOADING,
        payload:params,
        meta:{resolved,rejected}
}) 

export const hideLoading = (params,resolved,rejected) => ({
    type:HIDE_LOADING,
    payload:params,
    meta:{resolved,rejected}
})
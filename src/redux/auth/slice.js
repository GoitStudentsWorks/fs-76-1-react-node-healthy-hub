import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginThunk, registrationThunk, logOutThunk, refreshThunk, updateGoalThunk, updateWeightThunk, updateProfile, updateProfileThunk } from "./operations";

const initialState = {
    user: { 
        name: null, 
        email: null,
        goal:'',
        age:null,
        height:null,
        avatarUrl:'',
        gender:'Male',
        weight:null, 
        activity: '1.2'
    },
    token: null,
    isLoading: false,
    error:null,
    dateLastWeight:null,
}

const handlePending = (state) => {
    state.isLoading = true;
}

const handleFulfild = (state) => {
    state.isLoading = false;
    state.error = null;
}

const handleFulfildReg = (state, action) => {
    handleFulfild(state)
    state.user = {...state.user, ...action.payload.user};
    state.token = action.payload.token;
}

const handleFulfildLogIn = (state, action) => {
    handleFulfild(state);
    state.user = {...state.user, ...action.payload.user};
    state.token = action.payload.token;
}

const handleFulfildLogOut = (state) => {
    handleFulfild(state)
    state.user = initialState.user;
    state.token = null;
}

const handleFulfildRefresh = (state, action) => {
    handleFulfild(state)
    state.user = action.payload;
}

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error=action.payload
}

const handleFulfildUpdateGoal=(state, action)=>{
    handleFulfild(state);
    // data:{goal:'lose fat'}
    state.user = {...state.user, ...action.payload.data};
}

const handleFulfildUpdateWeight=(state, action)=>{
    handleFulfild(state);
    // data:{date:'22.10.2023', weight: 67}
    state.user = {...state.user, ...action.payload.data.weight};
    state.dateLastWeight=action.payload.data.date;
}

const handleFulfildUpdateProfile=(state, action)=>{
    handleFulfild(state);
    // {profileInfo:{name:'Alex', age:23, height:176, avatarUrl:'http...', gender: 'male', activity: 1.2},
    // weightInfo:{weight:76, date:'22.11.2022'}
    // }
    state.user = {...state.user, ...action.payload.data.profileInfo};
    if(action.payload.data.weightInfo){
        state.dateLastWeight=action.payload.data.weightInfo.date;
        state.user.weight=action.payload.data.weightInfo.weight;
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registrationThunk.fulfilled, handleFulfildReg)
            .addCase(loginThunk.fulfilled, handleFulfildLogIn)
            .addCase(logOutThunk.fulfilled, handleFulfildLogOut)
            .addCase(logOutThunk.rejected, (state, action) => {
                state.user = initialState.user;
                state.token = null;
                handleRejected()
            })
            .addCase(refreshThunk.fulfilled, handleFulfildRefresh)
            .addCase(updateGoalThunk.fulfilled, handleFulfildUpdateGoal)
            .addCase(updateWeightThunk.fulfilled, handleFulfildUpdateWeight)
            .addCase(updateProfileThunk.fulfilled, handleFulfildUpdateProfile)
            .addMatcher(isAnyOf(registrationThunk.pending, loginThunk.pending, logOutThunk.pending, refreshThunk.pending, updateGoalThunk.pending, updateWeightThunk.pending, updateProfileThunk.pending), handlePending)
            .addMatcher(isAnyOf(registrationThunk.rejected,loginThunk.rejected,refreshThunk.rejected, updateGoalThunk.rejected, updateWeightThunk.rejected, updateProfileThunk.rejected), handleRejected)
    }
})
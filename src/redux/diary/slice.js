import { createSlice } from "@reduxjs/toolkit";
import { fetchFoodIntake, postFoodIntake, updateFoodIntake } from "./operations";

const initialState={
    food:{
        breakfast:[],
        lunch:[],
        dinner:[],
        snack:[],
    },
    totalCalories:0,
    isLoading: false,
    error:null,
}


const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error=action.payload
}

const handlePending = (state) => {
    state.isLoading = true;
}

const handleFulfildGet = (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.food.breakfast=action.payload.data.userProducts.breakfast;
    state.food.lunch=action.payload.data.userProducts.lunch;
    state.food.dinner=action.payload.data.userProducts.dinner;
    state.food.snack=action.payload.data.userProducts.snack;
    state.totalCalories=action.payload.data.userProducts.totalCalories;
}

const handleFulfildPost = (state, action) => {
    state.isLoading = false;
    state.error = null;
    const type=action.payload.data.type;
    state.food[type]=[...state.food[type], ...action.payload.data.product]
    // state.totalCalories=action.payload.data.totalCalories;
}

const handleFulfildUpdate = (state, action) => {
    state.isLoading = false;
    state.error = null;
    // {dinner:{name:', id} }
    // const type=action.payload.type;
    // const indexOfFood=state.food[type].findIndex(item=>item.id===action.payload.product.id);
    // state.food[type][indexOfFood]=action.payload.product;
    // state.totalCalories=action.payload.totalCalories;
}

export const foodIntakeSlice = createSlice({
    name: 'foodIntake',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFoodIntake.fulfilled, handleFulfildGet)
            .addCase(fetchFoodIntake.pending, handlePending)
            .addCase(fetchFoodIntake.rejected, handleRejected)
            .addCase(postFoodIntake.fulfilled, handleFulfildPost) 
            .addCase(postFoodIntake.pending, handlePending)
            .addCase(postFoodIntake.rejected, handleRejected)
            .addCase(updateFoodIntake.fulfilled, handleFulfildUpdate) 
            .addCase(updateFoodIntake.pending, handlePending)
            .addCase(updateFoodIntake.rejected, handleRejected)
    }
})

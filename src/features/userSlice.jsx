import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice ({
    name : 'user',
    initialState :{
        selectedItem:[],
        correctAnswer:[],
        score : 0,
        index : 0,
        currentStep : 1
    },
    reducers :{
        selectedData : (state,action) =>{
            state.selectedItem.push(action.payload)
        },
        correctedAnswer : (state,action)=>{
            state.correctAnswer=action.payload
        },
        scored : (state,action)=>{
            state.score=action.payload
        },
        prevClick:(state)=>{
            state.selectedItem.pop()
        },
        currentSteped : (state,acton) =>{
            state.currentStep= acton.payload
        },
        indexed : (state,action)=>{
            state.index=action.payload
        }
    }
})

export const {selectedData,correctedAnswer,scored,currentSteped,indexed,prevClick} =userSlice.actions;
export default userSlice.reducer
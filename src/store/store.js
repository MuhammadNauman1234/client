import { configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { useState, } from "react";
import axios from "axios";


const initialState = {
    msg:"",
    user:"",
    token:"",
    loading:false,
    error:"",
}

// post signup data
export const signUpUser = createAsyncThunk('signupuser', async(body)=>{
    const res = await axios.post("/signup",{
                name:body.name,
                email:body.email,
                phone:body.phone,
                category : body.category,
                password:body.password,
                confirmPassword: body.confirmPassword

                });
        return await res;
})

//post login data
export const logInUser = createAsyncThunk('loginuser', async(body)=>{
    const res = await axios.post("/login",{
            email:body.email,
            password:body.password,

            })
        return await res;  
})

const  signUpSlice = createSlice({
    name : "signUp",
    initialState,
    reducers: {
            addUser : (state,action)=>{
                    state.user =localStorage.getItem("user");
                },
            addToken : (state,action)=>{
                state.token = localStorage.getItem("token")
            },
            logout: (state,action)=>{
                state.token=localStorage.removeItem("token");
            }
    },
    extraReducers:{
        //***********************************Sign Up*******************************/
        [signUpUser.pending]: (state,action)=>{
            state.pending = true
        },
        [signUpUser.fulfilled]: (state,{payload:{error,data}})=>{
            state.loading = false
            if(error){
                state.error = error
            }
            else{
                state.msg = data.message;
            }
        },
        [signUpUser.rejected]: (state,action)=>{
            state.loading = true
        },
        
        //***********************************Log In*******************************/
        [logInUser.pending]: (state,action)=>{
            state.pending = true
        },
        [logInUser.fulfilled]: (state,{payload:{error,data}})=>{
            state.loading = false
            if(error){
                state.error = error
            }
            else{
                if(data.status){
                    state.msg = data.token
                }
                // else{
                //     state.user = data.user;
                //     state.token = data.token;
                //     localStorage.setItem("user",data.user);
                //     localStorage.setItem("token",data.token)
                // }
                
            }
        },
        [logInUser.rejected]: (state,action)=>{
            state.loading = true
        }
    }
})


// export const { increment } = counterSlice.actions;
// export const { login } = userSlice.actions;
export const { addMessage, addUser, logout, addToken } = signUpSlice.actions

export const store = configureStore({
    reducer: {
        // counter: counterSlice.reducer,
        // user: userSlice.reducer,
        signUp: signUpSlice.reducer

    }
})
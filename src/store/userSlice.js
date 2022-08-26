import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : {name: 'kim', age: 20} ,
  reducers: {
      changeName(state){
        state.name = 'park' //store의 state 변경하는 법
      },
      increase(state, action){
        state.age += action.payload
      }
  }
})

export default user
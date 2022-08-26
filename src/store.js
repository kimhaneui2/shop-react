import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2,},
        {id : 1, name : 'Grey Yordan', count : 1}
      ],
    reducers: {
    countIncrease(state, action){
        state[action.payload].count++
    },
    addItem(state, action){
        state.push(action.payload)
    }
}
  })


let data = [
  {
    id : 0,
    title : "White and Black",
    content : "Born in France",
    price : 120000,
    url: "https://codingapple1.github.io/shop/shoes1.jpg"
  },

  {
    id : 1,
    title : "Red Knit",
    content : "Born in Seoul",
    price : 110000,
    url: "https://codingapple1.github.io/shop/shoes2.jpg"
  },

  {
    id : 2,
    title : "Grey Yordan",
    content : "Born in the States",
    price : 130000,
    url: "https://codingapple1.github.io/shop/shoes3.jpg"
  }
] 

  
export let {changeName, increase} =  user.actions;
export let {countIncrease, addItem} = cart.actions;
export let info = data;
export default configureStore({
  reducer: {
    user : user.reducer,
    cart: cart.reducer
  }
})    
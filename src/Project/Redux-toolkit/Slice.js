import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    carditem :[],
    totalprice :0
}

const Slice = createSlice(
    {
        name : "Slice",
        initialState,
        reducers : {
            increment : (state,action)=>{
               state.carditem.push(action.payload)
               const pricearray = state.carditem.map((item)=>{
                return item.productPrice;
               })
               state.totalprice = pricearray.reduce((a,b)=>a+b)
            },
            decrement : (state,action)=>{
                const index = state.carditem.findIndex((item)=>item.productname === action.payload.productname)
                if(index>-1){
                    state.carditem.splice(index,1)
                }
                if(state.carditem.length){
                    const pricearray = state.carditem.map((item)=>{
                        return item.productPrice;
                       })
                       state.totalprice = pricearray.reduce((a,b)=>a+b)
                }else{
                    state.totalprice = 0
                }
                
               
                
             }
        }
    }
)

export const {increment , decrement} = Slice.actions

export default Slice.reducer;
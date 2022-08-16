import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";
const store = configureStore({
    reducer : {
        cartreducer : Slice
    }
})

export default store;
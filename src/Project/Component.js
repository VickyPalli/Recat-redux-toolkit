import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';
import "./style.css"
import Modal from 'react-bootstrap/Modal';
import {increment , decrement} from "./Redux-toolkit/Slice";
import { useSelector ,useDispatch } from 'react-redux';
const Component = () => {
    const showperpage = 10;
    const products = useSelector((state)=>state.cartreducer.carditem)
    const TotalPrice = useSelector((state)=> state.cartreducer.totalprice)
    const dispatch = useDispatch()
    const [pagenation , setpagenation] = useState({
        start : 0,
        end : showperpage
    })
    const [alldata,setalldata]=useState([])
    const [data,setdata] = useState([])
    const [get,setget] = useState(true)
    const [show, setshow] = useState(false)
    const [pop,setpop] = useState({})
    const handleShow = () => setshow(true);
  const handleClose = () => setshow(false);
    useEffect(()=>{
     axios.get("https://fakestoreapi.com/products").then((data)=>{
      setdata(data.data)
      setalldata(data.data)
     })
    },[get])
    const onPaginationChange = (start,end)=>{
        setpagenation({start : start,end : end})
    }
    const selecthandler = (e)=>{
      if(e.target.value==="all"){
         setget(!get)
      }else{
        const newdata = alldata.filter((item)=>{
          return item.category.includes(e.target.value)
         })
         setdata(newdata)
      }
    }
    const popuphandle = (item)=>{
      setpop(item)
      handleShow()
    }
    const popupclose = ()=>{
      handleClose()
    }
  return (
    <div>
      <div className='header'>
        <h1>Available Products</h1>
        <div>
        <button type="button" className="btn btn-primary m-3" >CardItems {products.length}</button>
        <button type="button" className="btn btn-primary ">TotalPrice {TotalPrice}</button>
        </div>
        
      </div>
      <div className='select'>
              <select onChange={(e)=>selecthandler(e)}>
              <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="men" >men's clothing</option>
                <option value="jewelery" >jewelery</option>
                <option value="women">women's clothing</option>
              </select>
      </div>
      <div className='main-body'>
        {data.slice(pagenation.start , pagenation.end).map((item,idx)=>{
            return (
              <div key={idx} className="imagesection" >
                <img src={item.image} onClick={()=>popuphandle(item)}/>
                <div>
                <button type="button" className="btn btn-primary m-3" onClick={()=>{
                  dispatch(increment(
                    {
                      productname : item.title,
                      productPrice : item.price
                    }
                  ))
                }}>Add Cart</button>
                <button type="button" className="btn btn-primary m-3"
                onClick={()=>{
                  dispatch(decrement(
                    {
                      productname : item.title
                    }
                  ))
                }}
                >Remove</button>
                </div>
              </div>
            )
        })}
      </div>
      <div className='pagenation'>
        <Pagination showPerPage ={showperpage} total = {data.length} onPaginationChange = {onPaginationChange}/>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} centered
          style={{ marginLeft: "40%", marginTop: "10%", width: "500px", height: "400px", lineHeight: "25px", textAlign: "center" }}>
          <Modal.Body>
             <div>
               <div className='heading'>
                <span>{pop.category}</span>
                <button onClick={()=>popupclose()}>Close</button>
               </div>
               <div className='modalbody'>
                <img src={pop.image}/>
                <span style={{"textAlign":"left","marginLeft":"20px"}}> <span style={{"fontWeight":"bold"}}>Desricption :</span> {pop.description}</span>
               </div>
             </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default Component

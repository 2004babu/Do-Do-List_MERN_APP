import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDoDO, getallDoDo } from "../../Actions/DoDoActions";
import List from "./List";
import { clearDoDoDeleted, clearError } from "../../Slice/DoDoSlice";
import { toast } from "react-toastify";

const DoDoList = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  
  const { isAuthenticatedUser = null } = useSelector(
    (State) => State.authState
  );

  
  const {
    DoDo: dodostate = [],
    loading = false,
    isDoDoDeleted = null,
    error = null,
    isDoDoUpdated = false,
    isDoDoCreated = false,
  } = useSelector((State) => State.DoDoState);

  let filtered;

  const isNotFound = search.length ? true : false;

  filtered = dodostate;
  if (search) {
    filtered = dodostate.filter((item) => {
      if (
        item.Data.title.toLowerCase().includes(search.toLowerCase()) ||
        item.Data.subject.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    });
  }
  console.log(filtered);
  console.log(isNotFound);
  const hashSync=()=>{
    console.log('s,kbsdl');
  }
  useEffect(() => {
    if (isDoDoDeleted) {
      toast('Delete success',{type:'success',onOpen:()=>{
        dispatch(clearDoDoDeleted())

      }})
    }
    if(error){
      toast(error,{type:'error',onOpen:()=>{
        dispatch(clearError())
        
      }})
    }
    
    dispatch(getallDoDo);
  }, [dispatch, isAuthenticatedUser,error,isDoDoDeleted]);
  return (
    <Fragment>
      <div className="nav-dodo">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />
        
      </div>
      <Fragment>
        <table border={3} className=" table  table-bordered table-hover ">
          <tr>
            <th>Title</th>
            <th>subject</th>
            <th>CreateAt</th>
            <th>Edit/Delete</th>
          </tr>

          {filtered.length ? (
            filtered.map((item) => <List key={item._id} item={item} />)
          ):null }
          
              
          
        </table>
            <div className="flex-colum" id="createdodo"><button  className="btn-green">
            <Link to={"/createdodo"} >Add DoDo</Link>
          </button ></div>
      </Fragment>
    </Fragment>
  );
};

export default DoDoList;

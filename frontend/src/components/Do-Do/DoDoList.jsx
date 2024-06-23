import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getallDoDo } from "../../Actions/DoDoActions";
import List from "./List";
import { clearDoDoDeleted, clearError } from "../../Slice/DoDoSlice";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";
import LocalUserIntro from "../user/LocalUserIntro";

const DoDoList = () => {
  const [search, setSearch] = useState("");
  const [dodoItem, setDodoItem] = useState([]);
  const dispatch = useDispatch();
  const l_item = localStorage.getItem("dodo-app-babu")
    ? JSON.parse(localStorage.getItem("dodo-app-babu"))
    : [];

    console.log(l_item);
    const [wantReferesh,setwantReferesh] =useState(true)
  const {
    isAuthenticatedUser = null,
    isLocalUser = null,
    loading = null,
  } = useSelector((State) => State.authState);
  const navigate = useNavigate();

  const {
    DoDo: dodostate = [],
    isDoDoDeleted = null,
    error = null,
    isDoDoUpdated = false,
  } = useSelector((State) => State.DoDoState);

  
  
  useEffect(() => {
    let filtered;
    if (search) {
      filtered = (isAuthenticatedUser ? dodostate : l_item).filter((item) => {
        return (
          item.Data.title.toLowerCase().includes(search.toLowerCase()) ||
          item.Data.subject.toLowerCase().includes(search.toLowerCase())
        );
      });
     if(filtered.length){ setDodoItem([...filtered]);}
     console.log('true');
     return
    } else {
      console.log('else');
      setDodoItem(isAuthenticatedUser ? dodostate : l_item);
      return
    }
  }, [search, isAuthenticatedUser,isLocalUser,dodostate,wantReferesh]);
  
  useEffect(()=>{
    console.log(dodoItem);
    console.log(l_item);
  },[l_item,wantReferesh])

  useEffect(() => {
    if (isDoDoDeleted) {
      toast("Delete success", {
        type: "success",
        onOpen: () => {
          dispatch(clearDoDoDeleted());
        },
      });
    }
    if (isAuthenticatedUser) {
      dispatch(getallDoDo);
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
    }
  }, [
    dispatch,
    error,
    isDoDoDeleted,
    isAuthenticatedUser,
    isDoDoUpdated,
    navigate,
  ]);

  return (
    <Fragment>
      {!isAuthenticatedUser && !isLocalUser && <LocalUserIntro />}
      <MetaData title={"DoDoList"} />
      {(isAuthenticatedUser || isLocalUser) && dodoItem.length ? (
        <Fragment>
          <div className="input-gruop">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
            />
            <div className="flex-colum" id="createdodo">
              <button className="btn-green btn">
                <Link to={"/createdodo"}>Add DoDo</Link>
              </button>
            </div>
          </div>
          {(isAuthenticatedUser || isLocalUser) && dodoItem.length ? (
            <table
              border={2}
              className=" table table-striped table-hover table-bordered  mt-2"
            >
              <thead>
                <tr className="table-dark">
                  <th className="col text-center">Title</th>
                  <th className="col text-center">subject</th>
                  <th className="col text-center">CreateAt</th>
                  <th className="col text-center">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {dodoItem.map((item) => (
                <List key={item._id ? item._id : item.id} item={item} wantReferesh={wantReferesh} setwantReferesh={setwantReferesh}/>
                ))}
              </tbody>
            </table>
          ) : null}
        </Fragment>
      ) : (
        <div className="flex-colum" id="createdodo">
          <button className="btn-green btn">
            <Link to={"/createdodo"}>Add DoDo</Link>
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default DoDoList;

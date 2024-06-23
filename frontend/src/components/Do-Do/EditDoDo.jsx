import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDoDoUpdate, clearError } from "../../Slice/DoDoSlice";
import { getSingleDoDo, updateDoDo } from "../../Actions/DoDoActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";

const EditDoDo = () => {
  const l_item = localStorage.getItem("dodo-app-babu")
    ? JSON.parse(localStorage.getItem("dodo-app-babu"))
    : [];
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isAuthenticatedUser = null, isLocalUser = null } = useSelector(
    (State) => State.authState
  );

  const {
    DoDo: dodostate = [],
    loading = false,

    error = null,
    isDoDoUpdated = false,
  } = useSelector((State) => State.DoDoState);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticatedUser) {
      const info = {
        Data: {
          title,
          subject,
        },
        DoDoId: id,
      };
      dispatch(updateDoDo(info));
    } else {
      
      let filtered = l_item.map((item) => {
        if (Number(item.id) === Number(id)) {
          item.Data.title = title;
          item.Data.subject=subject;
        }
        return item
      });
      console.log(filtered);
      localStorage.setItem('dodo-app-babu',JSON.stringify(filtered))
      navigate('/')
    }
  };
  useEffect(() => {
    if (isDoDoUpdated) {
      toast("updated  success", {
        type: "success",
        onOpen: () => {
          dispatch(clearDoDoUpdate());
          navigate("/");
        },
      });
      return;
    }
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    if (!isDoDoUpdated&&isAuthenticatedUser) {
      dispatch(getSingleDoDo(id));
      return;
    }
  }, [dispatch, isAuthenticatedUser, isDoDoUpdated, error, id, navigate]);

  useEffect(() => {
    if (dodostate.Data) {
      setSubject(dodostate.Data.subject);
      setTitle(dodostate.Data.title);
      return;
    }else if(isLocalUser&&l_item.length){

     const filtered= l_item.filter(item=>{
       return Number(item.id)===Number(id)
        })
        console.log(filtered);
        if (filtered.length) { 
          setSubject(filtered[0].Data.subject)
          setTitle(filtered[0].Data.title)
        }
    }
  }, [dodostate,isLocalUser,isAuthenticatedUser]);

  return (
    <Fragment>
      <MetaData title={"EditDodo"} />
      <form
        action="#"
        className=" container-fluid col-sm-8 col-md-6 col-lg-4 mb-4 shadow p-3 mb-5 bg-body-tertiary rounded"
        onSubmit={handleSubmit}
      >
        <h2>Edit DoDo </h2>
        <div className=" mb-4">
          <label htmlFor="title" className=" mb-2">
            tilte
          </label>
          <input
            type="text"
            id="title"
            className="form-control "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className=" mb-3">
          <label htmlFor="subject" className="form-label">
            subject
          </label>
          <textarea
            cols={6}
            type="text"
            rows={10}
            id="subject"
            className="form-control "
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></textarea>
        </div>
        <div className="data-group justify-cotent-center ">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary p-10 mt-3 "
          >
            Save Changes
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default EditDoDo;

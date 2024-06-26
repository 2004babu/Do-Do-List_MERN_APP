import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDoDo } from "../../Actions/DoDoActions";
import { clearDoDoCreated, clearError } from "../../Slice/DoDoSlice";
import { toast } from "react-toastify";
const CreateDoDo = () => {
  const l_item = localStorage.getItem("dodo-app-babu")
    ? JSON.parse(localStorage.getItem("dodo-app-babu"))
    : [];
  const disaptch = useDispatch();
  const navigate = useNavigate();
  const {
    loading = false,
    error = null,
    isDoDoCreated = false,
   
  } = useSelector((State) => State.DoDoState);
  const {
    isAuthenticatedUser = null,
    isLocalUser = null,
    
  } = useSelector((State) => State.authState);
  const [title, setTitle] = useState("");
  const [DoDo, setDoDo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  

    if (!title || !DoDo) {
      toast("Fill The DoDo Value", { type: "error" });
      return;
    }
    if (isAuthenticatedUser) {
      const data = {
        title,
        subject: DoDo,
      };
      disaptch(createDoDo(data));
      
    } else {
      
      const sendData = {
        Data:{
          title,
        subject: DoDo,
        },
        cretaAt: new Date().toLocaleString(),
        id:l_item.length?l_item[l_item.length-1].id+1:1
      };
      l_item.push(sendData);
      localStorage.setItem("dodo-app-babu", JSON.stringify(l_item));
      navigate('/')
    }
  };

  useEffect(() => {
    if (isDoDoCreated) {
      toast("DoDo created success", {
        type: "success",
        onOpen: () => {
          disaptch(clearDoDoCreated());
        },
      });
      navigate("/");
    }
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          disaptch(clearError());
        },
      });
    }
  }, [isDoDoCreated, error, disaptch, navigate]);
  return (
    <Fragment>
      <MetaData title={"Create DoDo "} />

      <form
        action="#"
        className="d-flex row  mt-4 p-4 col-lg-4 justify-content-lg-center shadow p-3 mb-5 bg-body-tertiary rounded
        "
        onSubmit={handleSubmit}
      >
        <h1 className="mb-3 text-center">Create DoDo</h1>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control mb-2"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title">tittle</label>
        </div>
        <div className="form-floating mb-4">
          <textarea
            rows={10}
            id="DoDo"
            value={DoDo}
            className="form-control "
            onChange={(e) => setDoDo(e.target.value)}
          ></textarea>
          <label htmlFor="DoDo">DoDo</label>
        </div>

        <div className=" d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-success  col-4 py-3"
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default CreateDoDo;

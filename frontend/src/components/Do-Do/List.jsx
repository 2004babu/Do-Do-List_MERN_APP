import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { deleteDoDO } from "../../Actions/DoDoActions";
import { format } from "date-fns";
const List = ({ item,wantReferesh,setwantReferesh }) => {
  const l_item = localStorage.getItem("dodo-app-babu")
    ? JSON.parse(localStorage.getItem("dodo-app-babu"))
    : [];
  const {
     isAuthenticatedUser = false ,
     isLocalUser = false 


  } = useSelector(
    (State) => State.authState
  );

  const dispatch = useDispatch();
  const handleDelete = (e, id) => {
    e.target.disabled=true
    if (isAuthenticatedUser) {
      dispatch(deleteDoDO(id));
    } else {
      console.log('delete is localUser',id);
      const filtered = l_item.filter((dodo) => {
        return dodo.id !== id;
      });
      localStorage.setItem("dodo-app-babu", JSON.stringify(filtered));
      setwantReferesh(wantReferesh?false:true)
    }
  };
  let newDate = item.cretaAt ?? "";
  if (isAuthenticatedUser&&!isLocalUser) {
    console.log(item);
    try {
      newDate = format(new Date(item.cretaAt), "h:mm:ss ,dd-MMM-yyyy ");
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <tr>
      <td className=" text-wrap col px-md-5 px-sm-1  ">{item.Data.title}</td>
      <td className="text-wrap col px-md-5 px-sm-1 ">{item.Data.subject}</td>
      <td className="text-wrap col px-md-5 px-sm-1">{newDate}</td>
      <td className="text-wrap col px-md-5 px-sm-1  d-flex colum gap-1">
        {
          <Fragment>
            <Fragment>
              <button
                className="col px-md-2 px-sm-1 "
                type="button"
                id="edit_page_btn"
                style={{ backgroundColor: "#49108B" }}
              >
                <Link
                  id="edit"
                  to={`edit/${item._id ? item._id : item.id}`}
                  className="col-12 py-3 px-3 px-md-3"
                >
                  Edit
                </Link>
              </button>
              <button
                className="col px-md-2 px-sm-1 "
                type="button"
                id="edit_page_btn"
                style={{ backgroundColor: "#FF3EA5" }}
                onClick={(e) => {
                  handleDelete(e, item._id ? item._id : item.id);
                }}
              >
                Delete
              </button>
            </Fragment>
          </Fragment>
        }
      </td>
    </tr>
  );
};

export default List;

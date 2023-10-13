import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

function ContactCard(props) {
  const { id, name, email } = props.contact;
  // Add a click event handler to log the ID when the user clicks on the contact
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => props.clickHandler(id)} // Updated the clickHandler
      ></i>
      <Link to={`/edit/${id}`}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
}

export default ContactCard;

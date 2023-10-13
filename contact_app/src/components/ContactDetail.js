import React from "react";
import { useParams, Link } from "react-router-dom";
import user from "../images/user.png";

export default function ContactDetail(props) {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const { contacts } = props; // This line is not needed, you can remove it

  // Find the contact with a matching 'id' in the 'contacts' array
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    // Handle the case where the contact is not found
    return (
      <div className="main">
        <div className="ui card centered">
          <div className="image">
            <img src={user} alt="user" />
          </div>
          <div className="content">
            <div className="header">Contact not found</div>
          </div>
        </div>
        <div className="center-div">
          <Link to="/">Back to Contact List</Link>
        </div>
      </div>
    );
  }

  const { name, email } = contact;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">Back to Contact List</Link>
      </div>
    </div>
  );
}

import React, { useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

function ContactList(props) {
  const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id); // Pass the id to the parent component for deletion
      };
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler} // Updated the prop name
        key={contact.id}
      />
    );
  });
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };
  useEffect(() => {
    // Log all contact IDs and data when the page loads
    console.log("All Contacts:", props.contacts);
  }, [props.contacts]);
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts available"}
      </div>
    </div>
  );
};

export default ContactList;

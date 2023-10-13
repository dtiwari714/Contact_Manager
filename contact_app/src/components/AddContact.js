import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AddContact(props) {
  const navigate = useNavigate(); // Get the navigate function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addForm = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All fields are mandatory");
      return;
    }
    const newContact = { name, email };
    props.addContactHandler(newContact);
    // Clear the name and email fields
    setName("");
    setEmail("");
    // Use the navigate function to navigate to a different route
    navigate("/"); // Navigate to the root route
    // Save the new contact in a cookie
    // Save the new contact in a cookie (serialize it to JSON)
    const existingContacts = JSON.parse(Cookies.get("contacts") || "[]");
    existingContacts.push(newContact);
    Cookies.set("contacts", JSON.stringify(existingContacts));
  };
  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={addForm}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
}
export default AddContact;

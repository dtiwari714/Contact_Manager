import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditContact(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchContactDataById = (contactId) => {
    // Replace this with your data retrieval logic, e.g., an API call
    // For this example, we'll use a mock function
    const contactData = mockFetchContactDataById(contactId);
    return contactData;
  };

  const mockFetchContactDataById = (contactId) => {
    // Mock data retrieval - Replace this with your actual data source
    // Example: Fetch contact data from an array of contacts
    const contact = props.contacts.find((contact) => contact.id === contactId);
    return contact;
  };

  useEffect(() => {
    // Fetch contact data when the component mounts
    const contactData = fetchContactDataById(id);
    if (contactData) {
      setName(contactData.name);
      setEmail(contactData.email);
    }
  }, [id]);

  const updateContactHandler = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    const updatedContact = { id, name, email };
    props.updateContactHandler(updatedContact);
    setName("");
    setEmail("");
    navigate("/"); // Use navigate to navigate back to the contact list
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={updateContactHandler}>
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
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
}

export default EditContact;

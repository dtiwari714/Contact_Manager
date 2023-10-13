import { useEffect, useState } from "react";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes
import AddContact from "./AddContact";
import api from "../api/contacts";
// import Cookies from "js-cookie";
// import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import ContactList from "./ContactList";
import Header from "./Header";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };
  const addContactHandler = async (contact) => {
    // setContacts([...contacts, { id: uuid(), ...contact }]);
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
    // const newContactList = contacts.filter((contact) => {
    //   return contact.id !== id;
    // });
    // setContacts(newContactList);

    // // Save the updated contacts list in cookies
    // Cookies.set("contacts", JSON.stringify(newContactList));
  };
  // useEffect(() => {
  //   // Load data from localStorage when the component mounts
  //   const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (storedContacts) {
  //     setContacts(storedContacts);
  //   }
  // }, []);

  // useEffect(() => {
  //   // Save the updated data to localStorage whenever it changes
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  // Load data from cookies
  useEffect(() => {
    // Load data from cookies (deserialize it from JSON)
    // const storedContacts = JSON.parse(Cookies.get("contacts") || "[]");
    // setContacts(storedContacts);
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllCOntacts();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
        <Route
            path="/"
            element={
              <ContactList
                contacts={
                  searchTerm.length < 1 ? contacts : searchResults
                }
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/edit/:id"
            element={
              <EditContact
                contacts={contacts} // Pass the contacts array as a prop
                updateContactHandler={updateContactHandler}
              />
            }
          />

          <Route
            path="/contact/:id"
            element={<ContactDetail contacts={contacts} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

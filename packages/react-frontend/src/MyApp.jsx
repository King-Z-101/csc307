// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

// const characters = [
//   {
//     name: "Charlie",
//     job: "Janitor"
//   },
//   {
//     name: "Mac",
//     job: "Bouncer"
//   },
//   {
//     name: "Dee",
//     job: "Aspring actress"
//   },
//   {
//     name: "Dennis",
//     job: "Bartender"
//   }
// ];

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function updateList(person) {
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      });
  }

  //IE3
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //default fetch behavior is an HTTP GET request
  /*
  Purpose: The fetchUsers function makes an HTTP GET request to retrieve a list of users from http://localhost:8000/users.
  Returns: It returns a Promise that resolves to the response from the server.
  Usage: The returned Promise can be handled using .then and .catch to process the response or handle errors.
  */
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise; // i.e. response object
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  
    return promise;
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList}/>
    </div>
  );

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }
}

export default MyApp;

/***
  Steps to remove node_modules:
  1. rm node_modules and .gitignore
  2. push to github
  3. npm install
  4. echo " " > .gitignore (create the file in the editor)
  5. go into the file and add "/node_modules"

***/
// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function updateList(person) {
    postUser(person)
      //notice that the promise from postUser was not given a name and is being handled directly by the .then method
      .then((res) => {
        if (res.status === 201) {
          //add the new user to the list of users in the state (characters)
          return res.json();
        }
        else {
          throw new Error("Post failure");
        }
      })
      .then((json) => {
        setCharacters([...characters, json]); 
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //IE3
  /*
  **`useEffect` Hook**:
  `useEffect` is a hook provided by React that allows you to perform side effects in function components.
  Side effects can include data fetching, subscriptions, or manually changing the DOM.
  1. The first .then method takes the response (res) and calls res.json() to parse the JSON body of the response. 
  This also returns a Promise (called json in the line below).
  2. The second .then method takes the parsed JSON data (json) and sets the characters state using setCharacters.
  3. The .catch method is used to handle any errors that occur during the fetch operation.
  */
  useEffect(() => {
    fetchUsers() // callback function (promised returned; i.e. response object)
      .then((res) => res.json()) //The first .then method takes the response (res) and calls res.json() to parse the JSON body of the response. This also returns a Promise.
      .then((json) => setCharacters(json))
      .catch((error) => {
        console.log(error);
      });
  }, []); //Dependency Array: An empty array [] ensures the effect runs only once after the initial render.

  //default fetch behavior is an HTTP GET request
  /*
  Purpose: The fetchUsers function makes an HTTP GET request to retrieve a list of users from endpoint http://localhost:8000/users.
  Returns: It returns a Promise that resolves to the response from the server.
  Usage: The returned Promise can be handled using .then and .catch to process the response or handle errors.
  */
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise; // i.e. response object
  }

  /*
  Purpose: The postUser function makes an HTTP POST request to add a new user to the server.
  The URL specified in the fetch call is http://localhost:8000/users, 
  which is the endpoint where the new user data will be sent.
  headers: An object containing headers for the request. 
  The Content-Type header is set to application/json to indicate that the request body contains JSON data.
  */
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  
    return promise; // i.e. response object (check if the user was added/post successfully)
  }

  function removeOneCharacter(index) {
    //look in the state (characters) for the user with the index that was deleted
    // template literal

    //change id to _id
    
    const promise = fetch(`http://localhost:8000/users/${characters[index]._id}`, { 
        method: 'DELETE'
    })
    .then((res) => {
      if (res.status === 204) {
        //remove successful on backend, now remove from frontend
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      } else if (res.status === 404) {
        throw new Error("Resource not found.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
}

export default MyApp;
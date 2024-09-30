// src/MyApp.jsx
import React, { useState } from "react";
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
    setCharacters([...characters, person]);
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
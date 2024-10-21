// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  //Person is a state object with two properties: name and job, setPerson is a function that will update the state of person
    const [person, setPerson] = useState({  
    name: "",
    job: ""
    });

  // Add the following code to src/Form.jsx
    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "job")
        setPerson({ name: person["name"], job: value });
        else setPerson({ name: value, job: person["job"] });
    }

    function submitForm() {
        props.handleSubmit(person);
        setPerson({ name: "", job: "" });
        
    }
    //id to _id (2)
    return (
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={person.name}
            onChange={handleChange}
          />
          <label htmlFor="job">Job</label>
          <input
            type="text"
            name="job"
            id="job"
            value={person.job}
            onChange={handleChange}
          />
          <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
}


export default Form;
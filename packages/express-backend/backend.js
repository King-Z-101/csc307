import express from "express";
import cors from "cors";

//export DEBUG='express:router' if you want to see error messages from GET/POST requests

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

const app = express();
const port = 8000;

//and then enable all CORS requests
/*
Note that, even running both of your frontend and backend in your computer, 
they're running in different ports, so they're considered to be in 'different origins.' 
This line is essential if your frontend application is hosted on a different domain than your backend server, 
as it allows the frontend to communicate with the backend without being blocked by the browser's same-origin policy.
5173(Front) and 8000(Back) are different ports, so they're considered to be in 'different origins.'
*/
app.use(cors());
app.use(express.json());

//Find users through /users get endpoint
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

//Find users by id through /users/:id get endpoint
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id); //use find because we know our code should return one result since id is unique

//Find users by id through /users/:name/:job get endpoint
const findUserByNameJob = (name, job) =>
  users["users_list"].find((user) => user["name"] === name && user["job"] === job); //use find because we know our code should return one result since id is unique

const generateId = () => {
  const newId = Math.random().toString()
  return newId.slice(2,8); //return a random 6 digit number
}

const addUser = (user) => {
  user.id = generateId(); //add id to user object
  //user.name = user.name;
  //user.job = user.job;
  users["users_list"].push(user);
  return user;
};

const deleteUser = (user) => {
  users["users_list"] = users["users_list"].filter(u => u.id !== user.id);
  //return user;
};


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result); //response for fetchUsers() in MyApp.jsx
  } else {
    res.send(users); //response for fetchUsers() in MyApp.jsx
  }
});

//http post method (posts are not being saved after the server session ends!)
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).send(newUser); //When an object is passed to send, Express will automatically convert it to JSON.
});

// new enpoint to for getting users based on id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id); //method
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// new enpoint for deleting users based on id
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id); //method
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    deleteUser(result);
    //send a 204 status code to indicate that the request has succeeded
    res.status(204).send(result);
  }
});

// new enpoint to for getting users based on id
app.get("/users/:name/:job", (req, res) => {
  const name = req.params["name"]; //or req.params.id
  const job = req.params["job"];
  let result = findUserByNameJob(name, job); //method
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
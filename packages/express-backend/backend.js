import express from "express";

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

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

//http post method (posts are not being saved after the server session ends!)
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send();
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

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
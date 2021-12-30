import React, { useState, useEffect } from "react";

import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import About from "./components/About";
import { Switch, Route } from "react-router-dom";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    updateUsersList();
  }, []);

  async function getUsers() {
    try {
      const usersReponse = await fetch(
        `${process.env.REACT_APP_API_SERVICE_URL}/users`
      );
      const usersData = await usersReponse.json();
      return usersData;
    } catch (err) {
      console.error(err);
    }
  }

  async function updateUsersList() {
    const usersList = await getUsers();
    setUsers(usersList);
  }

  async function addUser(data) {
    try {
      await fetch(`${process.env.REACT_APP_API_SERVICE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      updateUsersList();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-half">
            <br />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <div>
                    <h1 className="title is-1">Users</h1>
                    <hr />
                    <br />
                    <AddUser addUser={addUser} />
                    <br /> <br />
                    <UsersList users={users} />
                  </div>
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import About from "./components/About";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserStatus from "./components/UserStatus";
import Message from "./components/Message";

Modal.setAppElement(document.getElementById("root"));

const modalStyles = {
  content: {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    border: 0,
    background: "transparent",
  },
};

const App = () => {
  const title = "TestDriven.io";

  const [users, setUsers] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [messageText, setMessageText] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    const url = `${process.env.REACT_APP_API_SERVICE_URL}/users`;
    axios
      .get(url)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function isAuthenticated() {
    if (accessToken || validRefresh()) {
      return true;
    }
    return false;
  }

  function validRefresh() {
    const token = window.localStorage.getItem("refresh_token");
    if (token) {
      const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/refresh`;
      axios
        .post(url, { refresh_token: token })
        .then((res) => {
          setAccessToken(res.data.access_token);
          getUsers();
          window.localStorage.setItem("refresh_token", res.data.refresh_token);
          return true;
        })
        .catch((err) => {
          return false;
        });
    }
    return false;
  }

  function addUser(data) {
    const url = `${process.env.REACT_APP_API_SERVICE_URL}/users`;
    axios
      .post(url, data)
      .then((res) => {
        getUsers();
        handleCloseModal();
        createMessage("success", "User added.");
      })
      .catch((err) => {
        console.error(err);
        handleCloseModal();
        createMessage("danger", "That user already exists.");
      });
  }

  function removeUser(userId) {
    const url = `${process.env.REACT_APP_API_SERVICE_URL}/users/${userId}`;
    axios
      .delete(url)
      .then((res) => {
        getUsers();
        createMessage("success", "User removed");
      })
      .catch((err) => {
        console.error(err);
        createMessage("danger", "Something went wrong.");
      });
  }

  function handleRegisterFormSubmit(data) {
    const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/register`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        createMessage("success", "You have registered successfully.");
      })
      .catch((err) => {
        console.log(err);
        createMessage("danger", "That user already exists.");
      });
  }

  function handleLoginFormSubmit(data) {
    const url = `${process.env.REACT_APP_API_SERVICE_URL}/auth/login`;
    axios
      .post(url, data)
      .then((res) => {
        setAccessToken(res.data.accessToken);
        getUsers();
        window.localStorage.setItem("refresh_token", res.data.refresh_token);
        createMessage("success", "You have logged in successfully.");
      })
      .catch((err) => {
        console.log(err);
        createMessage("danger", "Incorrect email and/or password.");
      });
  }

  function handleLogout() {
    window.localStorage.removeItem("refresh_token");
    setAccessToken(null);
    createMessage("success", "You have logged out.");
  }

  function createMessage(type, text) {
    setMessageType(type);
    setMessageText(text);

    setTimeout(() => {
      removeMessage();
    }, 3000);
  }

  function removeMessage() {
    setMessageType(null);
    setMessageText(null);
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div>
      <Navbar
        title={title}
        handleLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      <section className="section">
        <div className="container">
          {messageType && messageText && (
            <Message
              messageType={messageType}
              messageText={messageText}
              removeMessage={removeMessage}
            />
          )}
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
                      {isAuthenticated() && (
                        <button
                          className="button is-primary"
                          onClick={handleOpenModal}
                        >
                          Add User
                        </button>
                      )}
                      <br />
                      <br />
                      <Modal isOpen={showModal} style={modalStyles}>
                        <div className="modal is-active">
                          <div className="modal-background" />
                          <div className="modal-card">
                            <header className="modal-card-head">
                              <p className="modal-card-title">Add User</p>
                              <button
                                className="delete"
                                aria-label="close"
                                onClick={handleCloseModal}
                              />
                            </header>
                            <section className="modal-card-body">
                              <AddUser addUser={addUser} />
                            </section>
                          </div>
                        </div>
                      </Modal>
                      <UsersList
                        users={users}
                        removeUser={removeUser}
                        isAuthenticated={isAuthenticated}
                      />
                    </div>
                  )}
                />
                <Route exact path="/about" component={About} />
                <Route
                  exact
                  path="/status"
                  render={() => (
                    <UserStatus
                      accessToken={accessToken}
                      isAuthenticated={isAuthenticated}
                    />
                  )}
                />
                <Route
                  exact
                  path="/register"
                  render={() => (
                    <RegisterForm
                      handleRegisterFormSubmit={handleRegisterFormSubmit}
                      isAuthenticated={isAuthenticated}
                    />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  render={() => (
                    <LoginForm
                      handleLoginFormSubmit={handleLoginFormSubmit}
                      isAuthenticated={isAuthenticated}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;

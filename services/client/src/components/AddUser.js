import React, { useState } from "react";
import PropTypes from "prop-types";

const AddUser = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(event) => props.addUser(event, { username, email, password })}
    >
      <div className="field">
        <label className="label is-large" htmlFor="input-username">
          Username
        </label>
        <input
          name="username"
          id="input-username"
          className="input is-large"
          type="text"
          placeholder="Enter a username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label is-large" htmlFor="input-email">
          Email
        </label>
        <input
          name="email"
          id="input-email"
          className="input is-large"
          type="email"
          placeholder="Enter an email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label is-large" htmlFor="input-password">
          Password
        </label>
        <input
          name="password"
          id="input-password"
          className="input is-large"
          type="password"
          placeholder="Enter an password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className="button is-primary is-large is-fullwidth"
        value="Submit"
      />
    </form>
  );
};

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default AddUser;

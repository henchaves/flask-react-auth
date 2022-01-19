import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UserStatus = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUserStatus();
  }, []);

  function getUserStatus(event) {
    const options = {
      url: `${process.env.REACT_APP_API_SERVICE_URL}/auth/status`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.accessToken}`,
      },
    };

    axios(options)
      .then((res) => {
        setEmail(res.data.email);
        setUsername(res.data.username);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <ul>
        <li>
          <strong>Email:</strong>&nbsp;
          <span data-testid="user-email">{email}</span>
        </li>
        <li>
          <strong>Username:</strong>&nbsp;
          <span data-testid="user-username">{username}</span>
        </li>
      </ul>
    </div>
  );
};

UserStatus.propTypes = {
  accessToken: PropTypes.string,
};

export default UserStatus;

//Validates user input is a real email and that it is not empty

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty.";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty.";
  } else {
    const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty.";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty.";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateTeamMemberInputs = (name, title, description) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Username must not be empty.";
  }
  if (title.trim() === "") {
    errors.title = "Title must not be empty.";
  }
  if (description === "") {
    errors.description = "Description must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateTriggrInputs = (name) => {
  const errors = {};
  if (name.trim() === "") {
    errors.username = "Name must not be empty.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

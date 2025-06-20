/**
 * Checks if the provided user credentials object has a non-empty username or password.
 *
 * @param {Object} userCredentials - The object containing user credential fields.
 * @param {string} userCredentials.username - The username string to check.
 * @param {string} userCredentials.password - The password string to check.
 * @returns {boolean} Returns true if either the username or password is not an empty string; otherwise, false.
 */
function hasNonEmptyUsernameOrPassword(userCredentials) {
  // Check if either username or password is not an empty string
  return userCredentials.username !== "" || userCredentials.password !== "";
}

module.exports = hasNonEmptyUsernameOrPassword;
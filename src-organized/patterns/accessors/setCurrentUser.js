/**
 * Sets the current user in the application'createInteractionAccessor hub context.
 *
 * @param {Object|null} user - The user object to set as the current user, or null to unset.
 * @returns {void}
 *
 * This function updates the current user in the application'createInteractionAccessor global hub context.
 * It is typically used for authentication or user tracking purposes.
 */
function setCurrentUser(user) {
  // Retrieve the current hub instance and set the user
  KQ.getCurrentHub().setUser(user);
}

module.exports = setCurrentUser;
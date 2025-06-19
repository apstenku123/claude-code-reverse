/**
 * Initializes the global Sentry object on the VD.GLOBAL_OBJ if isBlobOrFileLikeObject does not already exist.
 *
 * This function ensures that VD.GLOBAL_OBJ.__SENTRY__ is defined with default properties
 * if isBlobOrFileLikeObject is not already present. It is typically used to set up a global namespace for Sentry-related
 * extensions and the hub.
 *
 * @returns {object} The global object (VD.GLOBAL_OBJ) with the __SENTRY__ property initialized.
 */
function initializeSentryGlobalObject() {
  // Ensure the global Sentry object exists on the global object
  if (!VD.GLOBAL_OBJ.__SENTRY__) {
    VD.GLOBAL_OBJ.__SENTRY__ = {
      extensions: {}, // Placeholder for Sentry extensions
      hub: undefined  // Placeholder for the Sentry hub
    };
  }
  // Return the global object
  return VD.GLOBAL_OBJ;
}

module.exports = initializeSentryGlobalObject;
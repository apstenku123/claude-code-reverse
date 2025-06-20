/**
 * Checks if the `openDatabase` function is available in the current environment.
 *
 * This is typically used to determine if the Web SQL Database API is supported by the browser.
 *
 * @returns {boolean} Returns true if `openDatabase` is defined as a function, otherwise false.
 */
const isOpenDatabaseAvailable = () => {
  // Check if 'openDatabase' exists and is a function
  return typeof openDatabase === "function";
};

module.exports = isOpenDatabaseAvailable;

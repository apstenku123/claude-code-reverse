/**
 * Creates an Error object indicating that a specified resource was not found.
 * The error will have a message in the format 'not found: <resourceName>' and a code property set to 'ENOENT'.
 *
 * @param {string} resourceName - The name or identifier of the resource that was not found.
 * @returns {Error} An Error object with a descriptive message and a code property set to 'ENOENT'.
 */
const createNotFoundError = (resourceName) => {
  // Create a new Error with a descriptive message
  const error = new Error(`not found: ${resourceName}`);
  // Assign a custom error code to indicate 'Error NO ENTry'
  return Object.assign(error, { code: "ENOENT" });
};

module.exports = createNotFoundError;

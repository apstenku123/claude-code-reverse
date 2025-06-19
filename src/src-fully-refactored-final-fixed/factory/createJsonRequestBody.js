/**
 * Creates an object containing JSON body headers and a stringified JSON body.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.headers - The HTTP headers (not used in this function, but included for interface consistency).
 * @param {Object} params.body - The data to be stringified and sent as the request body.
 * @returns {Object} An object with 'bodyHeaders' set to application/json and 'body' as a JSON string.
 */
const createJsonRequestBody = ({ headers, body }) => {
  // Prepare the headers for a JSON body
  const bodyHeaders = {
    "content-type": "application/json"
  };

  // Stringify the body object for transmission
  const stringifiedBody = JSON.stringify(body);

  return {
    bodyHeaders,
    body: stringifiedBody
  };
};

module.exports = createJsonRequestBody;
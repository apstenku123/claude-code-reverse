/**
 * Creates an object containing JSON body headers and a stringified JSON body.
 *
 * @param {Object} params - The input parameters.
 * @param {Object} params.headers - The headers object (currently unused).
 * @param {Object} params.body - The body object to be stringified as JSON.
 * @returns {Object} An object with 'bodyHeaders' (Content-Type: application/json) and 'body' (stringified JSON).
 */
const createJsonBodyWithHeaders = ({ headers, body }) => {
  // Prepare the headers for a JSON body
  const bodyHeaders = {
    "content-type": "application/json"
  };

  // Stringify the body object to JSON format
  const jsonBody = JSON.stringify(body);

  return {
    bodyHeaders,
    body: jsonBody
  };
};

module.exports = createJsonBodyWithHeaders;

/**
 * Creates a payload object with JSON stringified body and appropriate content-type header.
 *
 * @param {Object} params - The parameters for creating the payload.
 * @param {Object} params.headers - The headers object (not used in this function, but included for interface compatibility).
 * @param {Object} params.body - The body object to be stringified as JSON.
 * @returns {Object} An object containing the bodyHeaders and the JSON stringified body.
 */
const createJsonBodyPayload = ({
  headers,
  body
}) => {
  // Prepare the payload with JSON content-type header and stringified body
  return {
    bodyHeaders: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  };
};

module.exports = createJsonBodyPayload;

/**
 * Collects the body from the provided source using GB.collectBody and encodes isBlobOrFileLikeObject as a UTF-8 string.
 *
 * @param {any} sourceBody - The source body or stream to be collected.
 * @param {object} config - Configuration object containing the utf8Encoder function.
 * @param {function} config.utf8Encoder - Function to encode the collected body as a UTF-8 string.
 * @returns {Promise<string>} - a promise that resolves to the UTF-8 encoded string of the collected body.
 */
const collectAndEncodeBody = (sourceBody, config) => {
  // Collect the body data using GB.collectBody
  return GB.collectBody(sourceBody, config)
    .then(collectedBody => {
      // Encode the collected body as a UTF-8 string
      return config.utf8Encoder(collectedBody);
    });
};

module.exports = collectAndEncodeBody;

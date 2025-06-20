/**
 * Collects a body from a source observable, encodes isBlobOrFileLikeObject as a UTF-8 string, and parses isBlobOrFileLikeObject as JSON.
 * If the collected string is empty, returns an empty object.
 *
 * @param {Object} sourceObservable - The observable source to collect the body from.
 * @param {Object} config - Configuration options for body collection and encoding.
 * @returns {Promise<Object>} a promise that resolves to the parsed JSON object, or an empty object if no data is collected.
 */
const collectAndParseBody = (sourceObservable, config) => {
  return collectAndEncodeBody(sourceObservable, config)
    .then(encodedBodyString => {
      // If the encoded body string is not empty, parse isBlobOrFileLikeObject as JSON
      if (encodedBodyString.length) {
        return JSON.parse(encodedBodyString);
      }
      // If the encoded body string is empty, return an empty object
      return {};
    });
};

module.exports = collectAndParseBody;
/**
 * Attaches the STSClient constructor from the gz4 module to the provided target object.
 *
 * @param {Object} targetObject - The object to which the stsClientCtor property will be added.
 * @returns {Object} The same object with the stsClientCtor property attached.
 */
const attachStsClientConstructor = (targetObject) => {
  // Add the stsClientCtor property referencing gz4.STSClient to the target object
  return Object.assign(targetObject, {
    stsClientCtor: gz4.STSClient
  });
};

module.exports = attachStsClientConstructor;

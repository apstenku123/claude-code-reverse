/**
 * Sets the context object for the current instance.
 *
 * @param {any} contextObject - The object to set as the context for this instance.
 * @returns {void}
 */
function setContextObject(contextObject) {
  // Assign the provided object to the instance'createInteractionAccessor contextObject property
  this.contextObject = contextObject;
}

module.exports = setContextObject;
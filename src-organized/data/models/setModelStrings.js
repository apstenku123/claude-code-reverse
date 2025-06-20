/**
 * Sets the modelStrings property on the N9 object.
 *
 * @param {any} modelStrings - The model strings to assign to N9.modelStrings. Typically, this is the result of processInteractionEntries.
 * @returns {void} This function does not return a value.
 */
function setModelStrings(modelStrings) {
  // Assign the provided modelStrings to the N9 global object'createInteractionAccessor modelStrings property
  N9.modelStrings = modelStrings;
}

module.exports = setModelStrings;
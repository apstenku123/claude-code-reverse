/**
 * Marks the model cost as unknown in the N9 object.
 *
 * This utility function sets the 'hasUnknownModelCost' property of the global N9 object to true.
 * This flag can be used elsewhere in the application to indicate that the model'createInteractionAccessor cost is not known.
 *
 * @returns {void} This function does not return a value.
 */
function markModelCostAsUnknown() {
  // Set the hasUnknownModelCost flag to true to indicate unknown model cost
  N9.hasUnknownModelCost = true;
}

module.exports = markModelCostAsUnknown;
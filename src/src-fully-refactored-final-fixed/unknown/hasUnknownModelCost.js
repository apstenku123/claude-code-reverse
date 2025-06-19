/**
 * Checks if the current model has an unknown cost.
 *
 * @returns {boolean} True if the model'createInteractionAccessor cost is unknown, otherwise false.
 */
function hasUnknownModelCost() {
  // Access the 'hasUnknownModelCost' property from the N9 module/object
  return N9.hasUnknownModelCost;
}

module.exports = hasUnknownModelCost;
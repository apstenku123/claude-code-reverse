/**
 * Checks whether the model cost is unknown in the N9 module.
 *
 * @returns {boolean} Returns true if the model cost is unknown, otherwise false.
 */
function checkIfModelCostIsUnknown() {
  // Access the hasUnknownModelCost property from the N9 module/object
  return N9.hasUnknownModelCost;
}

module.exports = checkIfModelCostIsUnknown;
/**
 * Retrieves the current active status from the RGA module.
 *
 * @returns {boolean} True if RGA is active, false otherwise.
 */
function getRgaActiveStatus() {
  // Return the 'active' property from the RGA module/object
  return RGA.active;
}

module.exports = getRgaActiveStatus;
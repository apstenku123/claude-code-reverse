/**
 * Checks whether the global object 'pF1' contains a property named 'type'.
 *
 * @returns {boolean} Returns true if 'pF1' has its own or inherited 'type' property; otherwise, false.
 */
function hasTypePropertyInPF1() {
  // Check if the 'type' property exists in the 'pF1' object (own or inherited)
  return "type" in pF1;
}

module.exports = hasTypePropertyInPF1;
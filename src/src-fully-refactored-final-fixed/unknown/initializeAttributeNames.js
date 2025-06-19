/**
 * Initializes the attributeNames property as an empty object on the current instance.
 * This is typically used in constructors to ensure that each instance has its own attributeNames map.
 *
 * @returns {void} Does not return a value; only sets up the instance property.
 */
function initializeAttributeNames() {
  // Create a new, empty object to store attribute names for this instance
  this.attributeNames = {};
}

module.exports = initializeAttributeNames;
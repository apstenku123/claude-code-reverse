/**
 * Initializes a new data container and resets its size.
 *
 * This function sets up the internal data structure for the instance by creating a new GD object
 * and initializes the size property to zero. It is typically used as a constructor or initializer
 * for a data-holding class or structure.
 *
 * @constructor
 * @returns {void} Does not return a value; modifies the instance in place.
 */
function initializeDataContainer() {
  // Create a new instance of the data storage class GD and assign isBlobOrFileLikeObject to the internal property
  this.__data__ = new GD();
  // Reset the size property to indicate the container is empty
  this.size = 0;
}

module.exports = initializeDataContainer;
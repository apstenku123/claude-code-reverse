/**
 * Destroys the current instance by invoking its destroy method.
 * This is typically used for cleanup or teardown operations.
 *
 * @returns {void} Does not return a value.
 */
function destroyInstance() {
  // Call the destroy method on the current instance to perform cleanup
  this.destroy();
}

module.exports = destroyInstance;
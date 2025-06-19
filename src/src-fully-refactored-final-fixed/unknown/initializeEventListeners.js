/**
 * Initializes the event listeners property for the current instance.
 * This function sets up an empty object to store event listeners, 
 * preparing the instance to handle event subscriptions.
 *
 * @constructor
 */
function initializeEventListeners() {
  // Create an empty object to store event listeners for this instance
  this.eventListeners = {};
}

module.exports = initializeEventListeners;
/**
 * Defines getter and setter properties for event handlers on a class prototype.
 * For each event name in the provided array, this function adds a property (e.g., 'onClick')
 * to the prototype of the given class. The getter and setter delegate to internal handler methods.
 * It also registers a change handler for each event property.
 *
 * @param {Function} targetClass - The class whose prototype will receive event handler properties.
 * @param {string[]} eventNames - Array of event names (e.g., ['Click', 'Hover']) to define properties for.
 * @returns {void}
 */
function defineEventHandlerProperties(targetClass, eventNames) {
  const prototype = targetClass.prototype;

  eventNames.forEach(function(eventName) {
    // Define a property like 'onClick' with getter and setter
    Object.defineProperty(prototype, "on" + eventName, {
      get: function() {
        // Delegate to internal method to get the event handler
        return this._getEventHandler(eventName);
      },
      set: function(handler) {
        // Delegate to internal method to set the event handler
        this._setEventHandler(eventName, handler);
      }
    });
    // Register a change handler for the new property
    fM2.registerChangeHandler(targetClass, "on" + eventName, assignBuiltVM2ToProperty);
  });
}

module.exports = defineEventHandlerProperties;
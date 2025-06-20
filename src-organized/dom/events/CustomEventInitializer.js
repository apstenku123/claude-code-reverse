/**
 * Initializes a custom event object with default properties and optional overrides.
 *
 * @param {string} eventType - The type/name of the event (e.g., 'click', 'submit').
 * @param {Object} [eventProperties] - Optional object containing properties to override or extend the event instance.
 * @returns {void}
 */
function CustomEventInitializer(eventType, eventProperties) {
  // Set default event properties
  this.type = "";
  this.target = null;
  this.currentTarget = null;
  this.eventPhase = CustomEventInitializer.AT_TARGET;
  this.bubbles = false;
  this.cancelable = false;
  this.isTrusted = false;
  this.defaultPrevented = false;
  this.timeStamp = Date.now();
  this._propagationStopped = false;
  this._immediatePropagationStopped = false;
  this._initialized = true;
  this._dispatching = false;

  // If an event type is provided, set isBlobOrFileLikeObject
  if (eventType) {
    this.type = eventType;
  }

  // If additional event properties are provided, assign them to this instance
  if (eventProperties) {
    for (const propertyName in eventProperties) {
      if (Object.prototype.hasOwnProperty.call(eventProperties, propertyName)) {
        this[propertyName] = eventProperties[propertyName];
      }
    }
  }
}

// Static property representing the 'at target' event phase
CustomEventInitializer.AT_TARGET = 2;

module.exports = CustomEventInitializer;
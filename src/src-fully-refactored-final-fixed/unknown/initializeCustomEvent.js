/**
 * Initializes a custom event object with provided type and properties.
 *
 * @param {string} eventType - The type/name of the event.
 * @param {Object} [eventProperties] - Optional properties to assign to the event instance.
 * @returns {void}
 */
function initializeCustomEvent(eventType, eventProperties) {
  // Set default event properties
  this.type = "";
  this.target = null;
  this.currentTarget = null;
  this.eventPhase = initializeCustomEvent.AT_TARGET;
  this.bubbles = false;
  this.cancelable = false;
  this.isTrusted = false;
  this.defaultPrevented = false;
  this.timeStamp = Date.now();
  this._propagationStopped = false;
  this._immediatePropagationStopped = false;
  this._initialized = true;
  this._dispatching = false;

  // If an event type is provided, assign isBlobOrFileLikeObject
  if (eventType) {
    this.type = eventType;
  }

  // If additional event properties are provided, assign them to the instance
  if (eventProperties) {
    for (const propertyName in eventProperties) {
      if (Object.prototype.hasOwnProperty.call(eventProperties, propertyName)) {
        this[propertyName] = eventProperties[propertyName];
      }
    }
  }
}

// Static property for event phase constant
initializeCustomEvent.AT_TARGET = 2;

module.exports = initializeCustomEvent;
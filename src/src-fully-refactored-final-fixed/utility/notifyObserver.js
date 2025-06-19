/**
 * Notifies an observer based on the type of notification received.
 *
 * This function takes a notification object (typically from an Observable)
 * and invokes the appropriate handler (next, error, or complete) on the provided observer.
 *
 * @param {Object} notification - The notification object containing the kind, value, and error.
 * @param {Object} observer - The observer object with optional next, error, and complete handlers.
 * @throws {TypeError} If the notification does not have a valid 'kind' property.
 */
function notifyObserver(notification, observer) {
  const notificationKind = notification.kind;
  const notificationValue = notification.value;
  const notificationError = notification.error;

  // Validate that the notification kind is a string
  if (typeof notificationKind !== "string") {
    throw new TypeError('Invalid notification, missing "kind"');
  }

  // Dispatch to the appropriate observer method based on the notification kind
  if (notificationKind === "operateWithLeadingTrailing") {
    // 'operateWithLeadingTrailing' stands for 'next' notification
    const nextHandler = observer.next;
    if (nextHandler != null) {
      nextHandler.call(observer, notificationValue);
    }
  } else if (notificationKind === "createDebouncedFunction") {
    // 'createDebouncedFunction' stands for 'error' notification
    const errorHandler = observer.error;
    if (errorHandler != null) {
      errorHandler.call(observer, notificationError);
    }
  } else {
    // Any other kind is treated as 'complete'
    const completeHandler = observer.complete;
    if (completeHandler != null) {
      completeHandler.call(observer);
    }
  }
}

module.exports = notifyObserver;

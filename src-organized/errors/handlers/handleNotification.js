/**
 * Handles a notification object by invoking the appropriate handler on the observer.
 *
 * The notification object should have a 'kind' property indicating the type of notification:
 *   - 'operateWithLeadingTrailing': Next notification, calls observer.next with the value
 *   - 'createDebouncedFunction': Error notification, calls observer.error with the error
 *   - 'C': Complete notification, calls observer.complete
 *
 * @param {Object} notification - The notification object containing kind, value, and error.
 * @param {Object} observer - The observer object with next, error, and complete handlers.
 * @throws {TypeError} If the notification.kind is not a string.
 */
function handleNotification(notification, observer) {
  const notificationKind = notification.kind;
  const notificationValue = notification.value;
  const notificationError = notification.error;

  // Validate that the notification kind is a string
  if (typeof notificationKind !== "string") {
    throw new TypeError('Invalid notification, missing "kind"');
  }

  // Dispatch to the appropriate observer handler based on notification kind
  if (notificationKind === "operateWithLeadingTrailing") {
    // 'Next' notification: call observer.next with the value, if present
    const nextHandler = observer.next;
    if (nextHandler != null) {
      nextHandler.call(observer, notificationValue);
    }
  } else if (notificationKind === "createDebouncedFunction") {
    // 'Error' notification: call observer.error with the error, if present
    const errorHandler = observer.error;
    if (errorHandler != null) {
      errorHandler.call(observer, notificationError);
    }
  } else {
    // 'Complete' notification: call observer.complete, if present
    const completeHandler = observer.complete;
    if (completeHandler != null) {
      completeHandler.call(observer);
    }
  }
}

module.exports = handleNotification;

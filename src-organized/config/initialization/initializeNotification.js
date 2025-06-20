/**
 * Initializes the notification system by invoking the notification initializer.
 *
 * This utility function triggers the notification initialization process
 * by calling the external `notificationInitializer` function with the
 * required notification context.
 *
 * @returns {void} This function does not return a value.
 */
function initializeNotification() {
  // Call the notification initializer with the notification context
  notificationInitializer(notificationContext);
}

module.exports = initializeNotification;
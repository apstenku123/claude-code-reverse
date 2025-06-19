/**
 * Creates an anonymous notification object from the provided notification context.
 *
 * @param {Object} notificationContext - The context object containing notification details.
 * @returns {Object} An object representing the anonymous notification with displayName, id, key, and type.
 */
function createAnonymousNotification(notificationContext) {
  return {
    // Use the initialized display name or default to 'Anonymous' if not available
    displayName: initializeNotification(notificationContext) || "Anonymous",
    // Generate a unique identifier for the notification
    id: generateNotificationId(notificationContext),
    // Use the key property from the context directly
    key: notificationContext.key,
    // Determine the type of notification
    type: getNotificationType(notificationContext)
  };
}

module.exports = createAnonymousNotification;
/**
 * Processes a list of activity objects, filtering out system/progress types and merging user, assistant, and attachment activities according to specific rules.
 *
 * @param {Array<Object>} activities - The array of activity objects to process.
 * @returns {Array<Object>} The processed and merged array of activities.
 */
function mergeAndFilterActivities(activities) {
  /**
   * The resulting array of merged and filtered activities.
   * @type {Array<Object>}
   */
  const mergedActivities = [];

  // Filter out 'progress' and 'system' activity types
  const filteredActivities = activities.filter(activity => {
    return activity.type !== "progress" && activity.type !== "system";
  });

  filteredActivities.forEach(activity => {
    switch (activity.type) {
      case "user": {
        // Find the last activity in the merged list
        const lastActivity = CD(mergedActivities);
        // If the last activity is also a user, merge them
        if (lastActivity?.type === "user") {
          const mergedUserActivity = mergeMessageContents(lastActivity, activity);
          mergedActivities[mergedActivities.indexOf(lastActivity)] = mergedUserActivity;
          return;
        }
        // Otherwise, add the user activity as is
        mergedActivities.push(activity);
        return;
      }
      case "assistant": {
        // Find the last activity in the merged list
        const lastActivity = CD(mergedActivities);
        // If the last activity is an assistant with the same message id, merge them
        if (
          lastActivity?.type === "assistant" &&
          lastActivity.message.id === activity.message.id
        ) {
          const mergedAssistantActivity = mergeMessageContents(lastActivity, activity);
          mergedActivities[mergedActivities.indexOf(lastActivity)] = mergedAssistantActivity;
          return;
        }
        // Otherwise, add the assistant activity as is
        mergedActivities.push(activity);
        return;
      }
      case "attachment": {
        // Process the attachment into one or more activities
        const attachmentActivities = generateInteractionEntries(activity.attachment);
        // Find the last activity in the merged list
        const lastActivity = CD(mergedActivities);
        // If the last activity is a user, merge all attachment activities into isBlobOrFileLikeObject
        if (lastActivity?.type === "user") {
          const mergedUserWithAttachments = attachmentActivities.reduce(
            (accumulated, attachmentActivity) => mergeMessageContentWithTransformedContent(accumulated, attachmentActivity),
            lastActivity
          );
          mergedActivities[mergedActivities.indexOf(lastActivity)] = mergedUserWithAttachments;
          return;
        }
        // Otherwise, add all attachment activities as new entries
        mergedActivities.push(...attachmentActivities);
        return;
      }
      // No default needed as only known types are handled
    }
  });

  return mergedActivities;
}

module.exports = mergeAndFilterActivities;
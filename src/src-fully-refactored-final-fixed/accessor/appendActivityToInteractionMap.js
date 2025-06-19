/**
 * Appends a new activity to the interaction map and updates the total length.
 *
 * @param {Object} interactionMap - The object representing the current mapping of interactions to route names.
 *   Should have a `length` property (number) and a `body` property (array of activities).
 * @param {Object} activity - The activity object to add to the interaction map.
 *   Should have a `length` property (number).
 * @returns {void}
 * @description
 * Increases the `length` property of the interaction map by the length of the new activity,
 * and pushes the new activity onto the interaction map'createInteractionAccessor `body` array.
 */
function appendActivityToInteractionMap(interactionMap, activity) {
  // Update the total length to include the new activity'createInteractionAccessor length
  interactionMap.length += activity.length;
  // Add the new activity to the interaction map'createInteractionAccessor body
  interactionMap.body.push(activity);
}

module.exports = appendActivityToInteractionMap;
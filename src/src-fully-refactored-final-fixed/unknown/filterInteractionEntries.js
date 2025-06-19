/**
 * Filters and updates a list of interaction entries based on a sequence of actions.
 *
 * This function processes an initial array of interaction entries and applies a series of action objects to isBlobOrFileLikeObject. Depending on the action'createInteractionAccessor code, isBlobOrFileLikeObject may reset the list, remove entries with a specific end code, or add new entries while removing conflicting ones.
 *
 * @param {Array<Object>} initialEntries - The initial array of interaction entry objects to be filtered and updated.
 * @param {Array<Object>} actions - An array of action objects to apply to the interaction entries. Each action should have at least a 'code' property, and possibly an 'endCode' property.
 * @returns {Array<Object>} The filtered and updated array of interaction entries after applying all actions.
 */
function filterInteractionEntries(initialEntries, actions) {
  // Clone the initial entries to avoid mutating the input array
  let filteredEntries = [...initialEntries];

  for (const action of actions) {
    // If the action code is the reset code, clear all entries
    if (action.code === lB.reset.open) {
      filteredEntries = [];
    }
    // If the action code is in the set LI1, remove entries with a matching endCode
    else if (LI1.has(action.code)) {
      filteredEntries = filteredEntries.filter(
        entry => entry.endCode !== action.code
      );
    }
    // Otherwise, remove entries with a matching endCode and add the new action as an entry
    else {
      filteredEntries = filteredEntries.filter(
        entry => entry.endCode !== action.endCode
      );
      filteredEntries.push(action);
    }
  }

  return filteredEntries;
}

module.exports = filterInteractionEntries;
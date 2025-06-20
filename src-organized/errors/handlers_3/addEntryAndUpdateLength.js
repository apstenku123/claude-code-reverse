/**
 * Adds a new entry to the internal entries array and updates the total length.
 *
 * @param {Object} entry - The entry object to be added. Must have a 'length' property.
 * @returns {void}
 */
function addEntryAndUpdateLength(entry) {
  // 'entriesKey' and 'totalLengthKey' are assumed to be Symbol or string properties on 'this'
  this[entriesKey].push(entry); // Add the new entry to the entries array
  this[totalLengthKey] += entry.length; // Update the total length with the entry'createInteractionAccessor length
}

module.exports = addEntryAndUpdateLength;
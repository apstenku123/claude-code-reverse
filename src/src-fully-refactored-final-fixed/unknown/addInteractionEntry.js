/**
 * Adds a new interaction entry to the internal interactions array and updates the total length.
 *
 * @param {Object} interactionEntry - The interaction entry object to add. Must have a 'length' property.
 * @returns {void}
 */
function addInteractionEntry(interactionEntry) {
  // Push the new interaction entry to the internal interactions array
  this.interactionsArray.push(interactionEntry);
  // Update the total length counter with the length of the new entry
  this.totalInteractionsLength += interactionEntry.length;
}

module.exports = addInteractionEntry;
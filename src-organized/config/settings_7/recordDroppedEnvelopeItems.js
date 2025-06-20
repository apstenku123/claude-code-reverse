/**
 * Iterates over all items in the provided envelope and records dropped events for each item.
 *
 * @param {string} reason - The reason why the envelope items are being dropped (e.g., network error, quota exceeded).
 * @returns {void}
 */
function recordDroppedEnvelopeItems(reason) {
  // Iterate over each item in the envelope
  wY.forEachEnvelopeItem(W, (envelopeItem, envelopeItemType) => {
    // Determine the drop count or relevant metric for this item
    const dropCount = getSecondElementIfEventOrTransaction(envelopeItem, envelopeItemType);
    // Map the envelope item type to a data category
    const dataCategory = wY.envelopeItemTypeToDataCategory(envelopeItemType);
    // Record the dropped event with the specified reason, data category, and drop count
    a.recordDroppedEvent(reason, dataCategory, dropCount);
  });
}

module.exports = recordDroppedEnvelopeItems;
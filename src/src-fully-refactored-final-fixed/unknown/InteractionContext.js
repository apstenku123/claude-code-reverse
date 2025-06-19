/**
 * Represents the context for a user interaction, encapsulating the body, document, form, and element involved.
 *
 * @class InteractionContext
 * @param {Object} interactionBody - The processed interaction entries (from processInteractionEntries).
 * @param {Object} documentContext - The document context or configuration (purpose unknown, not yet refactored).
 * @param {Object} formContext - The form context or subscription (purpose unknown, not yet refactored).
 * @param {Object} uiActionTransaction - The UI action transaction (from startUiActionClickTransaction).
 */
function InteractionContext(interactionBody, documentContext, formContext, uiActionTransaction) {
  // Store the processed interaction entries
  this.body = interactionBody;
  // Store the document context or configuration
  this.document = documentContext;
  // Store the form context or subscription
  this.form = formContext;
  // Store the UI action transaction
  this.element = uiActionTransaction;
}

module.exports = InteractionContext;
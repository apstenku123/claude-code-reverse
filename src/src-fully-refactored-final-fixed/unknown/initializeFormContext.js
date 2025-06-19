/**
 * Initializes the context for a form by assigning the provided body, document, form, and element references to the instance.
 *
 * @param {Object} bodyReference - Reference to the body element or object.
 * @param {Object} documentReference - Reference to the document object.
 * @param {Object} formReference - Reference to the form object or data.
 * @param {Object} elementReference - Reference to a specific DOM element or component.
 */
function initializeFormContext(bodyReference, documentReference, formReference, elementReference) {
  // Assign references to the instance for later use
  this.body = bodyReference;
  this.document = documentReference;
  this.form = formReference;
  this.element = elementReference;
}

module.exports = initializeFormContext;
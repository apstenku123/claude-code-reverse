/**
 * Represents the context for a form element, encapsulating its body, document, form, and element references.
 *
 * @class FormElementContext
 * @param {Object} body - The body object associated with the form element.
 * @param {Object} documentRef - The document object associated with the form element.
 * @param {Object} formRef - The form object associated with the form element.
 * @param {Object} elementRef - The specific element reference within the form.
 */
function FormElementContext(body, documentRef, formRef, elementRef) {
  // Assign the body object to the context
  this.body = body;
  // Assign the document reference to the context
  this.document = documentRef;
  // Assign the form reference to the context
  this.form = formRef;
  // Assign the element reference to the context
  this.element = elementRef;
}

module.exports = FormElementContext;

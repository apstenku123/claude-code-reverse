/**
 * Applies the given style object or string to the specified DOM element.
 *
 * @param {HTMLElement} element - The DOM element to which the style will be applied.
 * @param {string|Object} style - The style to apply. Can be a CSS string or a style object.
 * @returns {void}
 *
 * @example
 * applyStyleToElement(document.getElementById('myDiv'), 'color: red;');
 * applyStyleToElement(document.getElementById('myDiv'), { color: 'red' });
 */
const applyStyleToElement = (element, style) => {
  // Directly assign the style to the element'createInteractionAccessor style property
  element.style = style;
};

module.exports = applyStyleToElement;

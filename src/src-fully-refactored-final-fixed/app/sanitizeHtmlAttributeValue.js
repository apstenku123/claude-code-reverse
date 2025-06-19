/**
 * Sanitizes and processes HTML attribute values to prevent XSS and invalid input.
 * Handles special cases for href, src, background, and style attributes.
 *
 * @param {any} element - The DOM element or context (not used directly in this function, but may be required for interface compatibility)
 * @param {string} attributeName - The name of the HTML attribute (e.g., 'href', 'src', 'background', 'style')
 * @param {string} attributeValue - The value of the HTML attribute to sanitize and process
 * @param {object|boolean} styleProcessor - Optional. For 'style' attributes, an object with a 'process' method to further process the style value, or false to skip processing
 * @returns {string} The sanitized and processed attribute value, or an empty string if invalid
 */
function sanitizeHtmlAttributeValue(element, attributeName, attributeValue, styleProcessor) {
  // Normalize the attribute value using processInteractionObservable(e.g., decode entities, etc.)
  let sanitizedValue = processInteractionObservable(attributeValue);

  // Special handling for href and src attributes
  if (attributeName === "href" || attributeName === "src") {
    sanitizedValue = tF1.trim(sanitizedValue);
    // Allow only '#' as a safe value
    if (sanitizedValue === "#") return "#";
    // Allow only safe protocols and relative paths
    const isSafeHref = (
      sanitizedValue.startsWith("http://") ||
      sanitizedValue.startsWith("https://") ||
      sanitizedValue.startsWith("mailto:") ||
      sanitizedValue.startsWith("tel:") ||
      sanitizedValue.startsWith("data:image/") ||
      sanitizedValue.startsWith("ftp://") ||
      sanitizedValue.startsWith("./") ||
      sanitizedValue.startsWith("../") ||
      sanitizedValue[0] === "#" ||
      sanitizedValue[0] === "/"
    );
    if (!isSafeHref) return "";
  } else if (attributeName === "background") {
    // Disallow backgrounds that match the oF1 pattern (likely a blacklist)
    oF1.lastIndex = 0;
    if (oF1.test(sanitizedValue)) return "";
  } else if (attributeName === "style") {
    // Disallow styles that match the Lt0 pattern (likely a blacklist)
    Lt0.lastIndex = 0;
    if (Lt0.test(sanitizedValue)) return "";
    // If matches Rt0 pattern, further check with oF1
    Rt0.lastIndex = 0;
    if (Rt0.test(sanitizedValue)) {
      oF1.lastIndex = 0;
      if (oF1.test(sanitizedValue)) return "";
    }
    // Optionally process the style value with a processor if provided
    if (styleProcessor !== false) {
      const processor = styleProcessor || Tt0;
      sanitizedValue = processor.process(sanitizedValue);
    }
  }
  // Final normalization using processInteractionObservable(e.g., encode entities, etc.)
  sanitizedValue = processInteractionObservable(sanitizedValue);
  return sanitizedValue;
}

module.exports = sanitizeHtmlAttributeValue;
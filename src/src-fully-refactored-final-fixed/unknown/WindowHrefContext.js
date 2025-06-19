/**
 * Represents a context holding a window reference and a URL/href string.
 *
 * @class WindowHrefContext
 * @param {object} windowReference - The window object or context to associate.
 * @param {string} href - The URL or href string to associate with the window.
 */
function WindowHrefContext(windowReference, href) {
  // Store the window reference (could be a browser window, iframe, or similar)
  this._window = windowReference;
  // Store the associated href (URL as a string)
  this._href = href;
}

module.exports = WindowHrefContext;
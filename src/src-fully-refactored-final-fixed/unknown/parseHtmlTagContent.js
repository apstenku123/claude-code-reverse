/**
 * Parses the content of an HTML-like tag string, extracting the inner HTML and determining if isBlobOrFileLikeObject is a self-closing tag.
 *
 * @param {string} tagString - The raw tag string to parse (e.g., '<div>', '<img />', '<a href="foo">').
 * @returns {{ html: string, closing: boolean }} An object containing the trimmed inner HTML and a flag indicating if the tag is self-closing.
 */
function parseHtmlTagContent(tagString) {
  // Find the index of the first space character in the tag string
  const spaceIndex = AJ1.spaceIndex(tagString);

  // If there is no space, check if the tag is self-closing by looking for '/' before the closing '>'
  if (spaceIndex === -1) {
    return {
      html: "",
      closing: tagString[tagString.length - 2] === "/"
    };
  }

  // Extract the content after the first space and before the closing '>'
  let innerContent = AJ1.trim(tagString.slice(spaceIndex + 1, -1));

  // Determine if the tag is self-closing (ends with '/')
  const isSelfClosing = innerContent[innerContent.length - 1] === "/";

  // If self-closing, remove the trailing '/' and trim again
  if (isSelfClosing) {
    innerContent = AJ1.trim(innerContent.slice(0, -1));
  }

  return {
    html: innerContent,
    closing: isSelfClosing
  };
}

module.exports = parseHtmlTagContent;
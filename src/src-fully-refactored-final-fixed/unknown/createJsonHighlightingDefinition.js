/**
 * Generates a syntax highlighting definition object for JSON, suitable for use with a syntax highlighter.
 *
 * @param {object} hljs - The syntax highlighting library instance, expected to provide various mode definitions and utilities.
 * @returns {object} The JSON syntax highlighting definition object.
 */
function createJsonHighlightingDefinition(hljs) {
  // Define JSON keywords
  const jsonKeywords = {
    literal: "true false null"
  };

  // Define comment modes (line and block comments)
  const commentModes = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE
  ];

  // Define value modes (strings and numbers)
  const valueModes = [
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE
  ];

  // Define the structure for JSON values (used for objects and arrays)
  const valueContainer = {
    end: ",",
    endsWithParent: true,
    excludeEnd: true,
    contains: valueModes,
    keywords: jsonKeywords
  };

  // Define the structure for JSON objects
  const objectMode = {
    begin: /\{/,
    end: /\}/,
    contains: [
      {
        className: "attr",
        begin: /"/,
        end: /"/,
        contains: [hljs.BACKSLASH_ESCAPE],
        illegal: "\\n"
      },
      // Inherit valueContainer and add a colon as the beginning
      hljs.inherit(valueContainer, {
        begin: /:/
      })
    ].concat(commentModes),
    illegal: "\\s"
  };

  // Define the structure for JSON arrays
  const arrayMode = {
    begin: "\\[",
    end: "\\]",
    contains: [hljs.inherit(valueContainer)],
    illegal: "\\s"
  };

  // Add object and array modes to valueModes
  valueModes.push(objectMode, arrayMode);

  // Add comment modes to valueModes as well
  commentModes.forEach(function(commentMode) {
    valueModes.push(commentMode);
  });

  // Return the final JSON highlighting definition
  return {
    name: "JSON",
    contains: valueModes,
    keywords: jsonKeywords,
    illegal: "\\s"
  };
}

module.exports = createJsonHighlightingDefinition;
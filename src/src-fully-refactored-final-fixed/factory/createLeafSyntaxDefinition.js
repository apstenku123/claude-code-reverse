/**
 * Factory function that returns a syntax highlighting definition for 'Leaf' functions.
 * This is likely used in a syntax highlighter to match and highlight function definitions
 * that start with one or more '#' characters, followed by a valid identifier and parameter list.
 *
 * @param {string} sourceObservable - (Unused) Placeholder for future extension or compatibility.
 * @returns {object} Syntax highlighting definition for 'Leaf' functions.
 */
function createLeafSyntaxDefinition(sourceObservable) {
  return {
    name: "Leaf",
    contains: [
      {
        className: "function",
        // Match function definitions that start with one or more '#' characters, followed by an identifier and '('
        begin: "#+[a-z0-9]*\\(",
        // End when a space is followed by an opening curly brace
        end: / \{/, 
        returnBegin: true, // Include the matched function in the highlighting
        excludeEnd: true,  // Exclude the ending '{' from the match
        contains: [
          {
            className: "keyword",
            // Highlight the leading '#' characters as a keyword
            begin: "#+"
          },
          {
            className: "title",
            // Highlight the function name (identifier)
            begin: "[a-z_][a-z0-9]*"
          },
          {
            className: "params",
            // Match and highlight the parameter list
            begin: "\\(",
            end: "\\)",
            endsParent: true, // End the parent match when parameters end
            contains: [
              {
                className: "string",
                // Highlight string literals inside parameters
                begin: '"',
                end: '"'
              },
              {
                className: "variable",
                // Highlight variable names inside parameters
                begin: "[a-z_][a-z0-9]*"
              }
            ]
          }
        ]
      }
    ]
  };
}

module.exports = createLeafSyntaxDefinition;
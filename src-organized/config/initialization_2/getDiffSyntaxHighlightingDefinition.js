/**
 * Returns the syntax highlighting definition for unified diff/patch files.
 * This definition is typically used by syntax highlighters (e.g., highlight.js)
 * to recognize and style diff/patch file formats.
 *
 * @returns {object} Syntax highlighting definition for diff/patch files
 */
function getDiffSyntaxHighlightingDefinition() {
  return {
    name: "Diff",
    aliases: ["patch"],
    contains: [
      {
        className: "meta",
        relevance: 10,
        // Recognizes diff hunk headers in various formats
        variants: [
          {
            begin: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@/
          },
          {
            begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
          },
          {
            begin: /^--- +\d+,\d+ +----$/
          }
        ]
      },
      {
        className: "comment",
        // Recognizes various diff/patch file comments and separators
        variants: [
          {
            begin: /Index: /,
            end: /$/
          },
          {
            begin: /^index/,
            end: /$/
          },
          {
            begin: /=\{3,}/,
            end: /$/
          },
          {
            begin: /^-{3}/,
            end: /$/
          },
          {
            begin: /^\*{3} /,
            end: /$/
          },
          {
            begin: /^\+{3}/,
            end: /$/
          },
          {
            begin: /^\*{15}$/
          },
          {
            begin: /^diff --git/,
            end: /$/
          }
        ]
      },
      {
        className: "addition",
        // Lines starting with '+' are additions
        begin: /^\+/,
        end: /$/
      },
      {
        className: "deletion",
        // Lines starting with '-' are deletions
        begin: /^-/,
        end: /$/
      },
      {
        className: "addition",
        // Lines starting with '!' are also considered additions (context diffs)
        begin: /^!/,
        end: /$/
      }
    ]
  };
}

module.exports = getDiffSyntaxHighlightingDefinition;
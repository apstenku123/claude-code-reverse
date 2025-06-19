/**
 * Defines syntax highlighting rules for Batch file (DOS) scripts.
 *
 * @param {object} hljs - The highlight.js library instance, providing COMMENT and inherit utilities.
 * @returns {object} Highlight.js language definition object for Batch files.
 */
function defineBatchFileHighlighting(hljs) {
  // Define how comments are matched: lines starting with optional whitespace and optional '@', then 'rem', until end of line
  const commentMode = hljs.COMMENT(/^\s*@?rem\b/, /$/, {
    relevance: 10
  });

  return {
    name: "Batch file (DOS)",
    aliases: ["bat", "cmd"],
    case_insensitive: true,
    illegal: /\/\*/, // Disallow C-style comments
    keywords: {
      keyword: "if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq",
      built_in: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux shift cd dir echo setlocal endlocal set pause copy append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color comp compact convert date dir diskcomp diskcopy doskey erase fs find findstr format ftype graftabl help keyb label md mkdir mode more move path pause print popd pushd promt useReactiveData recover rem rename replace restore rmdir shift sort start subst time title tree type ver verify vol ping net ipconfig taskkill xcopy ren del"
    },
    contains: [
      // Match variables: %%X, %VAR%, !VAR!
      {
        className: "variable",
        begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
      },
      // Match function/label definitions
      {
        className: "function",
        begin: /^[A-Za-z_.$?#@~][A-Za-z0-9_.$?#@~]*(?::|label)/, // Label or label with 'label' keyword
        end: "goto:eof",
        contains: [
          // Inherit title mode for label names
          hljs.inherit(hljs.TITLE_MODE, {
            begin: "([_a-zA-zA]\\w*\\.)*([_a-zA-zA]\\w*:)?[_a-zA-zA]\\w*"
          }),
          commentMode // Allow comments inside function definitions
        ]
      },
      // Match numbers
      {
        className: "number",
        begin: /\b\d+/, // Match whole numbers
        relevance: 0
      },
      // Comment mode
      commentMode
    ]
  };
}

module.exports = defineBatchFileHighlighting;

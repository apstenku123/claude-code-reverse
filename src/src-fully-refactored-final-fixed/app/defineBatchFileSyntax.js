/**
 * Defines syntax highlighting rules for Batch file (DOS) scripts.
 *
 * @param {object} syntaxHighlighter - The syntax highlighter instance providing COMMENT and inherit utilities.
 * @returns {object} Syntax definition object for Batch files.
 */
function defineBatchFileSyntax(syntaxHighlighter) {
  // Define the 'rem' comment pattern for batch files
  const remCommentPattern = syntaxHighlighter.COMMENT(
    /^\s*@?rem\b/, // Matches lines starting with optional whitespace and optional '@', then 'rem' as a word
    /$/,            // Matches until the end of the line
    { relevance: 10 }
  );

  return {
    name: "Batch file (DOS)",
    aliases: ["bat", "cmd"],
    case_insensitive: true,
    illegal: /\/\*/, // Illegal pattern: block comments (not valid in batch)
    keywords: {
      keyword: "if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq",
      built_in: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux shift cd dir echo setlocal endlocal set pause copy append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color comp compact convert date dir diskcomp diskcopy doskey erase fs find findstr format ftype graftabl help keyb label md mkdir mode more move path pause print popd pushd promt useReactiveData recover rem rename replace rmdir shift sort start subst time title tree type ver verify vol ping net ipconfig taskkill xcopy ren del"
    },
    contains: [
      // Variable patterns: %%var, %var%, !var!
      {
        className: "variable",
        begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
      },
      // Function/label definitions
      {
        className: "function",
        begin: /^[A-Za-z_.$?#@~][A-Za-z0-9_.$?#@~]*(?::|label)/, // Label or label with 'label' keyword
        end: "goto:eof",
        contains: [
          // Title mode for function/label names
          syntaxHighlighter.inherit(syntaxHighlighter.TITLE_MODE, {
            begin: "([_a-zA-zA]\\w*\\.)*([_a-zA-zA]\\w*:)?[_a-zA-zA]\\w*"
          }),
          remCommentPattern
        ]
      },
      // Numbers
      {
        className: "number",
        begin: "\\b\\d+",
        relevance: 0
      },
      // 'rem' comments
      remCommentPattern
    ]
  };
}

module.exports = defineBatchFileSyntax;

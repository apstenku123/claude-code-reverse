/**
 * Returns the syntax highlighting definition for BASIC language.
 *
 * @param {object} languageHelpers - An object containing helper modes and comment definitions for syntax highlighting.
 * @returns {object} The BASIC language definition object for syntax highlighting.
 */
function getBasicLanguageDefinition(languageHelpers) {
  return {
    name: "BASIC",
    case_insensitive: true, // BASIC is not case sensitive
    illegal: "^.", // Illegal pattern for the start of a line
    keywords: {
      // Pattern for valid BASIC keywords/identifiers
      $pattern: "[a-zA-Z][a-zA-Z0-9_$%!#]*",
      // List of BASIC keywords (with variants and aliases)
      keyword:
        "ABS ASC AND ATN AUTO|0 BEEP BLOAD|10 BSAVE|10 CALL CALLS CDBL CHAIN CHDIR CHR$|10 CINT CIRCLE CLEAR CLOSE CLS COLOR COM COMMON CONT COS CSNG CSRLIN CVD CVI CVS DATA DATE$ DEFDBL DEFINT DEFSNG DEFSTR DEF|0 SEG USR DELETE DIM DRAW EDIT END ENVIRON ENVIRON$ EOF EQV ERASE ERDEV ERDEV$ ERL ERR ERROR EXP FIELD FILES FIX FOR|0 FRE GET GOSUB|10 GOTO HEX$ IF THEN ELSE|0 INKEY$ INP INPUT INPUT# INPUT$ INSTR IMP INT IOCTL IOCTL$ KEY KEY OFF LIST KILL LEFT$ LEN LET LINE LLIST LOAD LOC LOCATE LOF LOG LPRINT USING LSET MERGE MID$ MKDIR MKD$ MKI$ MKS$ MOD NAME NEW NEXT NOISE NOT OCT$ KEY OR PEN PLAY STRIG OPEN OPTION BASE OUT PAINT PALETTE PCOPY PEEK PMAP POINT POKE POS PRINT PRINT] PSET PRESET PUT RANDOMIZE READ REM RENUM RESET|0 RESTORE RESUME RETURN|0 RIGHT$ RMDIR RND RSET RUN SAVE SCREEN SGN SHELL SIN SOUND SPACE$ SPC SQR STEP STICK STOP STR$ STRING$ SWAP SYSTEM TAB TAN TIME$ TIMER TROFF TRON TO USR VAL VARPTR VARPTR$ VIEW WAIT WHILE WEND WIDTH WINDOW WRITE XOR"
    },
    contains: [
      // String literals
      languageHelpers.QUOTE_STRING_MODE,
      // REM comments (end at line end, high relevance)
      languageHelpers.COMMENT("REM", "$", { relevance: 10 }),
      // Single quote comments (end at line end, normal relevance)
      languageHelpers.COMMENT("'", "$", { relevance: 0 }),
      // Line numbers at the start of a line (BASIC uses these as symbols)
      {
        className: "symbol",
        begin: "^[0-9]+ ",
        relevance: 10
      },
      // Decimal numbers (with optional exponent and type suffix)
      {
        className: "number",
        begin: "\\b\\d+(\\.\\d+)?([edED]\\d+)?[#!]?",
        relevance: 0
      },
      // Hexadecimal numbers (e.g., &H1A)
      {
        className: "number",
        begin: "(&[hH][0-9a-fA-F]{1,4})"
      },
      // Octal numbers (e.g., &O123)
      {
        className: "number",
        begin: "(&[oO][0-7]{1,6})"
      }
    ]
  };
}

module.exports = getBasicLanguageDefinition;
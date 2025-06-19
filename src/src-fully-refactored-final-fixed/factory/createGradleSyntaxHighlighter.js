/**
 * Factory function that creates a syntax highlighting definition for Gradle scripts.
 *
 * @param {object} syntaxHelpers - An object containing standard syntax highlighting modes (e.g., comment, string, number, regexp modes).
 * @returns {object} Syntax highlighting definition for Gradle, compatible with highlight.js or similar libraries.
 */
function createGradleSyntaxHighlighter(syntaxHelpers) {
  return {
    name: "Gradle",
    case_insensitive: true, // Gradle keywords are case-insensitive
    keywords: {
      keyword:
        "task project allprojects subprojects artifacts buildscript configurations dependencies repositories sourceSets description delete from into include exclude source classpath destinationDir includes options sourceCompatibility targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant def abstract break case catch continue default do else extends final finally for if implements instanceof native new private protected public return static switch synchronized throw throws transient try volatile while strictfp package import false null super this true antlrtask checkstyle codenarc copy boolean byte char class double float int interface long short void compile runTime file fileTree abs any append asList asWritable call collect compareTo count div dump each eachByte eachFile eachLine every find findAll flatten getAt getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter newReader newWriter next plus pop power previous print println push putAt read readBytes readLines reverse reverseEach round size sort splitEachLine step subMap times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader withStream withWriterAppend write writeLine"
    },
    // Use standard syntax highlighting modes for comments, strings, numbers, and regexps
    contains: [
      syntaxHelpers.C_LINE_COMMENT_MODE, // Single-line comments
      syntaxHelpers.C_BLOCK_COMMENT_MODE, // Multi-line comments
      syntaxHelpers.APOS_STRING_MODE, // Single-quoted strings
      syntaxHelpers.QUOTE_STRING_MODE, // Double-quoted strings
      syntaxHelpers.NUMBER_MODE, // Numbers
      syntaxHelpers.REGEXP_MODE // Regular expressions
    ]
  };
}

module.exports = createGradleSyntaxHighlighter;
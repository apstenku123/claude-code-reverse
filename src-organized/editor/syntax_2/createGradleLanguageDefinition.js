/**
 * Factory function that creates a syntax highlighting definition for the Gradle build language.
 *
 * @param {object} syntaxModes - An object containing syntax mode definitions (e.g., comment, string, number modes).
 *   This is typically provided by a syntax highlighting library and includes standard modes for comments, strings, numbers, and regex.
 * @returns {object} Gradle language definition object for use in syntax highlighters.
 */
function createGradleLanguageDefinition(syntaxModes) {
  return {
    name: "Gradle",
    case_insensitive: true, // Gradle keywords are case-insensitive
    keywords: {
      // List of Gradle and Groovy keywords, tasks, and common identifiers
      keyword: "task project allprojects subprojects artifacts buildscript configurations dependencies repositories sourceSets description delete from into include exclude source classpath destinationDir includes options sourceCompatibility targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant def abstract break case catch continue default do else extends final finally for if implements instanceof native new private protected public return static switch synchronized throw throws transient try volatile while strictfp package import false null super this true antlrtask checkstyle codenarc copy boolean byte char class double float int interface long short void compile runTime file fileTree abs any append asList asWritable call collect compareTo count div dump each eachByte eachFile eachLine every find findAll flatten getAt getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter newReader newWriter next plus pop power previous print println push putAt read readBytes readLines reverse reverseEach round size sort splitEachLine step subMap times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader withStream withWriter withWriterAppend write writeLine"
    },
    // Includes standard comment, string, number, and regex modes from the syntaxModes dependency
    contains: [
      syntaxModes.C_LINE_COMMENT_MODE,    // Single-line comments
      syntaxModes.C_BLOCK_COMMENT_MODE,   // Multi-line comments
      syntaxModes.APOS_STRING_MODE,       // Single-quoted strings
      syntaxModes.QUOTE_STRING_MODE,      // Double-quoted strings
      syntaxModes.NUMBER_MODE,            // Numbers
      syntaxModes.REGEXP_MODE             // Regular expressions
    ]
  };
}

module.exports = createGradleLanguageDefinition;
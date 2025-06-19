/**
 * Factory function that creates a syntax highlighting definition for Gradle files.
 * This definition is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} syntaxHelpers - An object containing standard syntax highlighting modes (e.g., comment, string, number, regexp modes).
 * @returns {object} Gradle syntax highlighting definition object.
 */
function createGradleSyntaxDefinition(syntaxHelpers) {
  return {
    name: "Gradle",
    case_insensitive: true, // Gradle keywords are case-insensitive
    keywords: {
      // List of Gradle and Groovy keywords, tasks, and common identifiers
      keyword:
        "task project allprojects subprojects artifacts buildscript configurations dependencies repositories sourceSets description delete from into include exclude source classpath destinationDir includes options sourceCompatibility targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant def abstract break case catch continue default do else extends final finally for if implements instanceof native new private protected public return static switch synchronized throw throws transient try volatile while strictfp package import false null super this true antlrtask checkstyle codenarc copy boolean byte char class double float int interface long short void compile runTime file fileTree abs any append asList asWritable call collect compareTo count div dump each eachByte eachFile eachLine every find findAll flatten getAt getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter newReader newWriter next plus pop power previous print println push putAt read readBytes readLines reverse reverseEach round size sort splitEachLine step subMap times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader withStream withWriter withWriterAppend write writeLine"
    },
    contains: [
      // Standard comment, string, number, and regexp modes from the syntaxHelpers object
      syntaxHelpers.C_LINE_COMMENT_MODE,
      syntaxHelpers.C_BLOCK_COMMENT_MODE,
      syntaxHelpers.APOS_STRING_MODE,
      syntaxHelpers.QUOTE_STRING_MODE,
      syntaxHelpers.NUMBER_MODE,
      syntaxHelpers.REGEXP_MODE
    ]
  };
}

module.exports = createGradleSyntaxDefinition;
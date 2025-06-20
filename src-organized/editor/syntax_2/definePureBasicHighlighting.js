/**
 * Defines the syntax highlighting configuration for the PureBASIC language.
 *
 * @param {object} hljs - The highlight.js library instance, used to access built-in modes and helpers.
 * @returns {object} The language definition object for PureBASIC highlighting.
 */
function definePureBasicHighlighting(hljs) {
  // String literal configuration: matches optional (~) and double-quoted strings, disallows newlines
  const stringMode = {
    className: "string",
    begin: '(~)?"',
    end: '"',
    illegal: "\\n"
  };

  // Symbol configuration: matches PureBASIC symbols like #CONSTANT_NAME
  const symbolMode = {
    className: "symbol",
    begin: "#[a-zA-Z_]\\w*\\$?"
  };

  return {
    name: "PureBASIC",
    aliases: ["pb", "pbi"],
    // List of PureBASIC keywords for syntax highlighting
    keywords: "Align And Array As Break CallDebugger Case CompilerCase CompilerDefault CompilerElse CompilerElseIf CompilerEndIf CompilerEndSelect CompilerError CompilerIf CompilerSelect CompilerWarning Continue Data DataSection Debug DebugLevel Declare DeclareC DeclareCDLL DeclareDLL DeclareModule Default Define Dim DisableASM DisableDebugger DisableExplicit Else ElseIf EnableASM EnableDebugger EnableExplicit End EndDataSection EndDeclareModule EndEnumeration EndIf EndImport EndInterface EndMacro EndModule EndProcedure EndSelect EndStructure EndStructureUnion EndWith Enumeration EnumerationBinary Extends FakeReturn For ForEach ForEver Global Gosub Goto If Import ImportC IncludeBinary IncludeFile IncludePath Interface List Macro MacroExpandedCount Map Module NewList NewMap Next Not Or Procedure ProcedureC ProcedureCDLL ProcedureDLL ProcedureReturn Protected Prototype PrototypeC ReDim Read Repeat Restore Return Runtime Select Shared Static Step Structure StructureUnion Swap Threaded To UndefineMacro Until Until  UnuseModule UseModule Wend While With XIncludeFile XOr",
    contains: [
      // Single-line comment: starts with ';' and goes to end of line
      hljs.COMMENT(";", "$", { relevance: 0 }),
      {
        // Function/procedure declaration: matches Procedure/Declare (with optional C/CDLL/DLL)
        className: "function",
        begin: "\\b(Procedure|Declare)(C|CDLL|DLL)?\\b",
        end: "\\(",
        excludeEnd: true,
        returnBegin: true,
        contains: [
          {
            // Highlight the keyword part (Procedure/Declare)
            className: "keyword",
            begin: "(Procedure|Declare)(C|CDLL|DLL)?",
            excludeEnd: true
          },
          {
            // Optional type annotation: .TypeName
            className: "type",
            begin: "\\.\\w*"
          },
          // Title mode for function/procedure name
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      stringMode,
      symbolMode
    ]
  };
}

module.exports = definePureBasicHighlighting;
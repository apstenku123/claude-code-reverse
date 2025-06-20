/**
 * Defines syntax highlighting rules for the Julia programming language.
 *
 * @param {object} hljs - The highlight.js library object, providing built-in modes and helpers.
 * @returns {object} Highlight.js language definition object for Julia.
 */
function defineJuliaHighlighting(hljs) {
  // Regular expression for valid Julia identifiers
  const IDENTIFIER_REGEX = "[a-z_\\u00A1-\\uFFFF][a-z0-9\u00A1-\uFFFF]*";

  // Julia keywords
  const KEYWORDS = [
    "baremodule", "begin", "break", "catch", "ccall", "const", "continue", "do", "else", "elseif", "end", "export", "false", "finally", "for", "function", "global", "if", "import", "in", "isa", "let", "local", "macro", "module", "quote", "return", "true", "try", "using", "where", "while"
  ];

  // Julia literals
  const LITERALS = [
    "ARGS", "C_NULL", "DEPOT_PATH", "ENDIAN_BOM", "ENV", "Inf", "Inf16", "Inf32", "Inf64", "InsertionSort", "LOAD_PATH", "MergeSort", "NaN", "NaN16", "NaN32", "NaN64", "PROGRAM_FILE", "QuickSort", "RoundDown", "RoundFromZero", "RoundNearest", "RoundNearestTiesAway", "RoundNearestTiesUp", "RoundToZero", "RoundUp", "VERSION|0", "devnull", "false", "im", "missing", "nothing", "getEndIndexOfInteractionEntry", "stderr", "stdin", "stdout", "true", "undef", "π", "ℯ"
  ];

  // Julia built-in types and functions
  const BUILT_INS = [
    "AbstractArray", "AbstractChannel", "AbstractChar", "AbstractDict", "AbstractDisplay", "AbstractFloat", "AbstractIrrational", "AbstractMatrix", "AbstractRange", "AbstractSet", "AbstractString", "AbstractUnitRange", "AbstractVecOrMat", "AbstractVector", "Any", "ArgumentError", "Array", "AssertionError", "BigFloat", "BigInt", "BitArray", "BitMatrix", "BitSet", "BitVector", "Bool", "BoundsError", "CapturedException", "CartesianIndex", "CartesianIndices", "Cchar", "Cdouble", "Cfloat", "Channel", "Char", "Cint", "Cintmax_t", "Clong", "Clonglong", "Cmd", "Colon", "Complex", "ComplexF16", "ComplexF32", "ComplexF64", "CompositeException", "Condition", "Cptrdiff_t", "Cshort", "Csize_t", "Cssize_t", "Cstring", "Cuchar", "Cuint", "Cuintmax_t", "Culong", "Culonglong", "Cushort", "Cvoid", "Cwchar_t", "Cwstring", "DataType", "DenseArray", "DenseMatrix", "DenseVecOrMat", "DenseVector", "Dict", "DimensionMismatch", "Dims", "DivideError", "DomainError", "EOFError", "Enum", "ErrorException", "Exception", "ExponentialBackOff", "Expr", "Float16", "Float32", "Float64", "Function", "GlobalRef", "HTML", "IO", "IOBuffer", "IOContext", "IOStream", "IdDict", "IndexCartesian", "IndexLinear", "IndexStyle", "InexactError", "InitError", "Int", "Int128", "Int16", "Int32", "Int64", "Int8", "Integer", "InterruptException", "InvalidStateException", "Irrational", "KeyError", "LinRange", "LineNumberNode", "LinearIndices", "LoadError", "MIME", "Matrix", "Method", "MethodError", "Missing", "MissingException", "Module", "NTuple", "NamedTuple", "Nothing", "Number", "OrdinalRange", "OutOfMemoryError", "OverflowError", "Pair", "PartialQuickSort", "PermutedDimsArray", "Pipe", "ProcessFailedException", "Ptr", "QuoteNode", "Rational", "RawFD", "ReadOnlyMemoryError", "Real", "ReentrantLock", "Ref", "Regex", "RegexMatch", "RoundingMode", "SegmentationFault", "Set", "Signed", "Some", "StackOverflowError", "StepRange", "StepRangeLen", "StridedArray", "StridedMatrix", "StridedVecOrMat", "StridedVector", "String", "StringIndexError", "SubArray", "SubString", "SubstitutionString", "Symbol", "SystemError", "Task", "TaskFailedException", "Text", "TextDisplay", "Timer", "Tuple", "Type", "TypeError", "TypeVar", "UInt", "UInt128", "UInt16", "UInt32", "UInt64", "UInt8", "UndefInitializer", "UndefKeywordError", "UndefRefError", "UndefVarError", "Union", "UnionAll", "UnitRange", "Unsigned", "Val", "Vararg", "VecElement", "VecOrMat", "Vector", "VersionNumber", "WeakKeyDict", "WeakRef"
  ];

  // Keyword definition object for highlight.js
  const JULIA_KEYWORDS = {
    $pattern: IDENTIFIER_REGEX,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS
  };

  // Main language definition object
  const juliaDefinition = {
    keywords: JULIA_KEYWORDS,
    illegal: /<\//
  };

  // Number literal highlighting
  const numberMode = {
    className: "number",
    begin: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)[eE][-+]?\d+|\b0[box][0-9][0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
    relevance: 0
  };

  // Character literal highlighting
  const charMode = {
    className: "string",
    begin: /'(.|\\[xXuU][A-f0-9]+)'/
  };

  // Interpolation substitution highlighting: $( ... )
  const substitutionMode = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    keywords: JULIA_KEYWORDS
  };

  // Interpolated variable highlighting: $identifier
  const interpolatedVariableMode = {
    className: "variable",
    begin: "$" + IDENTIFIER_REGEX
  };

  // String literal highlighting (triple and single double-quoted)
  const stringMode = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, substitutionMode, interpolatedVariableMode],
    variants: [
      {
        begin: /\\w*"""/,
        end: /"""\w*/,
        relevance: 10
      },
      {
        begin: /\\w*"/,
        end: /"\w*/
      }
    ]
  };

  // Command string literal highlighting (backticks)
  const commandStringMode = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, substitutionMode, interpolatedVariableMode],
    begin: "`",
    end: "`"
  };

  // Macro highlighting: @identifier
  const macroMode = {
    className: "meta",
    begin: "@" + IDENTIFIER_REGEX
  };

  // Comment highlighting (single and multi-line)
  const commentMode = {
    className: "comment",
    variants: [
      {
        begin: "#=",
        end: "=#",
        relevance: 10
      },
      {
        begin: "#",
        end: "$"
      }
    ]
  };

  // Compose the main 'contains' array for the language definition
  juliaDefinition.name = "Julia";
  juliaDefinition.contains = [
    numberMode,
    charMode,
    stringMode,
    commandStringMode,
    macroMode,
    commentMode,
    hljs.HASH_COMMENT_MODE,
    {
      className: "keyword",
      // Highlight type and struct definitions
      begin: "\\b(((abstract|primitive)\\s+)type|(mutable\\s+)?struct)\\b"
    },
    {
      // Highlight type parameter syntax
      begin: /<:/
    }
  ];

  // Allow substitutions inside substitutions
  substitutionMode.contains = juliaDefinition.contains;

  return juliaDefinition;
}

module.exports = defineJuliaHighlighting;

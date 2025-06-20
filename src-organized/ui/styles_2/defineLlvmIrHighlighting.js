/**
 * Defines syntax highlighting rules for LLVM IR language for a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance, providing COMMENT and QUOTE_STRING_MODE helpers.
 * @returns {object} Highlighting definition object for LLVM IR.
 */
function defineLlvmIrHighlighting(hljs) {
  // Matches LLVM identifiers (e.g., variable names, types)
  const IDENTIFIER_REGEX = /([-a-zA-zA$._][\w$.-]*)/;

  // Matches LLVM IR type tokens like 'i32', 'i64', etc.
  const TYPE_MODE = {
    className: "type",
    begin: /\bi\d+(?=\s|\b)/
  };

  // Matches assignment operator '='
  const OPERATOR_MODE = {
    className: "operator",
    relevance: 0,
    begin: /=/
  };

  // Matches punctuation: comma ','
  const PUNCTUATION_MODE = {
    className: "punctuation",
    relevance: 0,
    begin: /,/
  };

  // Matches numeric literals: hexadecimal and decimal (with optional exponent)
  const NUMBER_MODE = {
    className: "number",
    variants: [
      { begin: /0[xX][A-f0-9]+/ }, // Hexadecimal
      { begin: /-?\d+(?:[.]\d+)?(?:[eE][-+]?\d+(?:[.]\d+)?)?/ } // Decimal, float, scientific
    ],
    relevance: 0
  };

  // Matches symbol labels at the start of a line (e.g., 'entry:')
  const SYMBOL_MODE = {
    className: "symbol",
    variants: [
      { begin: /^\s*[a-z]+:/ }
    ],
    relevance: 0
  };

  // Matches variable references (e.g., %var, %1, #1)
  const VARIABLE_MODE = {
    className: "variable",
    variants: [
      { begin: j51(/%/, IDENTIFIER_REGEX) }, // e.g., %foo
      { begin: /%\d+/ },                   // e.g., %1
      { begin: /#\d+/ }                    // e.g., #1
    ]
  };

  // Matches function, label, or special titles (e.g., @main, !dbg, etc.)
  const TITLE_MODE = {
    className: "title",
    variants: [
      { begin: j51(/@/, IDENTIFIER_REGEX) }, // e.g., @main
      { begin: /@\d+/ },                    // e.g., @1
      { begin: j51(/!/, IDENTIFIER_REGEX) }, // e.g., !dbg
      { begin: j51(/!\d+/, IDENTIFIER_REGEX) }, // e.g., !123abc
      { begin: /!\d+/ }                     // e.g., !1
    ]
  };

  return {
    name: "LLVM IR",
    // List of LLVM IR keywords for highlighting
    keywords: "begin end true false declare define global constant private linker_private internal available_externally linkonce linkonce_odr weak weak_odr appending dllimport dllexport common default hidden protected extern_weak external thread_local zeroinitializer undef null to tail target triple datalayout volatile nuw nsw nnan ninf nsz arcp fast exact inbounds align addrspace section alias module asm sideeffect gc dbg linker_private_weak attributes blockaddress initialexec localdynamic localexec prefix unnamed_addr ccc fastcc coldcc x86_stdcallcc x86_fastcallcc arm_apcscc arm_aapcscc arm_aapcs_vfpcc ptx_device ptx_kernel intel_ocl_bicc msp430_intrcc spir_func spir_kernel x86_64_sysvcc x86_64_win64cc x86_thiscallcc cc c signext zeroext inreg sret nounwind noreturn noalias nocapture byval nest readnone readonly inlinehint noinline alwaysinline optsize ssp sspreq noredzone noimplicitfloat naked builtin cold nobuiltin noduplicate nonlazybind optnone returns_twice sanitize_address sanitize_memory sanitize_thread sspstrong uwtable returned type opaque eq extractRelevantInteractionId slt sgt sle sge ult ugt ule uge oeq one olt ogt ole oge ord uno ueq une x acq_rel acquire alignstack atomic catch cleanup filter inteldialect max min monotonic nand personality release seq_cst singlethread umax umin unordered xchg add fadd sub fsub mul fmul udiv sdiv fdiv urem srem frem shl lshr ashr and or xor icmp fcmp phi call trunc zext sext fptrunc fpext uitofp sitofp fptoui fptosi inttoptr ptrtoint bitcast addrspacecast select va_arg ret br switch invoke unwind unreachable indirectbr landingpad resume malloc alloca free load store getelementptr extractelement insertelement shufflevector getresult extractvalue insertvalue atomicrmw cmpxchg fence argmemonly double",
    contains: [
      TYPE_MODE,
      // Single-line comment ending with semicolon at end of line (low relevance)
      hljs.COMMENT(/;\s*$/, null, { relevance: 0 }),
      // General single-line comment starting with ';'
      hljs.COMMENT(/;/, /$/),
      // Standard quoted string mode
      hljs.QUOTE_STRING_MODE,
      // Custom string mode for LLVM IR (double quotes, not escaped by backslash)
      {
        className: "string",
        variants: [
          { begin: /"/, end: /[^\\]"/ }
        ]
      },
      TITLE_MODE,
      PUNCTUATION_MODE,
      OPERATOR_MODE,
      VARIABLE_MODE,
      SYMBOL_MODE,
      NUMBER_MODE
    ]
  };
}

module.exports = defineLlvmIrHighlighting;

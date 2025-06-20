/**
 * Returns the syntax highlighting definition for Verilog and SystemVerilog languages.
 *
 * @param {object} highlightJsInstance - The highlight.js instance providing language modes and utilities.
 * @returns {object} The language definition object for Verilog highlighting.
 */
function getVerilogHighlightingDefinition(highlightJsInstance) {
  return {
    name: "Verilog",
    aliases: ["createRangeIterator", "sv", "svh"],
    case_insensitive: false,
    keywords: {
      // Pattern for matching keywords, identifiers, etc.
      $pattern: /[\w\$]+/,
      // List of Verilog/SystemVerilog keywords
      keyword:
        "accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind bins binsof bit break buf|0 bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup endinterface endmodule endpackage endprimitive endprogram endproperty endspecify endsequence endtable endtask enum event eventually expect export extends extern final first_match for force foreach forever fork forkjoin function generate|5 genvar global highz0 highz1 if iff ifnone ignore_bins illegal_bins implements implies import incdir include initial inout input inside instance int integer interconnect interface intersect join join_any join_none large let liblist library local localparam logic longint macromodule matches medium modport module nand negedge nettype new nexttime nmos nor noshowcancelled not notif0 notif1 or output package packed parameter pmos posedge primitive priority program property protected pull0 pull1 pulldown pullup pulsestyle_ondetect pulsestyle_onevent pure rand randc randcase randsequence rcmos real realtime ref reg reject_on release repeat restrict return rnmos rpmos rtran rtranif0 rtranif1 s_always s_eventually s_nexttime s_until s_until_with scalared sequence shortint shortreal showcancelled signed small soft solve specify specparam static string strong strong0 strong1 struct super supply0 supply1 sync_accept_on sync_reject_on table tagged task this throughout time timeprecision timeunit tran tranif0 tranif1 tri tri0 tri1 triand trior trireg type typedef union unique unique0 unsigned until until_with untyped use uwire var vectored virtual void wait wait_order wand weak weak0 weak1 while wildcard wire with within wor xnor xor",
      // Literal values
      literal: "null",
      // Built-in system tasks and functions
      built_in:
        "$finish $stop $exit $fatal $error $warning $info $realtime $time $printtimescale $bitstoreal $bitstoshortreal $itor $signed $cast $bits $stime $timeformat $realtobits $shortrealtobits $rtoi $unsigned $asserton $assertkill $assertpasson $assertfailon $assertnonvacuouson $assertoff $assertcontrol $assertpassoff $assertfailoff $assertvacuousoff $isunbounded $sampled $fell $changed $past_gclk $fell_gclk $changed_gclk $rising_gclk $steady_gclk $coverage_control $coverage_get $coverage_save $set_coverage_db_name $rose $stable $past $rose_gclk $stable_gclk $future_gclk $falling_gclk $changing_gclk $display $coverage_get_max $coverage_merge $get_coverage $load_coverage_db $typename $unpacked_dimensions $left $low $increment $clog2 $ln $log10 $exp $sqrt $pow $floor $ceil $sin $cos $tan $countbits $onehot $isunknown $fatal $warning $dimensions $right $high $size $asin $acos $atan $atan2 $hypot $sinh $cosh $tanh $asinh $acosh $atanh $countones $onehot0 $error $info $random $dist_chi_square $dist_erlang $dist_exponential $dist_normal $dist_poisson $dist_t $dist_uniform $q_initialize $q_remove $q_exam $async$and$array $async$nand$array $async$or$array $async$nor$array $sync$and$array $sync$nand$array $sync$or$array $sync$nor$array $q_add $q_full $psprintf $async$and$plane $async$nand$plane $async$or$plane $async$nor$plane $sync$and$plane $sync$nand$plane $sync$or$plane $sync$nor$plane $system $display $displayb $displayh $displayo $strobe $strobeb $strobeh $strobeo $write $readmemb $readmemh $writememh $value$plusargs $dumpvars $dumpon $dumplimit $dumpports $dumpportson $dumpportslimit $writeb $writeh $writeo $monitor $monitorb $monitorh $monitoro $writememb $dumpfile $dumpoff $dumpall $dumpflush $dumpportsoff $dumpportsall $dumpportsflush $fclose $fdisplay $fdisplayb $fdisplayh $fdisplayo $fstrobe $fstrobeb $fstrobeh $fstrobeo $swrite $swriteb $swriteh $swriteo $fscanf $fread $fseek $fflush $feof $fopen $fwrite $fwriteb $fwriteh $fwriteo $fmonitor $fmonitorb $fmonitorh $fmonitoro $sformat $sformatf $fgetc $ungetc $fgets $sscanf $rewind $ftell $ferror"
    },
    contains: [
      // Block comments (/* ... */)
      highlightJsInstance.C_BLOCK_COMMENT_MODE,
      // Line comments (// ...)
      highlightJsInstance.C_LINE_COMMENT_MODE,
      // String literals ("..." or '...')
      highlightJsInstance.QUOTE_STRING_MODE,
      // Number literals (binary, hex, octal, decimal, with size and base)
      {
        className: "number",
        contains: [highlightJsInstance.BACKSLASH_ESCAPE],
        variants: [
          {
            // e.g., 8'hFF, 4'b1010, 16'd255
            begin: "\\b((\\d+'(b|h|processSubLanguageHighlighting|d|createPropertyAccessor|H|createDebouncedFunction|createCompatibleVersionChecker))[0-9xzXZa-fA-F_]+)"
          },
          {
            // e.g., 'hFF, 'b1010
            begin: "\\b(('(b|h|processSubLanguageHighlighting|d|createPropertyAccessor|H|createDebouncedFunction|createCompatibleVersionChecker))[0-9xzXZa-fA-F_]+)"
          },
          {
            // Simple decimal numbers
            begin: "\\b([0-9_])+",
            relevance: 0
          }
        ]
      },
      // Variables and parameterized module instantiations
      {
        className: "variable",
        variants: [
          {
            // Parameterized module instantiation: #( ... )
            begin: "#\\((?!parameter).+\\)"
          },
          {
            // Dot-prefixed identifiers (e.g., .foo)
            begin: "\\.\\w+",
            relevance: 0
          }
        ]
      },
      // Preprocessor directives (meta)
      {
        className: "meta",
        begin: "`",
        end: "$",
        keywords: {
          "meta-keyword":
            "define __FILE__ __LINE__ begin_keywords celldefine default_nettype define else elsif end_keywords endcelldefine endif ifdef ifndef include line nounconnected_drive pragma resetall timescale unconnected_drive undef undefineall"
        },
        relevance: 0
      }
    ]
  };
}

module.exports = getVerilogHighlightingDefinition;

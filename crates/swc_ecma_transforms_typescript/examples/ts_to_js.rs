//! Usage: cargo run --example ts_to_js path/to/ts
//!
//! This program will emit output to stdout.

use std::{env, path::Path};
use swc_common::{
    self,
    comments::SingleThreadedComments,
    errors::{ColorConfig, Handler},
    sync::Lrc,
    Mark, SourceMap,
};
use swc_ecma_codegen::{text_writer::JsWriter, Emitter};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};
use swc_ecma_transforms_base::{fixer::fixer, hygiene::hygiene, resolver::resolver_with_mark};
use swc_ecma_transforms_typescript::strip;
use swc_ecma_visit::FoldWith;

fn main() {
    let cm: Lrc<SourceMap> = Default::default();
    let handler = Handler::with_tty_emitter(ColorConfig::Auto, true, false, Some(cm.clone()));

    // Real usage
    // let fm = cm
    //     .load_file(Path::new("test.js"))
    //     .expect("failed to load test.js");

    let input = env::args()
        .nth(1)
        .expect("please provide the path of input typescript file");

    let fm = cm
        .load_file(Path::new(&input))
        .expect("failed to load input typescript file");

    let comments = SingleThreadedComments::default();

    let lexer = Lexer::new(
        Syntax::Typescript(TsConfig {
            tsx: input.ends_with(".tsx"),
            ..Default::default()
        }),
        Default::default(),
        StringInput::from(&*fm),
        Some(&comments),
    );

    let mut parser = Parser::new_from(lexer);

    for e in parser.take_errors() {
        e.into_diagnostic(&handler).emit();
    }

    let module = parser
        .parse_module()
        .map_err(|e| e.into_diagnostic(&handler).emit())
        .expect("failed to parse module.");

    let top_level_mark = Mark::fresh(Mark::root());

    // Optionally transforms decorators here before the resolver pass
    // as it might produce runtime declarations.

    // Conduct identifier scope analysis
    let module = module.fold_with(&mut resolver_with_mark(top_level_mark));

    // Remove typescript types
    let module = module.fold_with(&mut strip(top_level_mark));

    // Fix up any identifiers with the same name, but different contexts
    let module = module.fold_with(&mut hygiene());

    // Ensure that we have enough parenthesis.
    let module = module.fold_with(&mut fixer(Some(&comments)));

    let mut buf = vec![];
    {
        let mut emitter = Emitter {
            cfg: swc_ecma_codegen::Config { minify: false },
            cm: cm.clone(),
            comments: Some(&comments),
            wr: JsWriter::new(cm.clone(), "\n", &mut buf, None),
        };

        emitter.emit_module(&module).unwrap();
    }

    println!("{}", String::from_utf8(buf).expect("non-utf8?"));
}

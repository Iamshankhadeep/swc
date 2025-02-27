// @module: commonjs
// @Filename: foo_0.ts
export var foo = 42;
// @Filename: test/test/foo_1.ts
export function f() {
    return 42;
}
// @Filename: test/foo_2.ts
export var M2;
(function(M21) {
    M21.x = true;
})(M2 || (M2 = {
}));
// @Filename: test/foo_3.ts
const foo0 = require('../foo_0');
const foo1 = require('./test/foo_1');
const foo2 = require('./.././test/foo_2');
if (foo2.M2.x) {
    var x = foo0.foo + foo1.f();
}

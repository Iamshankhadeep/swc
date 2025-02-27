class SomeBase {
}
class SomeDerived1 extends SomeBase {
}
class SomeDerived2 extends SomeBase {
}
class SomeDerived3 extends SomeBase {
}
var fn1;
// Ambiguous call picks the first overload in declaration order
var s = new fn1(undefined);
var s;
// No candidate overloads found
new fn1({
}); // Error
var fn2;
var d = new fn2(0, undefined);
var d;
// Generic and non - generic overload where generic overload is the only candidate when called without type arguments
var s = new fn2(0, '');
// Generic and non - generic overload where non - generic overload is the only candidate when called with type arguments
new fn2('', 0); // Error
// Generic and non - generic overload where non - generic overload is the only candidate when called without type arguments
new fn2('', 0); // OK
var fn3;
var s = new fn3(3);
var s = new fn3('', 3, '');
var n = new fn3(5, 5, 5);
var n;
// Generic overloads with differing arity called with type arguments matching each overload type parameter count
var s = new fn3(4);
var s = new fn3('', '', '');
var n = new fn3('', '', 3);
// Generic overloads with differing arity called with type argument count that doesn't match any overload
new fn3(); // Error
var fn4;
new fn4('', 3);
new fn4(3, ''); // Error
new fn4('', 3); // Error
new fn4(3, '');
// Generic overloads with constraints called without type arguments but with types that satisfy the constraints
new fn4('', 3);
new fn4(3, '');
new fn4(3, undefined);
new fn4('', null);
// Generic overloads with constraints called with type arguments that do not satisfy the constraints
new fn4(null, null); // Error
// Generic overloads with constraints called without type arguments but with types that do not satisfy the constraints
new fn4(true, null); // Error
new fn4(null, true); // Error
var fn5;
var n = new fn5((n1)=>n1.toFixed()
);
var s = new fn5((n2)=>n2.substr(0)
);

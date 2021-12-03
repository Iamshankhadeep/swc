function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
// @strict: true
function f1(obj) {
    if (obj.a) {
        obj = {
        };
        var a1 = obj["a"]; // string | undefined
        var a2 = obj.a; // string | undefined
    }
}
function f2(obj) {
    var a0 = obj[0]; // number | null
    var a1 = obj[1]; // string | null
    var _obj = _slicedToArray(obj, 2), b0 = _obj[0], b1 = _obj[1];
    var ref2;
    ref2 = _slicedToArray(obj, 2), a0 = ref2[0], a1 = ref2[1], ref2;
    if (obj[0] && obj[1]) {
        var c0 = obj[0]; // number
        var c1 = obj[1]; // string
        var _obj1 = _slicedToArray(obj, 2), d0 = _obj1[0], d1 = _obj1[1];
        var ref1;
        ref1 = _slicedToArray(obj, 2), c0 = ref1[0], c1 = ref1[1], ref1;
    }
}
function f3(obj) {
    if (obj.a && obj.b) {
        var a = obj.a, b = obj.b; // number, string
        var ref3;
        ref3 = obj, a = ref3.a, b = ref3.b, ref3;
    }
}
function f4() {
    var x;
    x = 0..x; // Error
    var ref5;
    ref5 = 0, x = ref5["x"], ref5; // Error
    var ref4;
    ref4 = 0, x = ref4["x" + ""], ref4; // Errpr
}
var ref = [
    "foo"
], key = ref[0], value = ref[1];
value.toUpperCase(); // Error

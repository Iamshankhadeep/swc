class C {
    get X() {
        return '';
    }
    set X(v) {
    }
    foo() {
        return '';
    }
    static foo() {
    }
    static get X() {
        return 1;
    }
    constructor(){
    }
}
var a;
// error
var b = {
    a: '',
    b: 1,
    c: ()=>{
    },
    "d": '',
    "e": 1,
    1: '',
    2: 1,
    "3.0": '',
    "4.0": 1,
    f: null,
    get X () {
        return '';
    },
    set X (v){
    },
    foo () {
        return '';
    }
};

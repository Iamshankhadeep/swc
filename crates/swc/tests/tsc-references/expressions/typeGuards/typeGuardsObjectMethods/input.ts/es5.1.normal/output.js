//@target: es5
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 
// variables in global
var num;
var strOrNum;
var var1;
var obj1 = {
    // Inside method
    method: function method(param) {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string
        // variables in function declaration
        var var22;
        num = typeof var22 === "string" && var22.length; // string
        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
        return strOrNum;
    },
    get prop () {
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string
        // variables in function declaration
        var var2;
        num = typeof var2 === "string" && var2.length; // string
        return strOrNum;
    },
    set prop (param){
        // global vars in function declaration
        num = typeof var1 === "string" && var1.length; // string
        // variables in function declaration
        var var21;
        num = typeof var21 === "string" && var21.length; // string
        // parameters in function declaration
        num = typeof param === "string" && param.length; // string
    }
};
// return expression of the method
strOrNum = typeof obj1.method(strOrNum) === "string" && obj1.method(strOrNum);
// accessing getter property
strOrNum = typeof obj1.prop === "string" && obj1.prop;

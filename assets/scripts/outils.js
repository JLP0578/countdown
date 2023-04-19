/* RegExp */
let regexp_oneIntInString = /^([0-9]){1}$/;
let regexp_threeIntInString = /^([0-9]){3,}$/;

/***
 * getElementById
 */
_id = (id) => document.getElementById(id);

/**
 * getElementsByTagName
 */
_tn = (tn) => document.getElementsByTagName(tn);

/**
 * getElementsByName
 */
_n = (n) => document.getElementsByName(n);

/**
 * getElementsByClassName
 */
_cn = (cn) => document.getElementsByClassName(cn);

addLeadingZero = (e) => e.target.value = twoDigits(e.target.value);

isUndefined = (string) => typeof string == 'undefined';

isString = (string) => typeof string == 'string';

isNumber = (number) => typeof number == 'number';

// && isNaN(string) && isUndefined(string)

changeFakeTargetValue = (new_value) => {
    return {"target": {"value": new_value }};
}

twoDigits = (string) => {
    if(regexp_threeIntInString.test(string)) {
        string = string.toString().replace(/^(0+)/g, '');
        if(string.length > 2) string = "60";
    } else if(regexp_oneIntInString.test(string)) {
        string = string.toString().padStart(2, "0");
    } else if(!isString(string) && !isNumber(string) && (typeof string !== 'number' || isNaN(string))) {
        string = false;
    } else if (typeof string === 'number' && isNaN(string)) {
        string = false;
    }

    return string;
};
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

twoDigits = (string) => {
    string = string.toString();
    if(regexp_threeIntInString.test(string)) {
        string = string.replace(/^(0+)/g, '');
        if(string.length > 2) string = "60";
    } else if(regexp_oneIntInString.test(string)) {
        string = string.padStart(2, "0");
    }

    return string;
};

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

addLeadingZero = (e) => {
  const input = e.target;
  if (input.value.length === 1) {
    input.value = "0" + input.value;
  }
};

twoDigits = (string) => {
    if(string.length <= 1){
        string = string.toString().padStart(2, "0");
    }

    return string;
};

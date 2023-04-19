QUnit.module("[Outils]: DOM Selectors", function () {
    QUnit.test("_id()", function (assert) {
        let DOM_id = `<div id="MonIdDeTest"></div>`;
        let container = document.getElementById("container");
        container.innerHTML = DOM_id;

        // Tester avec une valeur valide
        assert.ok(_id("MonIdDeTest"), "il existe");

        // Tester avec une valeur invalide
        assert.notOk(_id("MonIdDeTestFalse"), "il existe pas");
    });
    QUnit.test("_tn()", function (assert) {
        let DOM_tn = `<p></p>`;
        let container = document.getElementById("container");
        container.innerHTML = DOM_tn;

        // Tester avec une valeur valide
        assert.ok(_tn("p"), "il existe");

        // Tester avec une valeur invalide
        assert.equal(_tn("aside").length, 0, "il existe pas");
    });
    QUnit.test("_n()", function (assert) {
        let DOM_n = `<input name="fname" type="text" value="Michael"></p>`;
        let container = document.getElementById("container");
        container.innerHTML = DOM_n;

        // Tester avec une valeur valide
        assert.ok(_n("fname"), "il existe");

        // Tester avec une valeur invalide
        assert.equal(_n("nfname").length, 0, "il existe pas");
    });
    QUnit.test("_cn()", function (assert) {
        let DOM_cn = `<div class="example_color"></div>`;
        let container = document.getElementById("container");
        container.innerHTML = DOM_cn;

        // Tester avec une valeur valide
        assert.ok(_cn("example_color"), "il existe");

        // Tester avec une valeur invalide
        assert.equal(_cn("exemple_false").length, 0, "il existe pas");
    });
});

QUnit.module("[Outils]: tools functions", function () {
    QUnit.test("isUndefined()", function (assert) {
        // Tester avec une valeur valide
        assert.true(isUndefined(undefined), "undefined doit être true");

        // Tester avec une valeur invalide
        assert.false(isUndefined("0"), "'0' doit être false");

    });
    QUnit.test("isString()", function (assert) {
        // Tester avec une valeur valide
        assert.true(isString("text"), "text doit être true");

        // Tester avec une valeur invalide
        assert.false(isString(456), "456 doit être false");

    });
    QUnit.test("isNumber()", function (assert) {
        // Tester avec une valeur valide
        assert.true(isNumber(156), "156 doit être true");

        // Tester avec une valeur invalide
        assert.false(isNumber("0"), "'0' doit être false");

    });
    QUnit.test("changeFakeTargetValue()", function (assert) {
        // Tester avec une valeur valide
        assert.deepEqual(changeFakeTargetValue("25"), {target: {value: "25" }}, "'25' doit être '25'");
        assert.deepEqual(changeFakeTargetValue(7), {target: {value: 7 }}, "7 doit être 7");
        assert.deepEqual(changeFakeTargetValue("aze"), {target: {value: "aze" }}, "'aze' doit être 'aze'");

    });
    QUnit.test("addLeadingZero()", function (assert) {
        // Tester avec une valeur valide
        assert.equal(addLeadingZero(changeFakeTargetValue("0")), "00", "'0' doit être '00'");
        assert.equal(addLeadingZero(changeFakeTargetValue("9")), "09", "'9' doit être '09'");
        assert.equal(addLeadingZero(changeFakeTargetValue("10")), "10", "'10' doit être '10'");
        assert.equal(addLeadingZero(changeFakeTargetValue("25")), "25", "'25' doit être '25'");

        // Tester avec une valeur invalide
        assert.equal(addLeadingZero(changeFakeTargetValue("a")), "a", "'a' doit être 'a'");
        assert.equal(addLeadingZero(changeFakeTargetValue("$")), "$", "'$' doit être '$'");
    });
    QUnit.test("twoDigits()", function (assert) {
        // Tester avec une valeur valide
        assert.equal(twoDigits("0"), "00", "'0' doit être '00'");
        assert.equal(twoDigits("05"), "05", "'05' doit être '05'");
        assert.equal(twoDigits("15"), "15", "'15' doit être '15'");
        assert.equal(twoDigits("35"), "35", "'35' doit être '35'");
        assert.equal(twoDigits("035"), "35", "'035' doit être '35'");
        assert.equal(twoDigits("0350"), "60", "'0350' doit être '60'");
        assert.equal(twoDigits("03500"), "60", "'03500' doit être '60'");
        assert.equal(twoDigits(1), "01", "1 doit être '01'");
        assert.equal(twoDigits(10), "10", "10 doit être '10");

        // Tester avec une valeur invalide
        assert.equal(twoDigits("a"), "a", "'a' doit être 'a'");
        assert.equal(twoDigits("$"), "$", "'$' doit être '$'");
        assert.false(twoDigits(undefined), "undefined doit être false");
        assert.false(twoDigits(NaN), "NaN doit être false");
        assert.false(twoDigits([]), "[] doit être false");
        assert.false(twoDigits({}), "{} doit être false");
    });
});

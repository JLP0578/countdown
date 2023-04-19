
function add_DOM() {
    let DOM_Preset = `
    <form>
        <div class="box_content">
            <h1>Compte à rebours</h1>
        </div>
        <div class="inline-form box_content">
            <label for="countdown-preset">Temps pré-sélectionné:</label>
            <select id="countdown-preset" name="countdown-preset"></select>
            <button disabled type="button" id="mute-btn" class="btn"></button>
            <button type="button" id="sound-btn" class="btn"></button>
        </div>
        <div class="inline-form box_content">
            <input type="number" id="minutes" min="0" max="59" value="01" />
            <b>:</b>
            <input type="number" id="seconds" min="0" max="59" value="00" />
            <button type="button" id="start-btn" class="btn"></button>
            <button disabled type="button" id="stop-btn" class="btn"></button>
            <button type="button" id="reset-btn" class="btn"></button>
        </div>
        <div class="box_content">
            <div class="progress">
                <div id="progress-bar" class="progress-bar" style="--total-time:0s;"></div>
            </div>
            <p>Vous avez fait <span id="compteur-de-serie">0</span> série(s).</p>
        </div>
    </form>
    `;
    let container = document.getElementById('container');
    container.innerHTML = DOM_Preset;
    countdownPreset = _id("countdown-preset");
    minutesInput = _id('minutes');
    secondsInput = _id('seconds');
}

QUnit.module("[main_script]: Gen options preset", function () {
    QUnit.test("loadPreset()", function (assert) {
        // Tester avec une valeur valide
        add_DOM();
        assert.equal(loadPreset().length, 11, "il doit y avoir un tableau de 11 element HTML <option>");

        // Tester avec une valeur invalide
        add_DOM();
        assert.notEqual(loadPreset().length, 5, "il doit pas y avoir un tableau de 5 element HTML <option>");
    });
    QUnit.test("ajouterOption()", function (assert) {
        add_DOM();

        // Tester avec une valeur valide
        assert.false(ajouterOption("00:00"), "le retour doit être false");

        assert.equal(ajouterOption("00:30").text, "00:30", "le text de l'option est '00:30'");
        assert.equal(ajouterOption("00:30").value, "00:30", "la valeur de l'option est '00:30'");
        assert.false(ajouterOption("00:30").selected, "cette option n'est pas selectionner par default");

        assert.equal(ajouterOption("01:00").text, "01:00", "le text de l'option est '01:00'");
        assert.equal(ajouterOption("01:00").value, "01:00", "la valeur de l'option est '01:00'");
        assert.true(ajouterOption("01:00").selected, "cette option est selectionner par default");

        // Tester avec une valeur invalide
        assert.false(ajouterOption("teste"), "le retour doit être false");
        assert.false(ajouterOption("456 ds$"), "le retour doit être false");
        assert.false(ajouterOption("456:ds$"), "le retour doit être false");
    });
});

QUnit.module("[main_script]: memory last preset", function () {
    add_DOM();
    QUnit.test("updateCountPreset()", function (assert) {
        let result = {"minutes": 1, "seconds": 0};
        assert.deepEqual(updateCountPreset(), result, "par default dans le DOM le temps est '01:00'");
    });
});
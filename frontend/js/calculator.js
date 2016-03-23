/**
 * Created by andrej on 3/20/16.
 */

'use strict';

import Component from "./component.js";

let template = require('raw!../templates/calculator-template.html');

class Calculator extends Component{
    constructor (options) {
        super(options);
        this._el = options.element;
        this._templateFunction = _.template(template);
        this._el.innerHTML = this._templateFunction(options.data);
        this._screen = document.getElementById('screen');
        this._el.addEventListener('click', this._onClick.bind(this));
        this._ifPreviousEqualButton = options.previousEqualButton;
    }

    _onClick(event) {
        let target = event.target;
        let button = target.closest('input');

        if (!button) {
            return;
        }

        switch (button.getAttribute('data-selector')) {
            case "number" : this._clickOnNumber(button);
                break;
            case "operator": this._clickOnOperatorButton(button);
                break;
            case "point": this._clickOnPointButton(button);
                break;
            case "cancel": this._clickOnCancelButton(button);
                break;
            case "equal": this._clickOnEqualButton(button);
                break;
        }
    }


    _clickOnNumber(button) {
        if (+button.value >= 0 || +button.value <= 9) {
            if (!this._ifPreviousEqualButton && this._screen.textContent != "0") {
            this._screen.textContent += button.value;
            } else {
                this._screen.textContent = button.value;
                this._ifPreviousEqualButton = false;
            }
        }
    }

    _clickOnCancelButton(button) {

        if (button.value == "C") {
            this._screen.textContent = "";
        }
    }

    _clickOnOperatorButton(button) {
        if ((button.value == "+"
            || button.value == "-"
            || button.value == "/"
            || button.value == "*")
            && ( (this._screen.textContent != "")
            && ( (this._screen.textContent[this._screen.textContent.length - 1] != "+")
            && ( (this._screen.textContent[this._screen.textContent.length - 1] != "-")
            && ( (this._screen.textContent[this._screen.textContent.length - 1] != "/")
            && ( (this._screen.textContent[this._screen.textContent.length - 1] != "*"))))))) {
            this._screen.textContent += button.value;
            this._ifPreviousEqualButton = false;
            }
        if (button.value == "%") {
            this._outputPercentCount();
        }
    }

    _outputPercentCount() {
        if (this._screen.textContent.indexOf("+") > -1) {
            this._percentCount("+");
        }
        if (this._screen.textContent.indexOf("-") > -1) {
            this._percentCount("-");
        }
        if (this._screen.textContent.indexOf("*") > -1) {
            this._percentCount("*");
        }
        if (this._screen.textContent.indexOf("/") > -1) {
            this._percentCount("/");
        }
    }

    _percentCount(operator) {
        let forPercentOperation;
        forPercentOperation = this._screen.textContent.split(operator);
        if (forPercentOperation.length != 2 || isNaN(forPercentOperation[1])) {
            return;
        } else {
            forPercentOperation[1] = (forPercentOperation[0] / 100 * forPercentOperation[1]);
            this._screen.textContent = eval(forPercentOperation.join(operator));
            this._ifPreviousEqualButton = true;
        }
    }


    _clickOnPointButton(button) {

        if ( (this._ifPreviousEqualButton) && (button.value == ".") ) {
            this._screen.textContent = "0.";
            this._ifPreviousEqualButton = false;
        } else {
            if ((button.value == ".") && (this._screen.textContent == "")) {
                this._screen.textContent = "0.";
                this._ifPreviousEqualButton = false;
            }
            else {
                if ((button.value == ".") && isNaN(+this._screen.textContent[this._screen.textContent.length - 1])) {
                    this._screen.textContent += "";
                    this._ifPreviousEqualButton = false;
                } else {
                    if (!this._ifPreviousEqualButton && (button.value == ".") && (this._screen.textContent.indexOf(".") == -1)) {
                        this._screen.textContent += ".";
                        this._ifPreviousEqualButton = false;
                    }
                }
            }
        }
    }

    _clickOnEqualButton(button) {
        if (button.value == "=" && document.getElementById('screen').textContent != "") {
            this._ifPreviousEqualButton = true;
            let input = this._screen.textContent;
            if (isNaN(input[input.length - 1])) {
                this._screen.textContent = input;
                this._ifPreviousEqualButton = false;
            } else {
            this._screen.textContent = eval(input);
            }
        }
    }

    _onMouseDown() {
        super._onMouseDown()
    }

    _onDocumentMouseMove(event) {
       super._onDocumentMouseMove(event)
    }

    _onDocumentMouseUp() {
        super._onDocumentMouseUp()
    }
}

module.exports = Calculator;











/**
 * Created by andrej on 3/20/16.
// */
'use strict';

import Calculator from "./calculator.js";

new Calculator({
    element: document.querySelector('[class="calculator"]'),
    previousEqualButton: false,
    data: {
        rows: [
            {items: ["C", "%", "+"]},
            {items: ["7", "8", "9", "-"]},
            {items: ["4", "5", "6", "*"]},
            {items: ["1", "2", "3", "/"]},
            {items: ["0", ".", "="]}
        ]
    }
});


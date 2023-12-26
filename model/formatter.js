sap.ui.define([], function() {
    'use strict';

    return {
        formatExistBlockColorScheme(sExistBlock) {
            return sExistBlock === "BLOQUEADO" ? 2 : 8;
        },

        formatStateColorScheme(sState) {
            return sState === "COM DETECÇÃO" ? 5 : 10;
        }
    };
});
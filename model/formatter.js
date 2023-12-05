sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    'use strict';

    return Controller.extend("application.controller.HomePage", {
        formatExistBlockColorScheme: function(sExistBlock) {
            return sExistBlock === "BLOQUEADO" ? 2 : 8;
        },

        formatStateColorScheme: function(sState) {
            return sState === "COM DETECÇÃO" ? 5 : 10;
        }
    });
});
sap.ui.define([
    'sap/ui/core/mvc/Controller'

], function(Controller) {
    "use strict";

    return Controller.extend("application.controller.Opinions", {
        onInit: function() {
            // Se necessário, faça alguma inicialização aqui
        },

        onCardPress: function(oEvent) {
            MessageToast.show("Card pressed: " + oEvent.getSource().getTitle());
        },

        onSelectionChanged: function(oEvent) {
            const oSegment = oEvent.getParameter("segment");
            MessageToast.show("Selection changed: " + oSegment.getLabel() + " " + ((oSegment.getSelected()) ? "selected" : "not selected"));
        }
    });
});
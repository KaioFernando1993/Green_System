sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format'
], function(Controller, BindingMode, JSONModel, ChartFormatter, Format) {
    "use strict";

    return Controller.extend("application.controller.Opinions", {
        onInit: function() {
            // Se necessário, faça alguma inicialização aqui
        },

        onCardPress: function(oEvent) {
            MessageToast.show("Card pressed: " + oEvent.getSource().getTitle());
        },

        onSelectionChanged: function(oEvent) {
            var oSegment = oEvent.getParameter("segment");
            MessageToast.show("Selection changed: " + oSegment.getLabel() + " " + ((oSegment.getSelected()) ? "selected" : "not selected"));
        }
    });
});
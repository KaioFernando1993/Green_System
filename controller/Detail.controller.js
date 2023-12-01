sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/library",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/Text"
], function(Controller, History, JSONModel, coreLibrary, Dialog, Button, mobileLibrary, Text) {
    "use strict";
    // shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;

    // shortcut for sap.m.DialogType
    var DialogType = mobileLibrary.DialogType;

    // shortcut for sap.ui.core.ValueState
    var ValueState = coreLibrary.ValueState;


    return Controller.extend("application.controller.Detail", {
        onInit: function() { // Corrigido de oninit para onInit
            var oData = {
                tableData: [
                    { Data: "2023-01-01", CodigoBP: "123", Documento: "Doc123", Nome: "Nome1", Municio: "Mun1", StatusBP: "Ativo" },
                    { Data: "2023-02-01", CodigoBP: "456", Documento: "Doc456", Nome: "Nome2", Municio: "Mun2", StatusBP: "Inativo" }
                ]
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },
        onEscapePreventDialogPress: function() {
            if (!this.oSuccessMessageDialog) {
                this.oSuccessMessageDialog = new Dialog({
                    type: DialogType.Message,
                    title: "Success",
                    state: ValueState.Success,
                    content: new Text({ text: "O parecer foi cadastrado e você será redirecionado a tela de histórico de pareceres." }),
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: "OK",
                        press: function() {
                            this.oSuccessMessageDialog.close();
                        }.bind(this)
                    })
                });
            }

            this.oSuccessMessageDialog.open();
        },
        onPareceres() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("OpinionsRoute");
        }
    });
});
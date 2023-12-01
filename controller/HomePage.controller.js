sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("application.controller.HomePage", {
        onInit: function() {
            // Exemplo de dados em uma matriz com informações diferentes
            const aData = [
                { Code: "123456", Identification: "123.123.123-12", Name: "vicente Sabugosa", Type: "Cliente", ExistBlock: "BLOQUEADO", DateBlock: "10-07-2023", State: "COM DETECÇÃO", DateRegister: "10-06-2023" },
                { Code: "123457", Identification: "12.123.123/00001-12", Name: "SD Fab", Type: "Fornecedor", ExistBlock: "NÃO BLOQUEADO", DateBlock: "Não se aplica", State: "SEM DETECÇÃO", DateRegister: "29-6-2023" },
                // Adicione mais itens conforme necessário
            ];

            const oVisibleModel = new JSONModel({
                filters: true
            })

            // Crie um modelo JSON e defina os dados
            var oModel = new JSONModel({
                items: aData
            });

            // Define o modelo para a visão
            this.getView().setModel(oModel, "tableModel");
            this.getView().setModel(oVisibleModel, "visibleModel");
        },
        onHideFiltersPress: function() {
           
            const modelData = this.getView().getModel("visibleModel").getData()
            this.getView().setModel(new JSONModel({...modelData, filters: !modelData.filters}), "visibleModel");

            // Obtenha uma referência ao SmartForm
            // var oSmartForm = this.getView().byId("smartForm");

            // // Verifique se o SmartForm está visível
            // var bIsVisible = oSmartForm.getVisible();

            // // Alterne a visibilidade do SmartForm
            // oSmartForm.setVisible(!bIsVisible);
        },
        onClickToDetail() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("DetailRoute");
        }

    });
});
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/library",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/Text",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function(Controller, History, JSONModel, coreLibrary, Dialog, Button, mobileLibrary, Text, Filter, FilterOperator, MessageToast) {
    "use strict";
    // shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;

    // shortcut for sap.m.DialogType
    var DialogType = mobileLibrary.DialogType;

    // shortcut for sap.ui.core.ValueState
    var ValueState = coreLibrary.ValueState;

    return Controller.extend("application.controller.Detail", {
        onInit: function() {
            // Configurar o modelo 'viewModel'
            var oViewModel = new JSONModel({
                editMode: false
            });
            this.getView().setModel(oViewModel, "viewModel");

            var oData = {
                tableData: [
                    { Data: "2023-01-01", CodigoBP: "123", Documento: "Doc123", Nome: "Nome1", Municio: "Mun1", StatusBP: "Ativo" },
                    { Data: "2023-02-01", CodigoBP: "456", Documento: "Doc456", Nome: "Nome2", Municio: "Mun2", StatusBP: "Inativo" }
                ]
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },
        // Search contract
        onSearchDetail: function(oEvent) {
            const aSearch = []
            const sQuery = oEvent.getParameter("query")

            if (sQuery) {
                aSearch.push(new Filter("Nome", FilterOperator.Contains, sQuery));
            }
            const oList = this.byId("tableDataContract");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aSearch);
        },
        // Edit Table
        onEditPress: function() {
            var oViewModel = this.getView().getModel("viewModel");

            // Verificar se o modelo 'viewModel' foi encontrado
            if (oViewModel) {
                var bEditMode = oViewModel.getProperty("/editMode");

                // Alternar entre modos de visualização e edição
                oViewModel.setProperty("/editMode", !bEditMode);

                // Se estiver saindo do modo de edição, salve as alterações
                if (!bEditMode) {
                    this.saveChanges();
                }
            } else {
                console.error("Model 'viewModel' not found.");
            }
        },
        saveChanges: function() {
            // Adicione a lógica para salvar os dados aqui
        },



        onEscapePreventDialogPress: function() {
            const input1 = this.getView().getModel().getProperty("/bpSap");

            // Remove espaços em branco no início e no final da string
            const noSpace = input1.trim();

            if (noSpace === "") {
                this.messageError();
            } else {
                this.messageSuccess();
            }
        },


        messageSuccess: function() {
            this.oSuccessMessage = new Dialog({
                type: DialogType.Message,
                title: "Success",
                state: ValueState.Success,
                content: new Text({ text: "O parecer foi cadastrado e você será redirecionado\n\ à tela de histórico de pareceres." }),
                beginButton: new Button({
                    type: ButtonType.Emphasized,
                    text: "OK",
                    press: function() {
                        this.oSuccessMessage.close();
                        this.onPareceres();
                    }.bind(this)
                })
            });
            this.oSuccessMessage.open();
        },

        messageError: function() {
            this.oErrorMessage = new Dialog({
                type: DialogType.Message,
                title: "Error",
                state: ValueState.Error,
                content: new Text({ text: "Preencha todos os campos!" }),
                beginButton: new Button({
                    type: ButtonType.Emphasized,
                    text: "OK",
                    press: function() {
                        this.oErrorMessage.close();
                    }.bind(this)
                })
            });
            this.oErrorMessage.open();
        },
        // Rota Provisória
        onPareceres: function() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("OpinionsRoute");
        }
    });
});
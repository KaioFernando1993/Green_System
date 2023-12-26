sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter"

], function(Controller, JSONModel, Filter, FilterOperator, formatter) {
    "use strict";

    return Controller.extend("application.controller.HomePage", {
        formatter: formatter,
        onInit: function() {
            // Exemplo de dados em uma matriz com informações diferentes
            const aData = [

                { Code: "123456", Identification: "123.123.123-12", Name: "Vicente Sabugosa", Type: "Cliente", ExistBlock: "BLOQUEADO", DateBlock: "10-07-2023", State: "COM DETECÇÃO", DateRegister: "10-06-2023" },
                { Code: "123457", Identification: "12.123.123/00001-12", Name: "SD Fab", Type: "Fornecedor", ExistBlock: "NÃO BLOQUEADO", DateBlock: "Não se aplica", State: "SEM DETECÇÃO", DateRegister: "29-6-2023" },
                { Code: "123458", Identification: "111.222.333-44", Name: "João Silva", Type: "Cliente", ExistBlock: "BLOQUEADO", DateBlock: "15-07-2023", State: "COM DETECÇÃO", DateRegister: "12-06-2023" },
                { Code: "123459", Identification: "45.678.901/0001-23", Name: "ABC Ltda", Type: "Fornecedor", ExistBlock: "BLOQUEADO", DateBlock: "Não se aplica", State: "COM DETECÇÃO", DateRegister: "05-07-2023" },
                { Code: "123460", Identification: "987.654.321-00", Name: "Maria Oliveira", Type: "Cliente", ExistBlock: "NÃO BLOQUEADO", DateBlock: "Não se aplica", State: "SEM DETECÇÃO", DateRegister: "02-06-2023" },
                { Code: "123461", Identification: "11.222.333/0001-45", Name: "XYZ Ltda", Type: "Fornecedor", ExistBlock: "NÃO BLOQUEADO", DateBlock: "20-07-2023", State: "COM DETECÇÃO", DateRegister: "18-06-2023" },
                { Code: "123462", Identification: "555.666.777-88", Name: "Carla Souza", Type: "Cliente", ExistBlock: "BLOQUEADO", DateBlock: "Não se aplica", State: "SEM DETECÇÃO", DateRegister: "22-06-2023" },
                { Code: "123463", Identification: "99.888.777/0001-56", Name: "EFG Ltda", Type: "Fornecedor", ExistBlock: "BLOQUEADO", DateBlock: "30-07-2023", State: "SEM DETECÇÃO", DateRegister: "25-06-2023" },
                { Code: "123464", Identification: "333.444.555-66", Name: "Pedro Mendes", Type: "Cliente", ExistBlock: "NÃO BLOQUEADO", DateBlock: "Não se aplica", State: "COM DETECÇÃO", DateRegister: "08-07-2023" },
                { Code: "123465", Identification: "12.345.678/0001-78", Name: "LMN Ltda", Type: "Fornecedor", ExistBlock: "NÃO BLOQUEADO", DateBlock: "25-07-2023", State: "SEM DETECÇÃO", DateRegister: "15-06-2023" }

            ];
            //Modelo para visualização dos filtros
            const oVisibleModel = new JSONModel({
                visible: true,
                data: {
                    searchQuery: { value: "", prop: "Name", operator: FilterOperator.Contains },
                    codeBpQuery: { value: "", prop: "Code", operator: FilterOperator.Contains },
                    existBlock: { value: "", prop: "ExistBlock", operator: FilterOperator.EQ },

                    avaliable: { value: "", prop: "", operator: FilterOperator.Contains },
                    identification: { value: "", prop: "Identification", operator: FilterOperator.Contains },
                    dateBlock: { value: "", prop: "DateBlock", operator: FilterOperator.Contains },

                    typePartner: { value: "", prop: "Type", operator: FilterOperator.Contains },
                    nameBp: { value: "", prop: "Name", operator: FilterOperator.Contains },
                    status: { value: "", prop: "State", operator: FilterOperator.EQ },

                    typeBp: { value: "", prop: "Type", operator: FilterOperator.Contains },
                    typeDateRegister: { value: "", prop: "DateRegister", operator: FilterOperator.Contains }
                }
            })

            // Modelo JSON e defina os dados
            const oModel = new JSONModel({
                items: aData
            });

            // Define o modelo para a visão
            this.getView().setModel(oModel, "tableModel");
            this.getView().setModel(oVisibleModel, "visibleModel");
        },
        //Controle de abre e fecha dos filtros
        onHideFiltersPress: function() {

            const modelData = this.getView().getModel("visibleModel").getData()
            this.getView().setModel(new JSONModel({...modelData, filters: !modelData.filters }), "visibleModel");
        },
        // Nav p/ Detail
        onClickToDetail: function() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("DetailRoute");
        },
        onFilterPress: function() {

            const filterData = this.getView().getModel("visibleModel").getData().data;
            const values = Object.values(filterData);

            // Crie uma array de filtros usando map
            const filters = values
                .filter(valueData => valueData.value)
                .map(valueData => {
                    return new Filter({
                        path: valueData.prop,
                        operator: valueData.operator,
                        value1: valueData.value
                    });
                });

            // Aplique os filtros à tabela
            const oTable = this.byId("myTable");
            const oBinding = oTable.getBinding("items");

            // Aplique os filtros criados
            oBinding.filter(filters);
        }

    });
})
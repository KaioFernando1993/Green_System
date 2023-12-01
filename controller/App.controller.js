sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/resource/ResourceModel"
    ],
    function(BaseController, ResourceModel) {
        "use strict";

        return BaseController.extend("application.controller.App", {
            onInit() {

                // set i18n model on view
                const i18nModel = new ResourceModel({
                    bundleName: "application.i18n.i18n"
                });
                this.getView().setModel(i18nModel, "i18n");
            }
        });
    }
);
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicPasswordRecoveryRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                passwordRecovery: uriTemplateService.parse("recover-password"),
                changePassword: uriTemplateService.parse("users/{userName}/change"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicPasswordRecoveryRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                passwordRecovery: uriTemplateService.parse("recover-password"),
                changePassword: uriTemplateService.parse("recover-password/users/{username}/change"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));
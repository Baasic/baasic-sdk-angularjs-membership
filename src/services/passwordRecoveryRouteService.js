(function (angular, module, undefined) {
    "use strict";
    module.service("baasicPasswordRecoveryRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                passwordRecovery: uriTemplateService.parse("RecoverPassword"),
				changePassword: uriTemplateService.parse("RecoverPassword/user/{username}/change"),
				parse: uriTemplateService.parse
            };
        }]);
}(angular, module));
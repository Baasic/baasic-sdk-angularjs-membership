(function (angular, module, undefined) {
    "use strict";
    module.service("baasicUserRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
				exists: uriTemplateService.parse("users/{userName}/exists/"),
                find: uriTemplateService.parse("users/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("users/{userName}/{?embed,fields}"),
                parse: uriTemplateService.parse,
                update: uriTemplateService.parse("users/{userName}/update"),
                create: uriTemplateService.parse("users"),
                sendPasswordRecovery: uriTemplateService.parse("users/{userName}/send-password-recovery"),
                approve: uriTemplateService.parse("users/{userName}/approve"),
                disapprove: uriTemplateService.parse("users/{userName}/disapprove"),
                lock: uriTemplateService.parse("users/{userName}/lock"),
                unlock: uriTemplateService.parse("users/{userName}/unlock"),
                remove: uriTemplateService.parse("users/{userName}"),                
            };
        }]);
}(angular, module));
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicUserRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
				exists: uriTemplateService.parse("users/{userName}/exists/"),
                find: uriTemplateService.parse("users/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("users/{userName}/{?embed,fields}"),
                parse: uriTemplateService.parse,
                create: uriTemplateService.parse("users"),
				changePassword: uriTemplateService.parse("users/{userName}/change-password"),
            };
        }]);
}(angular, module));
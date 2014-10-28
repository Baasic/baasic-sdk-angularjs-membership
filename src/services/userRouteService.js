(function (angular, module, undefined) {
    "use strict";
    module.service("baasicUserRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
				exists: uriTemplateService.parse("users/{username}/exists/"),
                find: uriTemplateService.parse("users/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("users/{username}/{?embed,fields}"),
                create: uriTemplateService.parse("users"),
                activate: uriTemplateService.parse("users/activate/{activationToken}/"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));
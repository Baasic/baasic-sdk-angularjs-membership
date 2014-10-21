(function (angular, module, undefined) {
    "use strict";
    module.service("baasicUserRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("user/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("user/{username}/{?embed,fields}"),
                create: uriTemplateService.parse("user"),
                activate: uriTemplateService.parse("user/activate/{activationToken}/"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));
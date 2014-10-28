(function (angular, module, undefined) {
    "use strict";
    module.service("baasicRoleRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("roles/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("roles/{id}/{?embed,fields}"),
                create: uriTemplateService.parse("roles"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));
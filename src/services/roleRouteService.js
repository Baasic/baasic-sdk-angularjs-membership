(function (angular, module, undefined) {
    "use strict";
    module.service("baasicRoleRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("role/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("role/{roleId}/{?embed,fields}"),
                create: uriTemplateService.parse("role"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicRoleService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicRoleRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, roleRouteService) {
            return {
				routeService: roleRouteService,
                find: function (data) {
                    return baasicApiHttp.get(roleRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(roleRouteService.get.expand(baasicApiService.getParams(data, 'roleId')));
                },
                create: function (data) {
                    return baasicApiHttp.post(roleRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
}(angular, module));
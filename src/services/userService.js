(function (angular, module, undefined) {
    "use strict";
    module.service("baasicUserService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicUserRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, userRouteService) {
            return {
                routeService: userRouteService,
                exists: function (userName, options) {
                    return baasicApiHttp.get(userRouteService.exists.expand(baasicApiService.getParams(userName, options, 'userName')));
                },
                find: function (data) {
                    return baasicApiHttp.get(userRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(userRouteService.get.expand(baasicApiService.getParams(data, 'userName')));
                },
                create: function (data) {
                    return baasicApiHttp.post(userRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    return baasicApiHttp.put(userRouteService.update.expand(baasicApiService.findParams(data, 'userName')), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    return baasicApiHttp.delete(userRouteService.remove.expand(baasicApiService.findParams(data, 'userName')), {});
                },
                unlock: function (data) {
                    return baasicApiHttp.put(userRouteService.unlock.expand(baasicApiService.findParams(data, 'userName')), {});                    
                },
                lock: function (data) {                
                    return baasicApiHttp.put(userRouteService.lock.expand(baasicApiService.findParams(data, 'userName')), {});                    
                },
                sendPasswordRecovery: function (data) {
                    return baasicApiHttp.put(userRouteService.sendPasswordRecovery.expand(baasicApiService.findParams(data, 'userName')), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                approve: function (data) {
                    return baasicApiHttp.put(userRouteService.approve.expand(baasicApiService.findParams(data, 'userName')), {});
                },
                disapprove: function (data) {
                    return baasicApiHttp.put(userRouteService.disapprove.expand(baasicApiService.findParams(data, 'userName')), {});
                },
            };
        }]);
}(angular, module));
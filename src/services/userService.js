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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                unlock: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('unlock').href);                    
                },
                lock: function (data) {                
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('lock').href);                    
                },
                sendPasswordRecovery: function (data) {
					var params = baasicApiService.updateParams(data);
					var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.put(model.links('sendpasswordrecovery').href); 
                },
                approve: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('approve').href);
                },
                disapprove: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('disapprove').href);
                }
            };
        }]);
}(angular, module));
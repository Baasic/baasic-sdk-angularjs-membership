/* globals module */

(function (angular, module, undefined) {
	'use strict';
	module.service('baasicUserRegisterService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserRegisterRouteService', 
		function (baasicApiHttp, baasicApiService, baasicConstants, baasicUserRegisterRouteService) {
			return {
				routeService: baasicUserRegisterRouteService,
				create: function (data) {
					return baasicApiHttp.post(baasicUserRegisterRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
				},
				activate: function (data) {
					var params = baasicApiService.getParams(data, 'activationToken');
					return baasicApiHttp.put(baasicUserRegisterRouteService.activate.expand(params), {});
				}
			};
		}]);
}(angular, module));
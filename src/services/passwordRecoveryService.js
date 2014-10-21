(function (angular, module, undefined) {
    "use strict";
    module.service("baasicPasswordRecoveryService", ["baasicApiHttp", "baasicPasswordRecoveryRouteService",
        function (baasicApiHttp, passwordRecoveryRouteService) {
            
            return {
				routeService: passwordRecoveryRouteService,
                requestReset: function (request) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: "POST",
                        data: request
                    });
                },
                reset: function (reset) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: "PUT",
                        data: reset
                    });
                },
				change: function (username, data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.changePassword.expand({ username: username }),
                        method: "PUT",
                        data: data
                    });
                }
            };
        }]);
}(angular, module));
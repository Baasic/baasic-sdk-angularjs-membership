(function (angular, module, undefined) {
    "use strict";
    module.service("baasicPasswordRecoveryService", ["baasicApiHttp", "baasicPasswordRecoveryRouteService",
        function (baasicApiHttp, passwordRecoveryRouteService) {
            return {
                routeService: passwordRecoveryRouteService,
                requestReset: function (data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: "POST",
                        data: data
                    });
                },
                reset: function (data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: "PUT",
                        data: data
                    });
                },
                change: function (userName, data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.changePassword.expand({ userName: userName }),
                        method: "PUT",
                        data: data
                    });
                }
            };
        }]);
}(angular, module));
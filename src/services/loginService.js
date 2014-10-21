(function (angular, module, undefined) {
    "use strict";
    module.service("baasicLoginService", ["baasicApiHttp", "baasicLoginRouteService",
        function (baasicApiHttp, loginRouteService) {
            return {
				routeService: loginRouteService,
				login: function login(data) {
				    var settings = angular.copy(data);
				    var formData = 'grant_type=password&username=' + settings.username + '&password=' + settings.password;

				    if (settings.options) {
				        var options = settings.options;
				        if (angular.isArray(options)) {
				            settings.options = options.join();
				        }
				    }

                    return baasicApiHttp({
                        url: loginRouteService.login.expand(settings),
                        method: "POST",
                        data: formData,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    });
                },
                loadUserData: function loadUserData(data) {
					data = data || {};
                    return baasicApiHttp.get(loginRouteService.login.expand(data), { headers: { "Accept": "application/json; charset=UTF-8" } });
                },
                logout: function logout(token, type) {
                    return baasicApiHttp({
                        url: loginRouteService.login.expand({}),
                        method: "DELETE",
                        data: {
                            token: token,
                            type: type
                        }
                    });
                }
            };
        }]);
}(angular, module));
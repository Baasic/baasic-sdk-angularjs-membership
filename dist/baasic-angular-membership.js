(function (angular, undefined) {
    var module = angular.module("baasic.membership", ["baasic.api"]);

    module.config(["$provide", function config($provide) {

    }]);

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicLoginRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                login: uriTemplateService.parse("login/{?embed,fields,options}"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicLoginService", ["baasicApiHttp", "baasicLoginRouteService", function (baasicApiHttp, loginRouteService) {
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
                    return baasicApiHttp.get(loginRouteService.login.expand(data), {
                        headers: {
                            "Accept": "application/json; charset=UTF-8"
                        }
                    });
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
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicPasswordRecoveryRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                passwordRecovery: uriTemplateService.parse("RecoverPassword"),
                changePassword: uriTemplateService.parse("RecoverPassword/user/{username}/change"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicPasswordRecoveryService", ["baasicApiHttp", "baasicPasswordRecoveryRouteService", function (baasicApiHttp, passwordRecoveryRouteService) {

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
                        url: passwordRecoveryRouteService.changePassword.expand({
                            username: username
                        }),
                        method: "PUT",
                        data: data
                    });
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicRoleRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("role/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("role/{roleId}/{?embed,fields}"),
                create: uriTemplateService.parse("role"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicRoleService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicRoleRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, roleRouteService) {
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
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicUserRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("user/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("user/{username}/{?embed,fields}"),
                create: uriTemplateService.parse("user"),
                activate: uriTemplateService.parse("user/activate/{activationToken}/"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicUserService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicUserRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, userRouteService) {
            return {
                routeService: userRouteService,
                find: function (data) {
                    return baasicApiHttp.get(userRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(userRouteService.get.expand(baasicApiService.getParams(data, 'username')));
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
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('unlock').href, {});
                },
                lock: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('lock').href, {});
                },
                activate: function (data) {
                    var params = baasicApiService.getParams(data, 'activationToken');
                    return baasicApiHttp.put(userRouteService.activate.expand(params), {});
                }
            };
        }]);
    }(angular, module));
})(angular);
(function (angular, module, undefined) {
	"use strict";
	module.service("baasicUserRegisterRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
		return {
			create: uriTemplateService.parse("register"),
			activate: uriTemplateService.parse("register/activate/{activationToken}/")
		};
	}]);
}(angular, module));
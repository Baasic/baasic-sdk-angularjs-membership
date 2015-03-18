/* globals module */
/**
 * @module baasicUserService
 * @description Baasic User Service provides an easy way to consume Baasic User features.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicUserService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, userRouteService) {
            return {
                routeService: userRouteService,
                 /**
                 * Returns a promise that is resolved once the exists action has been performed. The action checks the availability of a desired Username.
                 * @method        
                 * @example 
baasicUserService.exists("userNameToCheck")
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});  
                 **/ 					
                exists: function (userName, options) {
                    return baasicApiHttp.get(userRouteService.exists.expand(baasicApiService.getParams(userName, options, 'userName')));
                },
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user resources.
                 * @method        
                 * @example 
baasicUserService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : "username",
  orderDirection : "desc",
  search : "searchTerm"
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/  					
                find: function (data) {
                    return baasicApiHttp.get(userRouteService.find.expand(baasicApiService.findParams(data)));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the user resource.
                 * @method        
                 * @example 
baasicUserService.get({
  userName : "userName",
  embed : "embeddedResource"
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 					
                get: function (data) {
                    return baasicApiHttp.get(userRouteService.get.expand(baasicApiService.getParams(data, 'userName')));
                },
                 /**
                 * Returns a promise that is resolved once the create user action has been performed. Success response returns the created user resource.
                 * @method        
                 * @example 
baasicUserService.create({
  confirmPassword : "password",
  email : "email",
  password : "password",
  sendEmailNotification : true,
  userName : "userName",
  roles: ["role"],
  additionalProperty: "additionalProperty"  
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 						
                create: function (data) {
                    return baasicApiHttp.post(userRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update user action has been performed.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
existingResource.roles = ["role", "new role"];
existingResource.email = "new email";
baasicUserService.update(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/				
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the remove user action has been performed. If the action is successfully completed the user resource is permanently removed from the system.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicUserService.remove(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                 /**
                 * Returns a promise that is resolved once the unlock user action has been performed. This action will unlock the user resource which was previously locked either manually or automatically by the system.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicUserService.unlock(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/						
                unlock: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('unlock').href);                    
                },
                 /**
                 * Returns a promise that is resolved once the lock user action has been performed. This action will lock the user resource out of the system.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicUserService.lock(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                lock: function (data) {                
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('lock').href);                    
                },
                 /**
                 * Returns a promise that is resolved once the approve user action has been performed. This action will mark the user resource as approved in the system.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicUserService.lock(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                approve: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('approve').href);
                },
                 /**
                 * Returns a promise that is resolved once the disapprove user action has been performed. This action will mark the user resource as not approved in the system.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicUserService.lock(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                disapprove: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('disapprove').href);
                },
                 /**
                 * Returns a promise that is resolved once the changePassword action has been performed. This action will update the user's password selection.
                 * @method        
                 * @example 
baasicUserService.changePassword("userName", {
  newPassword : "new password",
  sendMailNotification : false
})
.success(function () {
  // perform success action here
})
.error(function (data, status, headers, config) {
  // perform error handling here
})
.finally (function () {});
				**/					
                changePassword: function (userName, data) {
                    return baasicApiHttp({
                        url: userRouteService.changePassword.expand({ userName: userName }),
                        method: 'PUT',
                        data: data
                    });
                }				
            };
        }]);
}(angular, module));
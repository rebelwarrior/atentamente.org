app.factory('legislatorsFactory', ['$http', '$q', '$upload', 'LegislatorsService', function($http, $q, $upload, LegislatorsService){
	var o = {
		legislators: [],
		legislator: {},
		search_results: []
	};

	o.index = function(){
		var deferred = $q.defer();
		$http.get('/api/legislators.json').
		success(function(data){
			angular.copy(data, o.legislators);
	    deferred.resolve(data);
		}).
		error(function(data, status, headers, config) {
	    deferred.reject();
	  });
		return deferred.promise;
	};

	o.find = function(id){
		var deferred = $q.defer();
		LegislatorsService.find(id).
		then(function(data){
			data.image_preview = data.image;
			angular.copy(data, o.legislator);
	    deferred.resolve(data);
		}).
		catch(function(data){
			deferred.reject();
		});
		return deferred.promise;
	};

	o.update = function(params){
		var deferred = $q.defer();
		$upload.upload({
      url: '/api/legislators/'+params.id+'.json',
      method: 'PUT',
      fields: LegislatorsService.params('legislator', params),
      file: params.image,
      fileFormDataName: 'legislator[image]'
    }).
    success(function (data, status, headers, config) {
    	angular.copy(data, o.legislator);
      deferred.resolve(data);
    })
    .error(function (data, status, headers, config) {
			deferred.reject(status);
		})
    return deferred.promise;
	};

	o.create = function(params){
		var deferred = $q.defer();
		$upload.upload({
      url: '/api/legislators.json',
      method: 'POST',
      fields: LegislatorsService.params('legislator', params),
      file: params.image,
      fileFormDataName: 'legislator[image]'
    }).
    success(function (data, status, headers, config) {
    	angular.copy(data, o.legislator);
      deferred.resolve(data);
    })
    .error(function (data, status, headers, config) {
			deferred.reject(status);
		})
    return deferred.promise;
	};

	o.search = function(query){
		var deferred = $q.defer();
		LegislatorsService.search(query).then(function(data){
			angular.copy(data, o.search_results);
			deferred.resolve(data);
		});
		return deferred.promise;
	}

	o.reset = function(){
		var deferred = $q.defer();
    angular.copy({}, o.legislator);
    deferred.resolve({});
    return deferred.promise;
	};

	return o;
}]);
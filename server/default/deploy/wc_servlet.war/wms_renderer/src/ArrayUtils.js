export class ArrayUtils {

	static createArrayFromInterval(startValue, endValue){
		startValue = parseInt(startValue);
		endValue = parseInt(endValue || startValue);

		var array = [];

		for(var i = startValue; i <= endValue; i++){
			array.push(i);
		}

		return array;
	}

	static fromString(value, sep = ','){
		return value.trim().split(sep)/*.map( item => parseInt(item, 10) )*/;
	}

	static asyncFor = function(){

		function asyncFor(min, max, callback, done){
			var value = min;

			if(value > max){
				done && done();
			}else{
				callback && callback(value, next.bind(this, ++value, max, callback, done));
			}
		}

		var next = function(){
			asyncFor.apply(this, arguments);
		};

		return asyncFor;
	}();

	static forEachAsync = function(){
		function next(array, callback, done){
			forEachAsync(array, callback, done);
		}

		function forEachAsync(array, callback, done){
			var item = array.shift();
			if(item != null){
				callback && callback(item, next.bind(this, array, callback, done));
			}else if(array.length == 0){
				done && done();
			}
		}

		return function(array, callback, done){
			array = array.slice();
			return forEachAsync(array, callback, done);
		};
	}();

}

/*
ArrayUtils.asyncFor = function(){

	function asyncFor(min, max, callback, done){
		var value = min;

		if(value > max){
			done && done();
		}else{
			callback && callback(value, next.bind(this, ++value, max, callback, done));
		}
	}

	var next = function(){
		asyncFor.apply(this, arguments);
	};

	return asyncFor;
}();

ArrayUtils.forEachAsync = function(){
	function next(array, callback, done){
		forEachAsync(array, callback, done);
	}

	function forEachAsync(array, callback, done){
		var item = array.shift();
		if(item != null){
			callback && callback(item, next.bind(this, array, callback, done));
		}else if(array.length == 0){
			done && done();
		}
	}

	return function(array, callback, done){
		array = array.slice();
		return forEachAsync(array, callback, done);
	};
}();*/

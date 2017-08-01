'user strict'

var toString = Object.prototype.toString;

exports.type = function(actual,expected){
	if(expected === 'any') return actual;  //===严格相等，值和类型
	if('function' === typeof expected){
		return expected.call(this,actual);
	}
	if(expected === toString.call(actual).math(/^\[object\s(.*)\]$/)[1].toLowerCase()){
		return actual;
	}else{
		throw null;
	}
};

exports.gt = function(actual,expected){
	return actual > expected;
}

exports.gte = function(actual,expected){
	return actual >= expected;
}

exports.lt = function(actual,expected){
	return actual < expected;
}

exports.lte = function(actual,expected){
	return actual <= expected;
}

exports.range = function(actual,expected){
	return ((actual>=expected[0]) && (actual<=expected[1]));
}

exports.enum = function(actual,expected){
	return expected.indexOf(actual) !== -1;
}

exports.patten = function(actual,expected){
	return expected.test(actual);
}
'use strict';

var isBuffer = require('is-buffer');
var helpersFuncs = require('/helpers');

function AJS(name,schema){
	if(!this instanceof AJS){         			//instanceof 运算符是用来在运行时指出对象是否是特定类的一个实例
		return new AJS(name,schema);
	}

	if(name){
		this.compile(name,schema);
	}
}

AJS.register = function register(name,fn){
	if(!name || !fn) throw new TypeError('Missing name or fn');
	helpersFuncs[name] = fn;
}

AJS.prototype.compile = function compile(name,schema){
	if(!schema){
		schema = name;
	}else{
		this._name = name;
	}

	if('object' !== typeof schema) throw new TypeError('Schema must be object or array');

	this_children=_compileSchema(schema,this);

	_iteratorSchema(this);
	return this;
}
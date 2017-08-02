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

	this._children=_compileSchema(schema,this);

	_iteratorSchema(this);
	return this;
}

AJS.prototype.validate = function validate(obj,opts){
	if(!this._schema) throw new TypeError('No schema assigned, please call .compile(schema)');
	opts=opts||{};
	return _validateObject(obj,opts,this);
}

function _compileSchema(schema,ctx){
	var children ={};
	var isArray = Array.isArray(schema);

	schema = isArray?schema[0]:schema;
	ctx[isArray?'_array':'_object'] = true;

	if(schema instanceof AJS){
		if(schema._name) ctx._name = schema._name;
		if(schema._leaf) {
			ctx._leaf = schema._leaf;
			delete ctx._object;
		}
		return schema._children;
	}

	if(schema.type && !(schema.type instanceof AJS) && !schema.type.type){
		ctx._leaf = true;
		delete ctx._object;
		return schema;
	}

	for(var key in schema){
		children[key] = AJS(schema[key]);
	}

	return children;
}
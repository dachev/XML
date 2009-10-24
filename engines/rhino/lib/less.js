var more = require('more').xml;

/* auxiliary functions and vars */
function extend() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy;
	
	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	
	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}
	
	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}
	
	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];
				
				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}
				
				// Recurse if we're merging object values
				if ( deep && copy && typeof copy === "object" && !copy.nodeType ) {
					var clone;
					
					if ( src ) {
						clone = src;
					} else if ( jQuery.isArray(copy) ) {
						clone = [];
					} else if ( jQuery.isObject(copy) ) {
						clone = {};
					} else {
						clone = copy;
					}
					
					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );
					
					// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}
	
	// Return the modified object
	return target;
}

function each(object, callback, args) {
    var name, i = 0, length = object.length;

    if (args) {
        if (length === undefined) {
            for (name in object) {
                if (callback.apply(object[name], args) === false ) {
                    break;
                }
            }
        }
        else {
            for ( ; i < length; ) {
                if (callback.apply(object[i++], args) === false) {
                    break;
                }
            }
        }
    }
    else {
        if (length === undefined) {
            for (name in object) {
                if (callback.call(object[name], name, object[name]) === false) {
                    break;
                }
            }
        }
        else {
            for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {
            
            }
        }
    }

    return object;
}

function addMethod(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
        if ( fn.length == arguments.length )
            return fn.apply( this, arguments );
        else if ( typeof old == 'function' )
            return old.apply( this, arguments );
    };
}

function Attributes(attributes) {
	addMethod(this, 'getIndex', function(qName) {
		return attributes.getIndex(qName);
	});
	addMethod(this, 'getIndex', function(uri, localName) {
		return attributes.getIndex(uri, localName);
	});
	
	addMethod(this, 'getType', function(qName) {
		return attributes.getType(qName);
	});
	addMethod(this, 'getType', function(uri, localName) {
		return attributes.getType(uri, localName);
	});
	
	
	addMethod(this, 'getValue', function(qName) {
		return attributes.getValue(qName);
	});
	addMethod(this, 'getValue', function(uri, localName) {
		return attributes.getValue(uri, localName);
	});
	
	for (var i = 0; i < attributes.getLength(); i++) {
		this.push({
			type      : attributes.getType(i),
			qName     : attributes.getQName(i),
			localName : attributes.getLocalName(i),
			uri       : attributes.getURI(i),
			value     : attributes.getValue(i)
		});
	}
}
Attributes.prototype = new Array();


function Locator(locator) {
	this.getColumnNumber = function() {
		return Number(locator.getColumnNumber());
	}
	this.getLineNumber = function() {
		return Number(locator.getLineNumber());
	}
	this.getPublicId = function() {
		return String(locator.getPublicId());
	}
	this.getSystemId = function() {
		return String(locator.getSystemId());
	}
}


/* simple interface implementation */
var saxParserFeatures = [
	'http://xml.org/sax/features/external-general-entities',
	'http://xml.org/sax/features/external-parameter-entities',
	'http://xml.org/sax/features/lexical-handler/parameter-entities',
	'http://xml.org/sax/features/namespaces',
	'http://xml.org/sax/features/namespace-prefixes',
	'http://xml.org/sax/features/resolve-dtd-uris',
	'http://xml.org/sax/features/string-interning',
	'http://xml.org/sax/features/unicode-normalization-checking',
	'http://xml.org/sax/features/use-entity-resolver2',
	'http://xml.org/sax/features/validation',
	'http://xml.org/sax/features/xmlns-uris'
];

function makeSAXParser(options) {
    var spf = more.javax.xml.parsers.SAXParserFactory.newInstance();
	
	each(saxParserFeatures, function(i, feature) {
		if (options[feature] !== true && options[feature] !== false) {
			return true;
		}
		
		spf.setFeature(feature, options[feature]);
	});
	
	return spf.newSAXParser();
}

var handlerAdapters = {
	content: {
		startDocument: function() {
			if (typeof this.startDocument === 'function') {
				this.startDocument();
			}
		},
		endDocument: function() {
			if (typeof this.endDocument === 'function') {
				this.endDocument();
			}
		},
		startElement: function(uri, localName, qName, attributes) {
			var attribs = new Attributes(attributes);
			
			if (typeof this.endElement === 'function') {
				this.startElement(String(uri), String(localName), String(qName), attribs);
			}
		},
		endElement: function(uri, localName, qName) {
			if (typeof this.endElement === 'function') {
				this.endElement(String(uri), String(localName), String(qName));
			}
		},
		startPrefixMapping: function(prefix, uri) {
			if (typeof this.startPrefixMapping === 'function') {
				this.startPrefixMapping(String(prefix), String(uri));
			}
		},
		endPrefixMapping: function(prefix) {
			if (typeof this.endPrefixMapping === 'function') {
				this.endPrefixMapping(String(prefix));
			}
		},
		ignorableWhitespace: function(ch, start, length) {
			var array = java.lang.reflect.Array.newInstance(java.lang.Character.TYPE, length);
			java.lang.System.arraycopy(ch, start, array, 0, length);

			var string = String(java.lang.String(array));
		
			if (typeof this.ignorableWhitespace === 'function') {
				this.ignorableWhitespace(string);
			}
		},
		processingInstruction: function(target, data) {
			if (typeof this.processingInstruction === 'function') {
				this.processingInstruction(String(target), String(data));
			}
		},
		setDocumentLocator: function(locator) {
			var loc = new Locator(locator);
			
			if (typeof this.setDocumentLocator === 'function') {
				this.setDocumentLocator(loc);
			}
		},
		skippedEntity: function(name) {
			if (typeof this.skippedEntity === 'function') {
				this.skippedEntity(String(name));
			}
		},
		characters: function(ch, start, length) {
			var array = java.lang.reflect.Array.newInstance(java.lang.Character.TYPE, length);
			java.lang.System.arraycopy(ch, start, array, 0, length);

			var string = String(java.lang.String(array));
			
			if (typeof this.characters === 'function') {
				this.characters(string);
			}
		}
	},
	error: {
		error: function(exception) {
			if (typeof this.error === 'function') {
				this.error(exception);
			}
		},
		fatalError: function(exception) {
			if (typeof this.fatalError === 'function') {
				this.fatalError(exception);
			}
		},
		warning: function(exception) {
			if (typeof this.warning === 'function') {
				this.warning(exception);
			}
		}
	},
	dtd: {
		notationDecl: function(name, publicId, systemId) {
			if (typeof this.notationDecl === 'function') {
				this.notationDecl(String(name), String(publicId), String(systemId));
			}
		},
		unparsedEntityDecl: function(name, publicId, systemId, notationName) {
			if (typeof this.unparsedEntityDecl === 'function') {
				this.unparsedEntityDecl(String(name), String(publicId), String(systemId), String(notationName));
			}
		}
	},
	entityResolver: {
		resolveEntity: function(publicId, systemId) {
			if (typeof this.resolveEntity === 'function') {
				this.resolveEntity(String(publicId), String(systemId));
			}
		}
	}
}

function SAXHandler(settings) {
	var saxHandler = {};
	
	each(handlerAdapters, function(iface, methods) {
		each(methods, function(name, method) {
			if (settings.handlers[name] && typeof settings.handlers[name] === 'function') {
				saxHandler[name] = function () {
					handlerAdapters[iface][name].apply(settings.handlers, arguments);
				};
			}
		});
	});
	
	return new JavaAdapter(more.org.xml.sax.helpers.DefaultHandler, saxHandler);
}

function parseFileDOM(path, errorHandler)   {
    var dom;
    
    try {
        var dbf    = more.javax.xml.parsers.DocumentBuilderFactory.newInstance();
        var db     = dbf.newDocumentBuilder();
        var reader = new Packages.java.io.FileReader(path);
        var input  = new Packages.org.xml.sax.InputSource(reader);
         
        dom = db.parse(input);
    }
    catch (e if e.javaException instanceof java.io.IOException) {
        if (errorHandler && errorHandler.file) {
            errorHandler.file(e);
        }
        else {
            throw(e);
        }
    }
    catch (e if e.javaException instanceof org.xml.sax.SAXException) {
        if (errorHandler && errorHandler.parser) {
            errorHandler.parser(e);
        }
        else {
            throw(e);
        }
    }
    
    return dom;
}

function parseStringDOM(string, errorHandler) {
    var dom;
    
    try {
        var dbf    = more.javax.xml.parsers.DocumentBuilderFactory.newInstance();
        var db     = dbf.newDocumentBuilder();
        var reader = new Packages.java.io.StringReader(string);
        var input  = new Packages.org.xml.sax.InputSource(reader);
         
        dom = db.parse(input);
    }
    catch (e if e.javaException instanceof java.io.IOException) {
        if (errorHandler && errorHandler.file) {
            errorHandler.file(e);
        }
        else {
            throw(e);
        }
    }
    catch (e if e.javaException instanceof org.xml.sax.SAXException) {
        if (errorHandler && errorHandler.parser) {
            errorHandler.parser(e);
        }
        else {
            throw(e);
        }
    }
    
    return dom;
}

function parseFileSAX(path, settings) {
    if (typeof path !== 'string' || path === '') {
        return;
    }
    if (typeof settings !== 'object') {
        return;
    }
    if (typeof settings.handlers !== 'object') {
        return;
    }
	
    if (typeof settings.options !== 'object') {
        settings.options = {};
    }

    try {
        var parser  = makeSAXParser(settings.options);
        var reader  = new Packages.java.io.FileReader(path);
        var input   = new Packages.org.xml.sax.InputSource(reader);
        var handler = new SAXHandler(settings);

        parser.parse(input, handler);
    }
    catch (e if e.javaException instanceof java.io.IOException) {
        if (typeof settings.handlers.fatalError === 'function') {
            settings.handlers.fatalError(e);
        }
        else {
            throw(e);
        }
    }
}

function parseStringSAX(string, settings) {
    if (typeof string !== 'string' || string === '') {
        return;
    }
    if (typeof settings !== 'object') {
        return;
    }
    if (typeof settings.handlers !== 'object') {
        return;
    }
	
    if (typeof settings.options !== 'object') {
        settings.options = {};
    }

    try {
        var parser  = makeSAXParser(settings.options);
        var reader  = new Packages.java.io.StringReader(string);
        var input   = new Packages.org.xml.sax.InputSource(reader);
        var handler = new SAXHandler(settings);

        parser.parse(input, handler);
    }
    catch (e if e.javaException instanceof java.io.IOException) {
        if (typeof settings.handlers.fatalError === 'function') {
            settings.handlers.fatalError(e);
        }
        else {
            throw(e);
        }
    }
}

/* simple interface declaration */
var xml = {
    dom: {
        parse : {
            file   : parseFileDOM,
            string : parseStringDOM
        }
    },
    sax: {
        parse : {
            file   : parseFileSAX,
            string : parseStringSAX
        }
    }
};

/* full interface definition */
exports.xml = xml;
























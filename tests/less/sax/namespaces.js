var xml       = require('xml').less;
var assert    = require("test/assert");
var system    = require('system');
var fs        = system.fs;
var prefix    = system.prefix;

var pkg_root  = prefix + fs.SEPARATOR + 'packages' + fs.SEPARATOR + 'xml' + fs.SEPARATOR;
var data_root = pkg_root + 'tests' + fs.SEPARATOR + 'data' + fs.SEPARATOR;
var ofile     = '0001.original.xml';
var bfile     = '0001.baseline.xml';
var ocontent  = fs.read(data_root + ofile);
var bcontent  = fs.read(data_root + bfile);
var tcontent  = '';

var handlers     = {
    startDocument: function() {
    },
    endDocument: function() {
    },
    startElement: function(uri, localName, qName, attributes) {
        var tokens = [];
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];

            tokens.push(attribute.qName + '="' + attribute.value + '"');
        }
        
        qName += (tokens.length > 0) ? ' ' : '';
        
        tcontent += '<' + qName + tokens.join(' ') + '>';
    },
    endElement: function(uri, localName, qName) {
        tcontent += '</' + qName + '>';
    },
    characters: function(chunk) {
        tcontent += chunk;
    },
    ignorableWhitespace: function(chunk) {
        tcontent += chunk;
    }
}

exports.testParseString = function() {
    tcontent = '';
    
    xml.sax.parse.string(ocontent, {
        handlers : handlers,
        options  : {
            'http://xml.org/sax/features/namespaces' : true
        }
    });

    assert.isEqual(bcontent.trim(), tcontent.trim());
}

exports.testParseFile = function() {
    tcontent = '';
    
    xml.sax.parse.file(data_root + ofile, {
        handlers : handlers,
        options  : {
            'http://xml.org/sax/features/namespaces' : true
        }
    });

    assert.isEqual(bcontent.trim(), tcontent.trim());
}






















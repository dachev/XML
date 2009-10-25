XML
=======

A suite of XML APIs for Narwhal
-------------------------------------

This package aims to provide two sets of interfaces:

* A full blown XML API with all of the advanced options expected by libXML and Xerces users

* A more effortless version akin to Python's simplexml that allows DOM and SAX parsing of strings and files


Status
-------------------------------------

* Full interface: at this time, just a direct export of Java's XML interfaces.

* Simple interface: DOM and SAX parsing are complete. See examples below.


TODO
-------------------------------------

* Full interface: Redesign the API so that it can be supported across different engines. Also, no native types should be exposed.

* Simple interface: Use JS wrapper object for the document returned by DOM parsing methods

* Create more test cases


Philosophy
-------------------------------------

* Allow both power and ease

* DO NOT expose any native types including strings and numbers. For example, all Java strings in Rhino will be converted to JS (e.g String(xml)). For complex native types, provide JS wrapper objects. Scripting Java is fun, but this is not what Narwhal is all about.

* The higher-level (simple) interface needs to be implemented in terms of the full JS API


Examples
-------------------------------------

* Parsing a file or a string with the simple SAX API

        var handlers = {
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
                content += '<' + qName + tokens.join(' ') + '>';
            },
            endElement: function(uri, localName, qName) {
                content += '</' + qName + '>';
            },
            characters: function(chunk) {
                content += chunk;
            },
            ignorableWhitespace: function(chunk) {
                content += chunk;
            }
        }

        var xml     = require('xml').less;
        var content = '';

        xml.sax.parse.string('<root></root>', {
            handlers : handlers,
            options  : {
                'http://xml.org/sax/features/namespaces' : true
            }
        });
        print(content);

        content = '';
        xml.sax.parse.file('/path/to/file.xml', {
            handlers : handlers,
            options  : {
                'http://xml.org/sax/features/namespaces' : true
            }
        });
        print(content);


License
-------------------------------------

Copyright (c) 2009 Blagovest Dachev <[www.dachev.com](http://www.dachev.com/)\>

[GPL 2.0](http://www.gnu.org/licenses/gpl-2.0.html)


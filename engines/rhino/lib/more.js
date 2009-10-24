/* full interface declaration */
var xml = {
    org: {
        xml: {
            sax: {
                helpers: {
                    AttributeListImpl: Packages.org.xml.sax.helpers.AttributeListImpl,
                    AttributesImpl: Packages.org.xml.sax.helpers.AttributesImpl,
                    DefaultHandler: Packages.org.xml.sax.helpers.DefaultHandler,
                    LocatorImpl: Packages.org.xml.sax.helpers.LocatorImpl,
                    NamespaceSupport: Packages.org.xml.sax.helpers.NamespaceSupport,
                    ParserAdapter: Packages.org.xml.sax.helpers.ParserAdapter,
                    ParserFactory: Packages.org.xml.sax.helpers.ParserFactory,
                    XMLFilterImpl: Packages.org.xml.sax.helpers.XMLFilterImpl,
                    XMLReaderAdapter: Packages.org.xml.sax.helpers.XMLReaderAdapter,
                    XMLReaderFactory: Packages.org.xml.sax.helpers.XMLReaderFactory
                },
                ext: {
                    Attributes2Impl: Packages.org.xml.sax.ext.Attributes2Impl,
                    DefaultHandler2: Packages.org.xml.sax.ext.DefaultHandler2,
                    Locator2Impl: Packages.org.xml.sax.ext.Locator2Impl
                },
                HandlerBase: Packages.org.xml.sax.HandlerBase,
                InputSource: Packages.org.xml.sax.InputSource,
                SAXNotRecognizedException: Packages.org.xml.sax.SAXNotRecognizedException,
                SAXNotSupportedException: Packages.org.xml.sax.SAXNotSupportedException,
                SAXParseException: Packages.org.xml.sax.SAXParseException,
                SAXException: Packages.org.xml.sax.SAXException
            }
        },
        w3c: {
            dom: {
                bootstrap: {
                    DOMImplementationRegistry: Packages.org.w3c.dom.bootstrap.DOMImplementationRegistry
                },
                DOMException: Packages.org.w3c.dom.DOMException,
                events: {
                    EventException: Packages.org.w3c.dom.events.EventException
                },
                ls: {
                    LSException: Packages.org.w3c.dom.ls.LSException
                },
                ranges: {
                    RangeException: Packages.org.w3c.dom.ranges.RangeException
                },
                xpath: {
                    XPathException: Packages.org.w3c.dom.xpath.XPathException
                }
            }
        }
    },
    javax: {
        xml: {
            datatype: {
                DatatypeConstants: {
                    Field: Packages.javax.xml.datatype.DatatypeConstants.Field
                },
                DatatypeFactory: Packages.javax.xml.datatype.DatatypeFactory,
                Duration: Packages.javax.xml.datatype.Duration,
                DatatypeConfigurationException: Packages.javax.xml.datatype.DatatypeConfigurationException,
                XMLGregorianCalendar: Packages.javax.xml.datatype.XMLGregorianCalendar
            },
            parsers: {
                DocumentBuilder: Packages.javax.xml.parsers.DocumentBuilder,
                DocumentBuilderFactory: Packages.javax.xml.parsers.DocumentBuilderFactory,
                SAXParser: Packages.javax.xml.parsers.SAXParser,
                SAXParserFactory: Packages.javax.xml.parsers.SAXParserFactory,
                FactoryConfigurationError: Packages.javax.xml.parsers.FactoryConfigurationError,
                ParserConfigurationException: Packages.javax.xml.parsers.ParserConfigurationException
            },
            transform: {
                dom: {
                    DOMResult: Packages.javax.xml.transform.dom.DOMResult,
                    DOMSource: Packages.javax.xml.transform.dom.DOMSource
                },
                OutputKeys: Packages.javax.xml.transform.OutputKeys,
                sax: {
                    SAXResult: Packages.javax.xml.transform.sax.SAXResult,
                    SAXSource: Packages.javax.xml.transform.sax.SAXSource,
                    SAXTransformerFactory: Packages.javax.xml.transform.sax.SAXTransformerFactory
                },
                stream: {
                    StreamResult: Packages.javax.xml.transform.stream.StreamResult,
                    StreamSource: Packages.javax.xml.transform.stream.StreamSource
                },
                TransformerFactoryConfigurationError: Packages.javax.xml.transform.TransformerFactoryConfigurationError,
                TransformerConfigurationException: Packages.javax.xml.transform.TransformerConfigurationException,
                TransformerException: Packages.javax.xml.transform.TransformerException,
                Transformer: Packages.javax.xml.transform.Transformer,
                TransformerFactory: Packages.javax.xml.transform.TransformerFactory
            },
            namespace: {
                QName: Packages.javax.xml.namespace.QName
            },
            validation: {
                Schema: Packages.javax.xml.validation.Schema,
                SchemaFactory: Packages.javax.xml.validation.SchemaFactory,
                SchemaFactoryLoader: Packages.javax.xml.validation.SchemaFactoryLoader,
                TypeInfoProvider: Packages.javax.xml.validation.TypeInfoProvider,
                Validator: Packages.javax.xml.validation.Validator,
                ValidatorHandler: Packages.javax.xml.validation.ValidatorHandler
            },
            xpath: {
                XPathFunctionException: Packages.javax.xml.xpath.XPathFunctionException,
                XPathExpressionException: Packages.javax.xml.xpath.XPathExpressionException,
                XPathFactoryConfigurationException: Packages.javax.xml.xpath.XPathFactoryConfigurationException,
                XPathException: Packages.javax.xml.xpath.XPathException,
                XPathConstants: Packages.javax.xml.xpath.XPathConstants,
                XPathFactory: Packages.javax.xml.xpath.XPathFactory
            },
            XMLConstants: Packages.javax.xml.XMLConstants
        }
    }
}

exports.xml = xml;





























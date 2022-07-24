var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// ../../node_modules/validator/lib/util/assertString.js
var require_assertString = __commonJS({
  "../../node_modules/validator/lib/util/assertString.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = assertString;
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function assertString(input) {
      var isString2 = typeof input === "string" || input instanceof String;
      if (!isString2) {
        var invalidType = _typeof(input);
        if (input === null)
          invalidType = "null";
        else if (invalidType === "object")
          invalidType = input.constructor.name;
        throw new TypeError("Expected a string but received a ".concat(invalidType));
      }
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// ../../node_modules/validator/lib/isByteLength.js
var require_isByteLength = __commonJS({
  "../../node_modules/validator/lib/isByteLength.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isByteLength;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function isByteLength(str, options) {
      (0, _assertString.default)(str);
      var min;
      var max;
      if (_typeof(options) === "object") {
        min = options.min || 0;
        max = options.max;
      } else {
        min = arguments[1];
        max = arguments[2];
      }
      var len = encodeURI(str).split(/%..|./).length - 1;
      return len >= min && (typeof max === "undefined" || len <= max);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// ../../node_modules/validator/lib/util/merge.js
var require_merge = __commonJS({
  "../../node_modules/validator/lib/util/merge.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = merge;
    function merge() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var defaults = arguments.length > 1 ? arguments[1] : void 0;
      for (var key in defaults) {
        if (typeof obj[key] === "undefined") {
          obj[key] = defaults[key];
        }
      }
      return obj;
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// ../../node_modules/validator/lib/isFQDN.js
var require_isFQDN = __commonJS({
  "../../node_modules/validator/lib/isFQDN.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isFQDN;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var default_fqdn_options = {
      require_tld: true,
      allow_underscores: false,
      allow_trailing_dot: false,
      allow_numeric_tld: false,
      allow_wildcard: false
    };
    function isFQDN(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_fqdn_options);
      if (options.allow_trailing_dot && str[str.length - 1] === ".") {
        str = str.substring(0, str.length - 1);
      }
      if (options.allow_wildcard === true && str.indexOf("*.") === 0) {
        str = str.substring(2);
      }
      var parts = str.split(".");
      var tld = parts[parts.length - 1];
      if (options.require_tld) {
        if (parts.length < 2) {
          return false;
        }
        if (!/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
          return false;
        }
        if (/\s/.test(tld)) {
          return false;
        }
      }
      if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
        return false;
      }
      return parts.every(function(part) {
        if (part.length > 63) {
          return false;
        }
        if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
          return false;
        }
        if (/[\uff01-\uff5e]/.test(part)) {
          return false;
        }
        if (/^-|-$/.test(part)) {
          return false;
        }
        if (!options.allow_underscores && /_/.test(part)) {
          return false;
        }
        return true;
      });
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// ../../node_modules/validator/lib/isIP.js
var require_isIP = __commonJS({
  "../../node_modules/validator/lib/isIP.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isIP;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var IPv4SegmentFormat = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
    var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
    var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
    var IPv6SegmentFormat = "(?:[0-9a-fA-F]{1,4})";
    var IPv6AddressRegExp = new RegExp("^(" + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ")(%[0-9a-zA-Z-.:]{1,})?$");
    function isIP(str) {
      var version = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      (0, _assertString.default)(str);
      version = String(version);
      if (!version) {
        return isIP(str, 4) || isIP(str, 6);
      }
      if (version === "4") {
        if (!IPv4AddressRegExp.test(str)) {
          return false;
        }
        var parts = str.split(".").sort(function(a, b) {
          return a - b;
        });
        return parts[3] <= 255;
      }
      if (version === "6") {
        return !!IPv6AddressRegExp.test(str);
      }
      return false;
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// ../../node_modules/validator/lib/isEmail.js
var require_isEmail = __commonJS({
  "../../node_modules/validator/lib/isEmail.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isEmail2;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    var _isByteLength = _interopRequireDefault(require_isByteLength());
    var _isFQDN = _interopRequireDefault(require_isFQDN());
    var _isIP = _interopRequireDefault(require_isIP());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var default_email_options = {
      allow_display_name: false,
      require_display_name: false,
      allow_utf8_local_part: true,
      require_tld: true,
      blacklisted_chars: "",
      ignore_max_length: false,
      host_blacklist: []
    };
    var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
    var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
    var gmailUserPart = /^[a-z\d]+$/;
    var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
    var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
    var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
    var defaultMaxEmailLength = 254;
    function validateDisplayName(display_name) {
      var display_name_without_quotes = display_name.replace(/^"(.+)"$/, "$1");
      if (!display_name_without_quotes.trim()) {
        return false;
      }
      var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);
      if (contains_illegal) {
        if (display_name_without_quotes === display_name) {
          return false;
        }
        var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;
        if (!all_start_with_back_slash) {
          return false;
        }
      }
      return true;
    }
    function isEmail2(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_email_options);
      if (options.require_display_name || options.allow_display_name) {
        var display_email = str.match(splitNameAddress);
        if (display_email) {
          var display_name = display_email[1];
          str = str.replace(display_name, "").replace(/(^<|>$)/g, "");
          if (display_name.endsWith(" ")) {
            display_name = display_name.substr(0, display_name.length - 1);
          }
          if (!validateDisplayName(display_name)) {
            return false;
          }
        } else if (options.require_display_name) {
          return false;
        }
      }
      if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
        return false;
      }
      var parts = str.split("@");
      var domain = parts.pop();
      var lower_domain = domain.toLowerCase();
      if (options.host_blacklist.includes(lower_domain)) {
        return false;
      }
      var user = parts.join("@");
      if (options.domain_specific_validation && (lower_domain === "gmail.com" || lower_domain === "googlemail.com")) {
        user = user.toLowerCase();
        var username = user.split("+")[0];
        if (!(0, _isByteLength.default)(username.replace(/\./g, ""), {
          min: 6,
          max: 30
        })) {
          return false;
        }
        var _user_parts = username.split(".");
        for (var i = 0; i < _user_parts.length; i++) {
          if (!gmailUserPart.test(_user_parts[i])) {
            return false;
          }
        }
      }
      if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
        max: 64
      }) || !(0, _isByteLength.default)(domain, {
        max: 254
      }))) {
        return false;
      }
      if (!(0, _isFQDN.default)(domain, {
        require_tld: options.require_tld
      })) {
        if (!options.allow_ip_domain) {
          return false;
        }
        if (!(0, _isIP.default)(domain)) {
          if (!domain.startsWith("[") || !domain.endsWith("]")) {
            return false;
          }
          var noBracketdomain = domain.substr(1, domain.length - 2);
          if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
            return false;
          }
        }
      }
      if (user[0] === '"') {
        user = user.slice(1, user.length - 1);
        return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
      }
      var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
      var user_parts = user.split(".");
      for (var _i = 0; _i < user_parts.length; _i++) {
        if (!pattern.test(user_parts[_i])) {
          return false;
        }
      }
      if (options.blacklisted_chars) {
        if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), "g")) !== -1)
          return false;
      }
      return true;
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// ../../node_modules/validator/lib/isUUID.js
var require_isUUID = __commonJS({
  "../../node_modules/validator/lib/isUUID.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isUUID2;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var uuid = {
      1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
    };
    function isUUID2(str, version) {
      (0, _assertString.default)(str);
      var pattern = uuid[![void 0, null].includes(version) ? version : "all"];
      return !!pattern && pattern.test(str);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// ../../node_modules/validator/lib/isLength.js
var require_isLength = __commonJS({
  "../../node_modules/validator/lib/isLength.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isLength;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function isLength(str, options) {
      (0, _assertString.default)(str);
      var min;
      var max;
      if (_typeof(options) === "object") {
        min = options.min || 0;
        max = options.max;
      } else {
        min = arguments[1] || 0;
        max = arguments[2];
      }
      var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
      var len = str.length - surrogatePairs.length;
      return len >= min && (typeof max === "undefined" || len <= max);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// ../../node_modules/class-validator/esm5/metadata/ValidationMetadata.js
var ValidationMetadata = function() {
  function ValidationMetadata2(args) {
    this.groups = [];
    this.each = false;
    this.context = void 0;
    this.type = args.type;
    this.target = args.target;
    this.propertyName = args.propertyName;
    this.constraints = args.constraints;
    this.constraintCls = args.constraintCls;
    this.validationTypeOptions = args.validationTypeOptions;
    if (args.validationOptions) {
      this.message = args.validationOptions.message;
      this.groups = args.validationOptions.groups;
      this.always = args.validationOptions.always;
      this.each = args.validationOptions.each;
      this.context = args.validationOptions.context;
    }
  }
  return ValidationMetadata2;
}();

// ../../node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js
var ValidationSchemaToMetadataTransformer = function() {
  function ValidationSchemaToMetadataTransformer2() {
  }
  ValidationSchemaToMetadataTransformer2.prototype.transform = function(schema) {
    var metadatas = [];
    Object.keys(schema.properties).forEach(function(property) {
      schema.properties[property].forEach(function(validation) {
        var validationOptions = {
          message: validation.message,
          groups: validation.groups,
          always: validation.always,
          each: validation.each
        };
        var args = {
          type: validation.type,
          target: schema.name,
          propertyName: property,
          constraints: validation.constraints,
          validationTypeOptions: validation.options,
          validationOptions
        };
        metadatas.push(new ValidationMetadata(args));
      });
    });
    return metadatas;
  };
  return ValidationSchemaToMetadataTransformer2;
}();

// ../../node_modules/class-validator/esm5/utils/get-global.util.js
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof self !== "undefined") {
    return self;
  }
}

// ../../node_modules/class-validator/esm5/metadata/MetadataStorage.js
var MetadataStorage = function() {
  function MetadataStorage3() {
    this.validationMetadatas = [];
    this.constraintMetadatas = [];
  }
  Object.defineProperty(MetadataStorage3.prototype, "hasValidationMetaData", {
    get: function() {
      return !!this.validationMetadatas.length;
    },
    enumerable: false,
    configurable: true
  });
  MetadataStorage3.prototype.addValidationSchema = function(schema) {
    var _this = this;
    var validationMetadatas = new ValidationSchemaToMetadataTransformer().transform(schema);
    validationMetadatas.forEach(function(validationMetadata) {
      return _this.addValidationMetadata(validationMetadata);
    });
  };
  MetadataStorage3.prototype.addValidationMetadata = function(metadata) {
    this.validationMetadatas.push(metadata);
  };
  MetadataStorage3.prototype.addConstraintMetadata = function(metadata) {
    this.constraintMetadatas.push(metadata);
  };
  MetadataStorage3.prototype.groupByPropertyName = function(metadata) {
    var grouped = {};
    metadata.forEach(function(metadata2) {
      if (!grouped[metadata2.propertyName])
        grouped[metadata2.propertyName] = [];
      grouped[metadata2.propertyName].push(metadata2);
    });
    return grouped;
  };
  MetadataStorage3.prototype.getTargetValidationMetadatas = function(targetConstructor, targetSchema, always, strictGroups, groups) {
    var includeMetadataBecauseOfAlwaysOption = function(metadata) {
      if (typeof metadata.always !== "undefined")
        return metadata.always;
      if (metadata.groups && metadata.groups.length)
        return false;
      return always;
    };
    var excludeMetadataBecauseOfStrictGroupsOption = function(metadata) {
      if (strictGroups) {
        if (!groups || !groups.length) {
          if (metadata.groups && metadata.groups.length)
            return true;
        }
      }
      return false;
    };
    var originalMetadatas = this.validationMetadatas.filter(function(metadata) {
      if (metadata.target !== targetConstructor && metadata.target !== targetSchema)
        return false;
      if (includeMetadataBecauseOfAlwaysOption(metadata))
        return true;
      if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
        return false;
      if (groups && groups.length > 0)
        return metadata.groups && !!metadata.groups.find(function(group) {
          return groups.indexOf(group) !== -1;
        });
      return true;
    });
    var inheritedMetadatas = this.validationMetadatas.filter(function(metadata) {
      if (typeof metadata.target === "string")
        return false;
      if (metadata.target === targetConstructor)
        return false;
      if (metadata.target instanceof Function && !(targetConstructor.prototype instanceof metadata.target))
        return false;
      if (includeMetadataBecauseOfAlwaysOption(metadata))
        return true;
      if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
        return false;
      if (groups && groups.length > 0)
        return metadata.groups && !!metadata.groups.find(function(group) {
          return groups.indexOf(group) !== -1;
        });
      return true;
    });
    var uniqueInheritedMetadatas = inheritedMetadatas.filter(function(inheritedMetadata) {
      return !originalMetadatas.find(function(originalMetadata) {
        return originalMetadata.propertyName === inheritedMetadata.propertyName && originalMetadata.type === inheritedMetadata.type;
      });
    });
    return originalMetadatas.concat(uniqueInheritedMetadatas);
  };
  MetadataStorage3.prototype.getTargetValidatorConstraints = function(target) {
    return this.constraintMetadatas.filter(function(metadata) {
      return metadata.target === target;
    });
  };
  return MetadataStorage3;
}();
function getMetadataStorage() {
  var global2 = getGlobal();
  if (!global2.classValidatorMetadataStorage) {
    global2.classValidatorMetadataStorage = new MetadataStorage();
  }
  return global2.classValidatorMetadataStorage;
}

// ../../node_modules/class-validator/esm5/validation/ValidationTypes.js
var ValidationTypes = function() {
  function ValidationTypes2() {
  }
  ValidationTypes2.isValid = function(type) {
    var _this = this;
    return type !== "isValid" && type !== "getMessage" && Object.keys(this).map(function(key) {
      return _this[key];
    }).indexOf(type) !== -1;
  };
  ValidationTypes2.CUSTOM_VALIDATION = "customValidation";
  ValidationTypes2.NESTED_VALIDATION = "nestedValidation";
  ValidationTypes2.PROMISE_VALIDATION = "promiseValidation";
  ValidationTypes2.CONDITIONAL_VALIDATION = "conditionalValidation";
  ValidationTypes2.WHITELIST = "whitelistValidation";
  ValidationTypes2.IS_DEFINED = "isDefined";
  return ValidationTypes2;
}();

// ../../node_modules/class-validator/esm5/container.js
var defaultContainer = new (function() {
  function class_1() {
    this.instances = [];
  }
  class_1.prototype.get = function(someClass) {
    var instance = this.instances.find(function(instance2) {
      return instance2.type === someClass;
    });
    if (!instance) {
      instance = { type: someClass, object: new someClass() };
      this.instances.push(instance);
    }
    return instance.object;
  };
  return class_1;
}())();
var userContainer;
var userContainerOptions;
function getFromContainer(someClass) {
  if (userContainer) {
    try {
      var instance = userContainer.get(someClass);
      if (instance)
        return instance;
      if (!userContainerOptions || !userContainerOptions.fallback)
        return instance;
    } catch (error) {
      if (!userContainerOptions || !userContainerOptions.fallbackOnErrors)
        throw error;
    }
  }
  return defaultContainer.get(someClass);
}

// ../../node_modules/class-validator/esm5/metadata/ConstraintMetadata.js
var ConstraintMetadata = function() {
  function ConstraintMetadata2(target, name, async) {
    if (async === void 0) {
      async = false;
    }
    this.target = target;
    this.name = name;
    this.async = async;
  }
  Object.defineProperty(ConstraintMetadata2.prototype, "instance", {
    get: function() {
      return getFromContainer(this.target);
    },
    enumerable: false,
    configurable: true
  });
  return ConstraintMetadata2;
}();

// ../../node_modules/class-validator/esm5/register-decorator.js
function registerDecorator(options) {
  var constraintCls;
  if (options.validator instanceof Function) {
    constraintCls = options.validator;
    var constraintClasses = getFromContainer(MetadataStorage).getTargetValidatorConstraints(options.validator);
    if (constraintClasses.length > 1) {
      throw "More than one implementation of ValidatorConstraintInterface found for validator on: ".concat(options.target.name, ":").concat(options.propertyName);
    }
  } else {
    var validator_1 = options.validator;
    constraintCls = function() {
      function CustomConstraint() {
      }
      CustomConstraint.prototype.validate = function(value, validationArguments) {
        return validator_1.validate(value, validationArguments);
      };
      CustomConstraint.prototype.defaultMessage = function(validationArguments) {
        if (validator_1.defaultMessage) {
          return validator_1.defaultMessage(validationArguments);
        }
        return "";
      };
      return CustomConstraint;
    }();
    getMetadataStorage().addConstraintMetadata(new ConstraintMetadata(constraintCls, options.name, options.async));
  }
  var validationMetadataArgs = {
    type: options.name && ValidationTypes.isValid(options.name) ? options.name : ValidationTypes.CUSTOM_VALIDATION,
    target: options.target,
    propertyName: options.propertyName,
    validationOptions: options.options,
    constraintCls,
    constraints: options.constraints
  };
  getMetadataStorage().addValidationMetadata(new ValidationMetadata(validationMetadataArgs));
}

// ../../node_modules/class-validator/esm5/decorator/common/ValidateBy.js
function buildMessage(impl, validationOptions) {
  return function(validationArguments) {
    var eachPrefix = validationOptions && validationOptions.each ? "each value in " : "";
    return impl(eachPrefix, validationArguments);
  };
}
function ValidateBy(options, validationOptions) {
  return function(object, propertyName) {
    registerDecorator({
      name: options.name,
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: options.constraints,
      validator: options.validator
    });
  };
}

// ../../node_modules/class-validator/esm5/decorator/common/IsDefined.js
var IS_DEFINED = ValidationTypes.IS_DEFINED;
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function IsDefined(validationOptions) {
  return ValidateBy({
    name: IS_DEFINED,
    validator: {
      validate: function(value) {
        return isDefined(value);
      },
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property should not be null or undefined";
      }, validationOptions)
    }
  }, validationOptions);
}

// ../../node_modules/class-validator/esm5/decorator/common/IsOptional.js
function IsOptional(validationOptions) {
  return function(object, propertyName) {
    var args = {
      type: ValidationTypes.CONDITIONAL_VALIDATION,
      target: object.constructor,
      propertyName,
      constraints: [
        function(object2, value) {
          return object2[propertyName] !== null && object2[propertyName] !== void 0;
        }
      ],
      validationOptions
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
  };
}

// ../../node_modules/class-validator/esm5/decorator/common/ValidateNested.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function ValidateNested(validationOptions) {
  var opts = __assign({}, validationOptions);
  var eachPrefix = opts.each ? "each value in " : "";
  opts.message = opts.message || eachPrefix + "nested property $property must be either object or array";
  return function(object, propertyName) {
    var args = {
      type: ValidationTypes.NESTED_VALIDATION,
      target: object.constructor,
      propertyName,
      validationOptions: opts
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
  };
}

// ../../node_modules/class-validator/esm5/decorator/string/IsEmail.js
var import_isEmail = __toESM(require_isEmail());
var IS_EMAIL = "isEmail";
function isEmail(value, options) {
  return typeof value === "string" && (0, import_isEmail.default)(value, options);
}
function IsEmail(options, validationOptions) {
  return ValidateBy({
    name: IS_EMAIL,
    constraints: [options],
    validator: {
      validate: function(value, args) {
        return isEmail(value, args.constraints[0]);
      },
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be an email";
      }, validationOptions)
    }
  }, validationOptions);
}

// ../../node_modules/class-validator/esm5/decorator/string/IsUUID.js
var import_isUUID = __toESM(require_isUUID());
var IS_UUID = "isUuid";
function isUUID(value, version) {
  return typeof value === "string" && (0, import_isUUID.default)(value, version);
}
function IsUUID(version, validationOptions) {
  return ValidateBy({
    name: IS_UUID,
    constraints: [version],
    validator: {
      validate: function(value, args) {
        return isUUID(value, args.constraints[0]);
      },
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be a UUID";
      }, validationOptions)
    }
  }, validationOptions);
}

// ../../node_modules/class-validator/esm5/decorator/string/MaxLength.js
var import_isLength = __toESM(require_isLength());
var MAX_LENGTH = "maxLength";
function maxLength(value, max) {
  return typeof value === "string" && (0, import_isLength.default)(value, { min: 0, max });
}
function MaxLength(max, validationOptions) {
  return ValidateBy({
    name: MAX_LENGTH,
    constraints: [max],
    validator: {
      validate: function(value, args) {
        return maxLength(value, args.constraints[0]);
      },
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be shorter than or equal to $constraint1 characters";
      }, validationOptions)
    }
  }, validationOptions);
}

// ../../node_modules/class-validator/esm5/decorator/string/MinLength.js
var import_isLength2 = __toESM(require_isLength());
var MIN_LENGTH = "minLength";
function minLength(value, min) {
  return typeof value === "string" && (0, import_isLength2.default)(value, { min });
}
function MinLength(min, validationOptions) {
  return ValidateBy({
    name: MIN_LENGTH,
    constraints: [min],
    validator: {
      validate: function(value, args) {
        return minLength(value, args.constraints[0]);
      },
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be longer than or equal to $constraint1 characters";
      }, validationOptions)
    }
  }, validationOptions);
}

// ../../node_modules/class-validator/esm5/decorator/typechecker/IsBoolean.js
var IS_BOOLEAN = "isBoolean";
function isBoolean(value) {
  return value instanceof Boolean || typeof value === "boolean";
}
function IsBoolean(validationOptions) {
  return ValidateBy({
    name: IS_BOOLEAN,
    validator: {
      validate: function(value, args) {
        return isBoolean(value);
      },
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be a boolean value";
      }, validationOptions)
    }
  }, validationOptions);
}

// ../../node_modules/class-validator/esm5/decorator/typechecker/IsNumber.js
var IS_NUMBER = "isNumber";
function isNumber(value, options) {
  if (options === void 0) {
    options = {};
  }
  if (typeof value !== "number") {
    return false;
  }
  if (value === Infinity || value === -Infinity) {
    return options.allowInfinity;
  }
  if (Number.isNaN(value)) {
    return options.allowNaN;
  }
  if (options.maxDecimalPlaces !== void 0) {
    var decimalPlaces = 0;
    if (value % 1 !== 0) {
      decimalPlaces = value.toString().split(".")[1].length;
    }
    if (decimalPlaces > options.maxDecimalPlaces) {
      return false;
    }
  }
  return Number.isFinite(value);
}
function IsNumber(options, validationOptions) {
  if (options === void 0) {
    options = {};
  }
  return ValidateBy({
    name: IS_NUMBER,
    constraints: [options],
    validator: {
      validate: function(value, args) {
        return isNumber(value, args.constraints[0]);
      },
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be a number conforming to the specified constraints";
      }, validationOptions)
    }
  }, validationOptions);
}

// ../../node_modules/class-validator/esm5/decorator/typechecker/IsString.js
var IS_STRING = "isString";
function isString(value) {
  return value instanceof String || typeof value === "string";
}
function IsString(validationOptions) {
  return ValidateBy({
    name: IS_STRING,
    validator: {
      validate: function(value, args) {
        return isString(value);
      },
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be a string";
      }, validationOptions)
    }
  }, validationOptions);
}

// ../../node_modules/class-transformer/esm5/enums/transformation-type.enum.js
var TransformationType;
(function(TransformationType2) {
  TransformationType2[TransformationType2["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
  TransformationType2[TransformationType2["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
  TransformationType2[TransformationType2["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
})(TransformationType || (TransformationType = {}));

// ../../node_modules/class-transformer/esm5/MetadataStorage.js
var MetadataStorage2 = function() {
  function MetadataStorage3() {
    this._typeMetadatas = /* @__PURE__ */ new Map();
    this._transformMetadatas = /* @__PURE__ */ new Map();
    this._exposeMetadatas = /* @__PURE__ */ new Map();
    this._excludeMetadatas = /* @__PURE__ */ new Map();
    this._ancestorsMap = /* @__PURE__ */ new Map();
  }
  MetadataStorage3.prototype.addTypeMetadata = function(metadata) {
    if (!this._typeMetadatas.has(metadata.target)) {
      this._typeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
    }
    this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
  };
  MetadataStorage3.prototype.addTransformMetadata = function(metadata) {
    if (!this._transformMetadatas.has(metadata.target)) {
      this._transformMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
    }
    if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
      this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
    }
    this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
  };
  MetadataStorage3.prototype.addExposeMetadata = function(metadata) {
    if (!this._exposeMetadatas.has(metadata.target)) {
      this._exposeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
    }
    this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
  };
  MetadataStorage3.prototype.addExcludeMetadata = function(metadata) {
    if (!this._excludeMetadatas.has(metadata.target)) {
      this._excludeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
    }
    this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
  };
  MetadataStorage3.prototype.findTransformMetadatas = function(target, propertyName, transformationType) {
    return this.findMetadatas(this._transformMetadatas, target, propertyName).filter(function(metadata) {
      if (!metadata.options)
        return true;
      if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
        return true;
      if (metadata.options.toClassOnly === true) {
        return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
      }
      if (metadata.options.toPlainOnly === true) {
        return transformationType === TransformationType.CLASS_TO_PLAIN;
      }
      return true;
    });
  };
  MetadataStorage3.prototype.findExcludeMetadata = function(target, propertyName) {
    return this.findMetadata(this._excludeMetadatas, target, propertyName);
  };
  MetadataStorage3.prototype.findExposeMetadata = function(target, propertyName) {
    return this.findMetadata(this._exposeMetadatas, target, propertyName);
  };
  MetadataStorage3.prototype.findExposeMetadataByCustomName = function(target, name) {
    return this.getExposedMetadatas(target).find(function(metadata) {
      return metadata.options && metadata.options.name === name;
    });
  };
  MetadataStorage3.prototype.findTypeMetadata = function(target, propertyName) {
    return this.findMetadata(this._typeMetadatas, target, propertyName);
  };
  MetadataStorage3.prototype.getStrategy = function(target) {
    var excludeMap = this._excludeMetadatas.get(target);
    var exclude = excludeMap && excludeMap.get(void 0);
    var exposeMap = this._exposeMetadatas.get(target);
    var expose = exposeMap && exposeMap.get(void 0);
    if (exclude && expose || !exclude && !expose)
      return "none";
    return exclude ? "excludeAll" : "exposeAll";
  };
  MetadataStorage3.prototype.getExposedMetadatas = function(target) {
    return this.getMetadata(this._exposeMetadatas, target);
  };
  MetadataStorage3.prototype.getExcludedMetadatas = function(target) {
    return this.getMetadata(this._excludeMetadatas, target);
  };
  MetadataStorage3.prototype.getExposedProperties = function(target, transformationType) {
    return this.getExposedMetadatas(target).filter(function(metadata) {
      if (!metadata.options)
        return true;
      if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
        return true;
      if (metadata.options.toClassOnly === true) {
        return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
      }
      if (metadata.options.toPlainOnly === true) {
        return transformationType === TransformationType.CLASS_TO_PLAIN;
      }
      return true;
    }).map(function(metadata) {
      return metadata.propertyName;
    });
  };
  MetadataStorage3.prototype.getExcludedProperties = function(target, transformationType) {
    return this.getExcludedMetadatas(target).filter(function(metadata) {
      if (!metadata.options)
        return true;
      if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
        return true;
      if (metadata.options.toClassOnly === true) {
        return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
      }
      if (metadata.options.toPlainOnly === true) {
        return transformationType === TransformationType.CLASS_TO_PLAIN;
      }
      return true;
    }).map(function(metadata) {
      return metadata.propertyName;
    });
  };
  MetadataStorage3.prototype.clear = function() {
    this._typeMetadatas.clear();
    this._exposeMetadatas.clear();
    this._excludeMetadatas.clear();
    this._ancestorsMap.clear();
  };
  MetadataStorage3.prototype.getMetadata = function(metadatas, target) {
    var metadataFromTargetMap = metadatas.get(target);
    var metadataFromTarget;
    if (metadataFromTargetMap) {
      metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function(meta) {
        return meta.propertyName !== void 0;
      });
    }
    var metadataFromAncestors = [];
    for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
      var ancestor = _a[_i];
      var ancestorMetadataMap = metadatas.get(ancestor);
      if (ancestorMetadataMap) {
        var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function(meta) {
          return meta.propertyName !== void 0;
        });
        metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
      }
    }
    return metadataFromAncestors.concat(metadataFromTarget || []);
  };
  MetadataStorage3.prototype.findMetadata = function(metadatas, target, propertyName) {
    var metadataFromTargetMap = metadatas.get(target);
    if (metadataFromTargetMap) {
      var metadataFromTarget = metadataFromTargetMap.get(propertyName);
      if (metadataFromTarget) {
        return metadataFromTarget;
      }
    }
    for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
      var ancestor = _a[_i];
      var ancestorMetadataMap = metadatas.get(ancestor);
      if (ancestorMetadataMap) {
        var ancestorResult = ancestorMetadataMap.get(propertyName);
        if (ancestorResult) {
          return ancestorResult;
        }
      }
    }
    return void 0;
  };
  MetadataStorage3.prototype.findMetadatas = function(metadatas, target, propertyName) {
    var metadataFromTargetMap = metadatas.get(target);
    var metadataFromTarget;
    if (metadataFromTargetMap) {
      metadataFromTarget = metadataFromTargetMap.get(propertyName);
    }
    var metadataFromAncestorsTarget = [];
    for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
      var ancestor = _a[_i];
      var ancestorMetadataMap = metadatas.get(ancestor);
      if (ancestorMetadataMap) {
        if (ancestorMetadataMap.has(propertyName)) {
          metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
        }
      }
    }
    return metadataFromAncestorsTarget.slice().reverse().concat((metadataFromTarget || []).slice().reverse());
  };
  MetadataStorage3.prototype.getAncestors = function(target) {
    if (!target)
      return [];
    if (!this._ancestorsMap.has(target)) {
      var ancestors = [];
      for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
        ancestors.push(baseClass);
      }
      this._ancestorsMap.set(target, ancestors);
    }
    return this._ancestorsMap.get(target);
  };
  return MetadataStorage3;
}();

// ../../node_modules/class-transformer/esm5/storage.js
var defaultMetadataStorage = new MetadataStorage2();

// ../../node_modules/class-transformer/esm5/decorators/type.decorator.js
function Type(typeFunction, options) {
  if (options === void 0) {
    options = {};
  }
  return function(target, propertyName) {
    var reflectedType = Reflect.getMetadata("design:type", target, propertyName);
    defaultMetadataStorage.addTypeMetadata({
      target: target.constructor,
      propertyName,
      reflectedType,
      typeFunction,
      options
    });
  };
}

// ../contracts/dist/main.mjs
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
var ResponseStatuses = /* @__PURE__ */ ((ResponseStatuses2) => {
  ResponseStatuses2["error"] = "error";
  ResponseStatuses2["success"] = "success";
  return ResponseStatuses2;
})(ResponseStatuses || {});
var AccountGetUserProfileRequest = class {
  userId;
};
__decorateClass([
  IsString()
], AccountGetUserProfileRequest.prototype, "userId", 2);
var AccountUpdateUserProfileRequest = class {
  userId;
  email;
  isActive;
  firstName;
  lastName;
  nickname;
  bio;
};
__decorateClass([
  IsString()
], AccountUpdateUserProfileRequest.prototype, "userId", 2);
__decorateClass([
  IsString()
], AccountUpdateUserProfileRequest.prototype, "email", 2);
__decorateClass([
  IsBoolean()
], AccountUpdateUserProfileRequest.prototype, "isActive", 2);
__decorateClass([
  IsOptional(),
  IsString()
], AccountUpdateUserProfileRequest.prototype, "firstName", 2);
__decorateClass([
  IsOptional(),
  IsString()
], AccountUpdateUserProfileRequest.prototype, "lastName", 2);
__decorateClass([
  IsOptional(),
  IsString()
], AccountUpdateUserProfileRequest.prototype, "nickname", 2);
__decorateClass([
  IsOptional(),
  IsString()
], AccountUpdateUserProfileRequest.prototype, "bio", 2);
var AccountRegisterRequest = class {
  email;
  password;
};
__decorateClass([
  IsEmail(),
  MaxLength(320)
], AccountRegisterRequest.prototype, "email", 2);
__decorateClass([
  IsDefined(),
  MinLength(8),
  MaxLength(32)
], AccountRegisterRequest.prototype, "password", 2);
var AccountLoginRequest = class {
  email;
  password;
};
__decorateClass([
  IsEmail()
], AccountLoginRequest.prototype, "email", 2);
__decorateClass([
  IsString()
], AccountLoginRequest.prototype, "password", 2);
var AccountLogoutRequest = class {
  refreshToken;
};
__decorateClass([
  IsDefined()
], AccountLogoutRequest.prototype, "refreshToken", 2);
var UserInTokenDot = class {
  userId;
};
__decorateClass([
  IsString()
], UserInTokenDot.prototype, "userId", 2);
var AccountRefreshRequest = class {
  refreshToken;
  user;
};
__decorateClass([
  IsString()
], AccountRefreshRequest.prototype, "refreshToken", 2);
__decorateClass([
  IsDefined(),
  ValidateNested({ each: true }),
  Type(() => UserInTokenDot)
], AccountRefreshRequest.prototype, "user", 2);
var AccountLogoutAllRequest = class {
  userId;
};
__decorateClass([
  IsDefined()
], AccountLogoutAllRequest.prototype, "userId", 2);
var GiftCreateGiftRequest = class {
  userId;
  title;
  text;
};
__decorateClass([
  IsString()
], GiftCreateGiftRequest.prototype, "userId", 2);
__decorateClass([
  MaxLength(12),
  IsString()
], GiftCreateGiftRequest.prototype, "title", 2);
__decorateClass([
  MaxLength(280),
  IsString()
], GiftCreateGiftRequest.prototype, "text", 2);
var GiftUpdateGiftRequest = class {
  giftId;
  userId;
  title;
  text;
};
__decorateClass([
  IsUUID()
], GiftUpdateGiftRequest.prototype, "giftId", 2);
__decorateClass([
  IsString()
], GiftUpdateGiftRequest.prototype, "userId", 2);
__decorateClass([
  MaxLength(12),
  IsString()
], GiftUpdateGiftRequest.prototype, "title", 2);
__decorateClass([
  MaxLength(280),
  IsString()
], GiftUpdateGiftRequest.prototype, "text", 2);
var GiftGetGiftsRequest = class {
  giftId;
  userId;
  skip;
  take;
};
__decorateClass([
  IsOptional(),
  IsString()
], GiftGetGiftsRequest.prototype, "giftId", 2);
__decorateClass([
  IsOptional(),
  IsString()
], GiftGetGiftsRequest.prototype, "userId", 2);
__decorateClass([
  Type(() => Number),
  IsOptional(),
  IsNumber()
], GiftGetGiftsRequest.prototype, "skip", 2);
__decorateClass([
  Type(() => Number),
  IsOptional(),
  IsNumber()
], GiftGetGiftsRequest.prototype, "take", 2);

// src/utils/is-error-responce.type-guard.ts
var isError = (res) => {
  return res.status === ResponseStatuses.error;
};

// src/utils/reply-error-handler.ts
function replyErrorHandler(channel, msg, error) {
  const { replyTo, correlationId } = msg.properties;
  if (replyTo) {
    console.log(error);
    const errorToResonce = Buffer.from(JSON.stringify({
      status: "error",
      error: error.getResponse()
    }));
    channel.publish("", replyTo, errorToResonce, { correlationId });
    channel.ack(msg);
  }
}
export {
  isError,
  replyErrorHandler
};

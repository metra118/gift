"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/main.ts
var main_exports = {};
__export(main_exports, {
  AccountGetUserRequest: () => AccountGetUserRequest,
  AccountGetUserResponse: () => AccountGetUserResponse,
  AccountLoginRequest: () => AccountLoginRequest,
  AccountLoginResponse: () => AccountLoginResponse,
  AccountLogoutRequest: () => AccountLogoutRequest,
  AccountRegisterRequest: () => AccountRegisterRequest,
  AccountRegisterResponse: () => AccountRegisterResponse,
  accountGetUserTopic: () => accountGetUserTopic,
  accountLoginTopic: () => accountLoginTopic,
  accountLogoutTopic: () => accountLogoutTopic,
  accountRegisterTopic: () => accountRegisterTopic
});
module.exports = __toCommonJS(main_exports);

// src/account/account.get-user.ts
var import_class_validator = require("class-validator");
var accountGetUserTopic = "account.get-user.query";
var AccountGetUserRequest = class {
  userId;
};
__decorateClass([
  (0, import_class_validator.IsNumber)()
], AccountGetUserRequest.prototype, "userId", 2);
var AccountGetUserResponse = class {
  name;
};

// src/account/account.register.ts
var import_class_validator2 = require("class-validator");
var accountRegisterTopic = "account.register.command";
var AccountRegisterRequest = class {
  email;
  password;
};
__decorateClass([
  (0, import_class_validator2.IsEmail)(),
  (0, import_class_validator2.MaxLength)(320)
], AccountRegisterRequest.prototype, "email", 2);
__decorateClass([
  (0, import_class_validator2.IsDefined)(),
  (0, import_class_validator2.MinLength)(8),
  (0, import_class_validator2.MaxLength)(32)
], AccountRegisterRequest.prototype, "password", 2);
var AccountRegisterResponse = class {
  accessToken;
  refreshToken;
};

// src/account/account.login.ts
var import_class_validator3 = require("class-validator");
var accountLoginTopic = "account.login.command";
var AccountLoginRequest = class {
  email;
  password;
};
__decorateClass([
  (0, import_class_validator3.IsEmail)()
], AccountLoginRequest.prototype, "email", 2);
__decorateClass([
  (0, import_class_validator3.IsString)()
], AccountLoginRequest.prototype, "password", 2);
var AccountLoginResponse = class {
  accessToken;
  refreshToken;
};

// src/account/account.logout.ts
var import_class_validator4 = require("class-validator");
var accountLogoutTopic = "account.logout.command";
var AccountLogoutRequest = class {
  refreshToken;
};
__decorateClass([
  (0, import_class_validator4.IsString)()
], AccountLogoutRequest.prototype, "refreshToken", 2);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccountGetUserRequest,
  AccountGetUserResponse,
  AccountLoginRequest,
  AccountLoginResponse,
  AccountLogoutRequest,
  AccountRegisterRequest,
  AccountRegisterResponse,
  accountGetUserTopic,
  accountLoginTopic,
  accountLogoutTopic,
  accountRegisterTopic
});

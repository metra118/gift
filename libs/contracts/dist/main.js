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
  AccountLoginRequest: () => AccountLoginRequest,
  AccountLogoutAllRequest: () => AccountLogoutAllRequest,
  AccountLogoutRequest: () => AccountLogoutRequest,
  AccountRefreshRequest: () => AccountRefreshRequest,
  AccountRegisterRequest: () => AccountRegisterRequest,
  AccountRemoveDeadTokensRequest: () => AccountRemoveDeadTokensRequest,
  ResponseError: () => ResponseError,
  ResponseStatuses: () => ResponseStatuses,
  ResponseSuccess: () => ResponseSuccess,
  UserInToken: () => UserInToken,
  accountGetUserTopic: () => accountGetUserTopic,
  accountLoginKey: () => accountLoginKey,
  accountLogoutAllKey: () => accountLogoutAllKey,
  accountLogoutKey: () => accountLogoutKey,
  accountRefreshKey: () => accountRefreshKey,
  accountRegisterKey: () => accountRegisterKey,
  accountRemoveDeadTokensKey: () => accountRemoveDeadTokensKey
});
module.exports = __toCommonJS(main_exports);

// src/account/account.get-user.ts
var import_class_validator = require("class-validator");

// src/common/response/response-statuses.ts
var ResponseStatuses = /* @__PURE__ */ ((ResponseStatuses2) => {
  ResponseStatuses2["error"] = "error";
  ResponseStatuses2["success"] = "success";
  return ResponseStatuses2;
})(ResponseStatuses || {});

// src/common/response/response-success.ts
var ResponseSuccess = class {
  status = "success" /* success */;
};

// src/account/account.get-user.ts
var accountGetUserTopic = "account.get-user.query";
var AccountGetUserRequest = class {
  userId;
};
__decorateClass([
  (0, import_class_validator.IsNumber)()
], AccountGetUserRequest.prototype, "userId", 2);

// src/account/account.register.ts
var import_class_validator2 = require("class-validator");
var accountRegisterKey = "account.register.command";
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

// src/account/account.login.ts
var import_class_validator3 = require("class-validator");
var accountLoginKey = "account.login.command";
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

// src/account/account.logout.ts
var import_class_validator4 = require("class-validator");
var accountLogoutKey = "account.logout.command";
var AccountLogoutRequest = class {
  refreshToken;
};
__decorateClass([
  (0, import_class_validator4.IsDefined)()
], AccountLogoutRequest.prototype, "refreshToken", 2);

// src/account/account.refresh.ts
var import_class_validator5 = require("class-validator");
var import_class_transformer = require("class-transformer");
var accountRefreshKey = "account.refresh.command";
var UserInToken = class {
  userId;
};
__decorateClass([
  (0, import_class_validator5.IsString)()
], UserInToken.prototype, "userId", 2);
var AccountRefreshRequest = class {
  refreshToken;
  user;
};
__decorateClass([
  (0, import_class_validator5.IsString)()
], AccountRefreshRequest.prototype, "refreshToken", 2);
__decorateClass([
  (0, import_class_validator5.IsDefined)(),
  (0, import_class_validator5.ValidateNested)({ each: true }),
  (0, import_class_transformer.Type)(() => UserInToken)
], AccountRefreshRequest.prototype, "user", 2);

// src/account/account.logout-all.ts
var import_class_validator6 = require("class-validator");
var accountLogoutAllKey = "account.logouta-all.command";
var AccountLogoutAllRequest = class {
  userId;
};
__decorateClass([
  (0, import_class_validator6.IsDefined)()
], AccountLogoutAllRequest.prototype, "userId", 2);

// src/account/account.remove-dead-tokens.ts
var accountRemoveDeadTokensKey = "account.remove-dead-tokens.command";
var AccountRemoveDeadTokensRequest = class {
};

// src/common/response/response-error.ts
var ResponseError = class {
  status = "error" /* error */;
  error;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccountGetUserRequest,
  AccountLoginRequest,
  AccountLogoutAllRequest,
  AccountLogoutRequest,
  AccountRefreshRequest,
  AccountRegisterRequest,
  AccountRemoveDeadTokensRequest,
  ResponseError,
  ResponseStatuses,
  ResponseSuccess,
  UserInToken,
  accountGetUserTopic,
  accountLoginKey,
  accountLogoutAllKey,
  accountLogoutKey,
  accountRefreshKey,
  accountRegisterKey,
  accountRemoveDeadTokensKey
});

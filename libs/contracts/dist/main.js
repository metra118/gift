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
  AccountGetUserProfileRequest: () => AccountGetUserProfileRequest,
  AccountLoginRequest: () => AccountLoginRequest,
  AccountLogoutAllRequest: () => AccountLogoutAllRequest,
  AccountLogoutRequest: () => AccountLogoutRequest,
  AccountRefreshRequest: () => AccountRefreshRequest,
  AccountRegisterRequest: () => AccountRegisterRequest,
  AccountRemoveDeadTokensRequest: () => AccountRemoveDeadTokensRequest,
  AccountUpdateUserProfileRequest: () => AccountUpdateUserProfileRequest,
  ResponseError: () => ResponseError,
  ResponseStatuses: () => ResponseStatuses,
  ResponseSuccess: () => ResponseSuccess,
  UserInTokenDot: () => UserInTokenDot,
  accountGetUserProfileTopic: () => accountGetUserProfileTopic,
  accountLoginKey: () => accountLoginKey,
  accountLogoutAllKey: () => accountLogoutAllKey,
  accountLogoutKey: () => accountLogoutKey,
  accountRefreshKey: () => accountRefreshKey,
  accountRegisterKey: () => accountRegisterKey,
  accountRemoveDeadTokensKey: () => accountRemoveDeadTokensKey,
  accountUpdateUserProfileTopic: () => accountUpdateUserProfileTopic
});
module.exports = __toCommonJS(main_exports);

// src/account/user/account.get-user-profile.ts
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

// src/account/user/account.get-user-profile.ts
var accountGetUserProfileTopic = "account.get-user-profile.query";
var AccountGetUserProfileRequest = class {
  userId;
};
__decorateClass([
  (0, import_class_validator.IsString)()
], AccountGetUserProfileRequest.prototype, "userId", 2);

// src/account/user/account.update-user-profile.ts
var import_class_validator2 = require("class-validator");
var accountUpdateUserProfileTopic = "account.update-user-profile.command";
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
  (0, import_class_validator2.IsString)()
], AccountUpdateUserProfileRequest.prototype, "userId", 2);
__decorateClass([
  (0, import_class_validator2.IsString)()
], AccountUpdateUserProfileRequest.prototype, "email", 2);
__decorateClass([
  (0, import_class_validator2.IsBoolean)()
], AccountUpdateUserProfileRequest.prototype, "isActive", 2);
__decorateClass([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_validator2.IsString)()
], AccountUpdateUserProfileRequest.prototype, "firstName", 2);
__decorateClass([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_validator2.IsString)()
], AccountUpdateUserProfileRequest.prototype, "lastName", 2);
__decorateClass([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_validator2.IsString)()
], AccountUpdateUserProfileRequest.prototype, "nickname", 2);
__decorateClass([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_validator2.IsString)()
], AccountUpdateUserProfileRequest.prototype, "bio", 2);

// src/account/auth/account.register.ts
var import_class_validator3 = require("class-validator");
var accountRegisterKey = "account.register.command";
var AccountRegisterRequest = class {
  email;
  password;
};
__decorateClass([
  (0, import_class_validator3.IsEmail)(),
  (0, import_class_validator3.MaxLength)(320)
], AccountRegisterRequest.prototype, "email", 2);
__decorateClass([
  (0, import_class_validator3.IsDefined)(),
  (0, import_class_validator3.MinLength)(8),
  (0, import_class_validator3.MaxLength)(32)
], AccountRegisterRequest.prototype, "password", 2);

// src/account/auth/account.login.ts
var import_class_validator4 = require("class-validator");
var accountLoginKey = "account.login.command";
var AccountLoginRequest = class {
  email;
  password;
};
__decorateClass([
  (0, import_class_validator4.IsEmail)()
], AccountLoginRequest.prototype, "email", 2);
__decorateClass([
  (0, import_class_validator4.IsString)()
], AccountLoginRequest.prototype, "password", 2);

// src/account/auth/account.logout.ts
var import_class_validator5 = require("class-validator");
var accountLogoutKey = "account.logout.command";
var AccountLogoutRequest = class {
  refreshToken;
};
__decorateClass([
  (0, import_class_validator5.IsDefined)()
], AccountLogoutRequest.prototype, "refreshToken", 2);

// src/account/auth/account.refresh.ts
var import_class_validator6 = require("class-validator");
var import_class_transformer = require("class-transformer");
var accountRefreshKey = "account.refresh.command";
var UserInTokenDot = class {
  userId;
};
__decorateClass([
  (0, import_class_validator6.IsString)()
], UserInTokenDot.prototype, "userId", 2);
var AccountRefreshRequest = class {
  refreshToken;
  user;
};
__decorateClass([
  (0, import_class_validator6.IsString)()
], AccountRefreshRequest.prototype, "refreshToken", 2);
__decorateClass([
  (0, import_class_validator6.IsDefined)(),
  (0, import_class_validator6.ValidateNested)({ each: true }),
  (0, import_class_transformer.Type)(() => UserInTokenDot)
], AccountRefreshRequest.prototype, "user", 2);

// src/account/auth/account.logout-all.ts
var import_class_validator7 = require("class-validator");
var accountLogoutAllKey = "account.logouta-all.command";
var AccountLogoutAllRequest = class {
  userId;
};
__decorateClass([
  (0, import_class_validator7.IsDefined)()
], AccountLogoutAllRequest.prototype, "userId", 2);

// src/account/auth/account.remove-dead-tokens.ts
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
  AccountGetUserProfileRequest,
  AccountLoginRequest,
  AccountLogoutAllRequest,
  AccountLogoutRequest,
  AccountRefreshRequest,
  AccountRegisterRequest,
  AccountRemoveDeadTokensRequest,
  AccountUpdateUserProfileRequest,
  ResponseError,
  ResponseStatuses,
  ResponseSuccess,
  UserInTokenDot,
  accountGetUserProfileTopic,
  accountLoginKey,
  accountLogoutAllKey,
  accountLogoutKey,
  accountRefreshKey,
  accountRegisterKey,
  accountRemoveDeadTokensKey,
  accountUpdateUserProfileTopic
});

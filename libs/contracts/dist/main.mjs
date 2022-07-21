var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/account/account.get-user.ts
import { IsNumber } from "class-validator";

// src/common/responce-statuses.ts
var ResponceStatuses = /* @__PURE__ */ ((ResponceStatuses2) => {
  ResponceStatuses2["error"] = "error";
  ResponceStatuses2["success"] = "success";
  return ResponceStatuses2;
})(ResponceStatuses || {});

// src/common/response-success.ts
var ResponseSuccess = class {
  status = "success" /* success */;
};

// src/account/account.get-user.ts
var accountGetUserTopic = "account.get-user.query";
var AccountGetUserRequest = class {
  userId;
};
__decorateClass([
  IsNumber()
], AccountGetUserRequest.prototype, "userId", 2);

// src/account/account.register.ts
import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator";
var accountRegisterKey = "account.register.command";
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

// src/account/account.login.ts
import { IsEmail as IsEmail2, IsString } from "class-validator";
var accountLoginKey = "account.login.command";
var AccountLoginRequest = class {
  email;
  password;
};
__decorateClass([
  IsEmail2()
], AccountLoginRequest.prototype, "email", 2);
__decorateClass([
  IsString()
], AccountLoginRequest.prototype, "password", 2);

// src/account/account.logout.ts
import { IsDefined as IsDefined2 } from "class-validator";
var accountLogoutKey = "account.logout.command";
var AccountLogoutRequest = class {
  refreshToken;
};
__decorateClass([
  IsDefined2()
], AccountLogoutRequest.prototype, "refreshToken", 2);

// src/account/account.refresh.ts
import { IsDefined as IsDefined3, IsString as IsString2, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
var accountRefreshKey = "account.refresh.command";
var UserInToken = class {
  userId;
};
__decorateClass([
  IsString2()
], UserInToken.prototype, "userId", 2);
var AccountRefreshRequest = class {
  refreshToken;
  user;
};
__decorateClass([
  IsString2()
], AccountRefreshRequest.prototype, "refreshToken", 2);
__decorateClass([
  IsDefined3(),
  ValidateNested({ each: true }),
  Type(() => UserInToken)
], AccountRefreshRequest.prototype, "user", 2);

// src/common/response-error.ts
var ResponseError = class {
  status = "error" /* error */;
  error;
};
export {
  AccountGetUserRequest,
  AccountLoginRequest,
  AccountLogoutRequest,
  AccountRefreshRequest,
  AccountRegisterRequest,
  ResponceStatuses,
  ResponseError,
  ResponseSuccess,
  UserInToken,
  accountGetUserTopic,
  accountLoginKey,
  accountLogoutKey,
  accountRefreshKey,
  accountRegisterKey
};

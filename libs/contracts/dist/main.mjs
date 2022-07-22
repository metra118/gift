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

// src/account/user/account.get-user-profile.ts
import { IsString } from "class-validator";

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
  IsString()
], AccountGetUserProfileRequest.prototype, "userId", 2);

// src/account/auth/account.register.ts
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

// src/account/auth/account.login.ts
import { IsEmail as IsEmail2, IsString as IsString2 } from "class-validator";
var accountLoginKey = "account.login.command";
var AccountLoginRequest = class {
  email;
  password;
};
__decorateClass([
  IsEmail2()
], AccountLoginRequest.prototype, "email", 2);
__decorateClass([
  IsString2()
], AccountLoginRequest.prototype, "password", 2);

// src/account/auth/account.logout.ts
import { IsDefined as IsDefined2 } from "class-validator";
var accountLogoutKey = "account.logout.command";
var AccountLogoutRequest = class {
  refreshToken;
};
__decorateClass([
  IsDefined2()
], AccountLogoutRequest.prototype, "refreshToken", 2);

// src/account/auth/account.refresh.ts
import { IsDefined as IsDefined3, IsString as IsString3, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
var accountRefreshKey = "account.refresh.command";
var UserInToken = class {
  userId;
};
__decorateClass([
  IsString3()
], UserInToken.prototype, "userId", 2);
var AccountRefreshRequest = class {
  refreshToken;
  user;
};
__decorateClass([
  IsString3()
], AccountRefreshRequest.prototype, "refreshToken", 2);
__decorateClass([
  IsDefined3(),
  ValidateNested({ each: true }),
  Type(() => UserInToken)
], AccountRefreshRequest.prototype, "user", 2);

// src/account/auth/account.logout-all.ts
import { IsDefined as IsDefined4 } from "class-validator";
var accountLogoutAllKey = "account.logouta-all.command";
var AccountLogoutAllRequest = class {
  userId;
};
__decorateClass([
  IsDefined4()
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
export {
  AccountGetUserProfileRequest,
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
  accountGetUserProfileTopic,
  accountLoginKey,
  accountLogoutAllKey,
  accountLogoutKey,
  accountRefreshKey,
  accountRegisterKey,
  accountRemoveDeadTokensKey
};

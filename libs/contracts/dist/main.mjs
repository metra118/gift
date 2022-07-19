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
var accountGetUserTopic = "account.get-user.query";
var AccountGetUserRequest = class {
  userId;
};
__decorateClass([
  IsNumber()
], AccountGetUserRequest.prototype, "userId", 2);
var AccountGetUserResponse = class {
  name;
};

// src/account/account.register.ts
import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator";
var accountRegisterTopic = "account.register.command";
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
var AccountRegisterResponse = class {
  accessToken;
  refreshToken;
};

// src/account/account.login.ts
import { IsEmail as IsEmail2, IsString } from "class-validator";
var accountLoginTopic = "account.login.command";
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
var AccountLoginResponse = class {
  accessToken;
  refreshToken;
};

// src/account/account.logout.ts
import { IsString as IsString2 } from "class-validator";
var accountLogoutTopic = "account.logout.command";
var AccountLogoutRequest = class {
  refreshToken;
};
__decorateClass([
  IsString2()
], AccountLogoutRequest.prototype, "refreshToken", 2);
export {
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
};

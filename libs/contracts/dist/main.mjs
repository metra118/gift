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
var accountGetUserProfileKey = "account.get-user-profile.query";
var AccountGetUserProfileRequest = class {
  userId;
};
__decorateClass([
  IsString()
], AccountGetUserProfileRequest.prototype, "userId", 2);

// src/account/user/account.update-user-profile.ts
import { IsBoolean, IsOptional, IsString as IsString2 } from "class-validator";
var accountUpdateUserProfileKey = "account.update-user-profile.command";
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
  IsString2()
], AccountUpdateUserProfileRequest.prototype, "userId", 2);
__decorateClass([
  IsString2()
], AccountUpdateUserProfileRequest.prototype, "email", 2);
__decorateClass([
  IsBoolean()
], AccountUpdateUserProfileRequest.prototype, "isActive", 2);
__decorateClass([
  IsOptional(),
  IsString2()
], AccountUpdateUserProfileRequest.prototype, "firstName", 2);
__decorateClass([
  IsOptional(),
  IsString2()
], AccountUpdateUserProfileRequest.prototype, "lastName", 2);
__decorateClass([
  IsOptional(),
  IsString2()
], AccountUpdateUserProfileRequest.prototype, "nickname", 2);
__decorateClass([
  IsOptional(),
  IsString2()
], AccountUpdateUserProfileRequest.prototype, "bio", 2);

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
import { IsEmail as IsEmail2, IsString as IsString3 } from "class-validator";
var accountLoginKey = "account.login.command";
var AccountLoginRequest = class {
  email;
  password;
};
__decorateClass([
  IsEmail2()
], AccountLoginRequest.prototype, "email", 2);
__decorateClass([
  IsString3()
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
import { IsDefined as IsDefined3, IsString as IsString4, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
var accountRefreshKey = "account.refresh.command";
var UserInTokenDot = class {
  userId;
};
__decorateClass([
  IsString4()
], UserInTokenDot.prototype, "userId", 2);
var AccountRefreshRequest = class {
  refreshToken;
  user;
};
__decorateClass([
  IsString4()
], AccountRefreshRequest.prototype, "refreshToken", 2);
__decorateClass([
  IsDefined3(),
  ValidateNested({ each: true }),
  Type(() => UserInTokenDot)
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

// src/gift/gift.create-gift.ts
import { IsString as IsString5, MaxLength as MaxLength2 } from "class-validator";
var giftCreateGiftKey = "gift.create-gift.command";
var GiftCreateGiftRequest = class {
  userId;
  title;
  text;
};
__decorateClass([
  IsString5()
], GiftCreateGiftRequest.prototype, "userId", 2);
__decorateClass([
  MaxLength2(12),
  IsString5()
], GiftCreateGiftRequest.prototype, "title", 2);
__decorateClass([
  MaxLength2(280),
  IsString5()
], GiftCreateGiftRequest.prototype, "text", 2);

// src/gift/gift.update-gift.ts
import { IsString as IsString6, IsUUID, MaxLength as MaxLength3 } from "class-validator";
var giftUpdateGiftKey = "gift.update-gift.command";
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
  IsString6()
], GiftUpdateGiftRequest.prototype, "userId", 2);
__decorateClass([
  MaxLength3(12),
  IsString6()
], GiftUpdateGiftRequest.prototype, "title", 2);
__decorateClass([
  MaxLength3(280),
  IsString6()
], GiftUpdateGiftRequest.prototype, "text", 2);

// src/gift/gift.get-gifts.ts
import { IsNumber, IsOptional as IsOptional2, IsString as IsString7 } from "class-validator";
import { Type as Type2 } from "class-transformer";
var giftGetGiftsKey = "gift.get-gifts.command";
var GiftGetGiftsRequest = class {
  giftId;
  userId;
  skip;
  take;
};
__decorateClass([
  IsOptional2(),
  IsString7()
], GiftGetGiftsRequest.prototype, "giftId", 2);
__decorateClass([
  IsOptional2(),
  IsString7()
], GiftGetGiftsRequest.prototype, "userId", 2);
__decorateClass([
  Type2(() => Number),
  IsOptional2(),
  IsNumber()
], GiftGetGiftsRequest.prototype, "skip", 2);
__decorateClass([
  Type2(() => Number),
  IsOptional2(),
  IsNumber()
], GiftGetGiftsRequest.prototype, "take", 2);

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
  AccountUpdateUserProfileRequest,
  GiftCreateGiftRequest,
  GiftGetGiftsRequest,
  GiftUpdateGiftRequest,
  ResponseError,
  ResponseStatuses,
  ResponseSuccess,
  UserInTokenDot,
  accountGetUserProfileKey,
  accountLoginKey,
  accountLogoutAllKey,
  accountLogoutKey,
  accountRefreshKey,
  accountRegisterKey,
  accountRemoveDeadTokensKey,
  accountUpdateUserProfileKey,
  giftCreateGiftKey,
  giftGetGiftsKey,
  giftUpdateGiftKey
};

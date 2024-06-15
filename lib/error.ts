import { AuthError } from "next-auth";

type AuthErrorType =
  | "AccessDenied"
  | "AdapterError"
  | "CallbackRouteError"
  | "ErrorPageLoop"
  | "EventError"
  | "InvalidCallbackUrl"
  | "CredentialsSignin"
  | "InvalidEndpoints"
  | "InvalidCheck"
  | "JWTSessionError"
  | "MissingAdapter"
  | "MissingAdapterMethods"
  | "MissingAuthorize"
  | "MissingSecret"
  | "OAuthAccountNotLinked"
  | "OAuthCallbackError"
  | "OAuthProfileParseError"
  | "SessionTokenError"
  | "OAuthSignInError"
  | "EmailSignInError"
  | "SignOutError"
  | "UnknownAction"
  | "UnsupportedStrategy"
  | "InvalidProvider"
  | "UntrustedHost"
  | "Verification"
  | "MissingCSRF"
  | "AccountNotLinked"
  | "DuplicateConditionalUI"
  | "MissingWebAuthnAutocomplete"
  | "WebAuthnVerificationError"
  | "ExperimentalFeatureNotEnabled";

export class CustomAuthError extends AuthError {
  constructor(message: string, type: AuthErrorType) {
    super(message);
    this.type = type;
  }
}

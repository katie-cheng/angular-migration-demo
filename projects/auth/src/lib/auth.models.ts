export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  /** Epoch milliseconds at which the access token stops being accepted. */
  expiresAt: number;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  segment: 'retail' | 'small-business' | 'wealth';
  entitlements: string[];
}

export interface Session {
  tokens: AuthTokens;
  profile: UserProfile;
  correlationId: string;
  mfaSatisfied: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
  deviceId: string;
}

export interface LoginResponse {
  tokens: AuthTokens;
  profile: UserProfile;
  mfaRequired: boolean;
  mfaChannels?: MfaChannel[];
}

export interface MfaChannel {
  id: string;
  type: 'sms' | 'email' | 'push' | 'totp';
  hint: string;
}

export interface MfaVerifyRequest {
  channelId: string;
  code: string;
  transactionId: string;
}

export type SessionEventKind =
  | 'session-established'
  | 'session-refreshed'
  | 'session-ended'
  | 'mfa-satisfied';

export interface SessionEvent {
  kind: SessionEventKind;
  at: number;
  correlationId: string;
}

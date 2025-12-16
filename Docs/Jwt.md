# JWT Authentication - Technical Guide

## What is JWT?

**JSON Web Token (JWT)** is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. It's commonly used for authentication and information exchange in web applications.

## JWT Structure

A JWT consists of three parts separated by dots (`.`):

```
header.payload.signature
```

### 1. Header
Contains the token type and hashing algorithm:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2. Payload
Contains the claims (user data and metadata):
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}
```

### 3. Signature
Created by encoding the header and payload, then signing with a secret key:
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

## How JWT Authentication Works

### Authentication Flow

1. **User Login**: User sends credentials (username/password) to server
2. **Validation**: Server validates credentials against database
3. **Token Generation**: Server creates JWT with user information
4. **Token Response**: Server sends JWT back to client
5. **Token Storage**: Client stores JWT (usually in localStorage or httpOnly cookie)
6. **Authenticated Requests**: Client includes JWT in Authorization header
7. **Token Verification**: Server verifies JWT signature and expiration
8. **Access Granted**: Server processes request if token is valid

### Example Request with JWT

```http
GET /api/protected-resource HTTP/1.1
Host: example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Common JWT Claims

### Standard Claims (Registered)
- **iss** (Issuer): Who created the token
- **sub** (Subject): Who the token is about (usually user ID)
- **aud** (Audience): Who should accept the token
- **exp** (Expiration): When the token expires (Unix timestamp)
- **iat** (Issued At): When the token was created
- **nbf** (Not Before): Token not valid before this time
- **jti** (JWT ID): Unique identifier for the token

### Custom Claims
You can add any additional data:
```json
{
  "userId": "12345",
  "email": "user@example.com",
  "role": "admin",
  "permissions": ["read", "write"]
}
```

## Access Tokens vs Refresh Tokens

### Access Token
- Short-lived (5-15 minutes)
- Used for API requests
- Contains user permissions
- Stored in memory or localStorage

### Refresh Token
- Long-lived (days to months)
- Used to obtain new access tokens
- Stored in httpOnly cookie (more secure)
- Can be revoked by server

### Token Refresh Flow
```
1. Access token expires
2. Client sends refresh token to /refresh endpoint
3. Server validates refresh token
4. Server issues new access token
5. Client continues making requests
```

## JWT vs Sessions

| Feature | JWT | Sessions |
|---------|-----|----------|
| **Storage** | Client-side | Server-side |
| **Scalability** | Stateless, easy to scale | Requires shared session store |
| **Size** | Larger (sent with each request) | Smaller (just session ID) |
| **Revocation** | Difficult (requires blacklist) | Easy (delete session) |
| **Cross-domain** | Easy | Requires CORS configuration |


JWT is a powerful tool for stateless authentication, but it requires careful implementation. Always prioritize security, use appropriate expiration times, and follow best practices to build a robust authentication system.

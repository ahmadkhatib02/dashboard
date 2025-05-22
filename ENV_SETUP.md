# Environment Variables Setup

This document explains how environment variables are configured in this React + Vite project.

## 📁 Files Created

### `.env` (Git Ignored)
Contains actual environment variables for development. This file is **automatically ignored by Git** and should never be committed.

```env
# User Credentials for Testing (VITE_ prefix required for client-side access)
VITE_USER_EMAIL=sawsanalieh@gmail.com
VITE_USER_PASSWORD=112233
```

### `.env.example` (Git Tracked)
Template file showing what environment variables are needed. This file **can be safely committed** to Git.

```env
# User Credentials for Testing
USER_EMAIL=your-email@example.com
USER_PASSWORD=your-password
```

### `.gitignore` (Updated)
Added environment file patterns to ensure they're ignored by Git:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## 🔧 How to Use Environment Variables

### In React Components (Client-side)
Environment variables must have the `VITE_` prefix to be accessible in client-side code:

```javascript
// ✅ Correct - accessible in browser
const testEmail = import.meta.env.VITE_USER_EMAIL
const testPassword = import.meta.env.VITE_USER_PASSWORD

// ❌ Wrong - not accessible in browser (no VITE_ prefix)
const secret = import.meta.env.JWT_SECRET
```

### Environment Detection
```javascript
// Check if running in development mode
if (import.meta.env.DEV) {
  console.log('Development mode')
}

// Check if running in production mode
if (import.meta.env.PROD) {
  console.log('Production mode')
}
```

## 🚀 Implementation in SignIn Component

The SignIn component now includes:

1. **Environment Variable Access**:
   ```javascript
   const testEmail = import.meta.env.VITE_USER_EMAIL
   const testPassword = import.meta.env.VITE_USER_PASSWORD
   ```

2. **Authentication Logic**:
   ```javascript
   if (email === testEmail && password === testPassword) {
     console.log('✅ Authentication successful!')
     alert('Login successful! Welcome to the dashboard.')
   } else {
     console.log('❌ Authentication failed!')
     alert('Invalid credentials. Please try again.')
   }
   ```

3. **Development Helper** (only visible in dev mode):
   - "Fill Test Credentials" button
   - Environment info display
   - Test credentials auto-fill functionality

## 🔒 Security Notes

### ⚠️ Important Security Considerations

1. **Client-side Exposure**: Any environment variable with `VITE_` prefix will be **exposed to the browser** and visible to users. Never put sensitive secrets here.

2. **Development Only**: The test credentials are only for development. In production, you should:
   - Use proper authentication APIs
   - Store sensitive data on the server
   - Use secure token-based authentication

3. **Git Ignored**: The `.env` file is automatically ignored by Git, so your credentials won't be committed to version control.

### ✅ Safe for VITE_ prefix:
- API URLs
- Public configuration
- Development test credentials
- Feature flags

### ❌ Never use VITE_ prefix for:
- Database passwords
- API secrets
- JWT signing keys
- Private tokens

## 🛠️ Setup Instructions

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file** with your actual values:
   ```env
   VITE_USER_EMAIL=your-actual-email@example.com
   VITE_USER_PASSWORD=your-actual-password
   ```

3. **Restart the development server** (Vite automatically restarts when .env changes):
   ```bash
   npm run dev
   ```

## 🧪 Testing

1. Open the application in your browser
2. You'll see a "Fill Test Credentials" button in development mode
3. Click it to auto-fill the form with environment variables
4. Submit the form to test authentication

The form will compare the entered credentials against the environment variables and show success/failure messages accordingly.

## 📝 Notes

- Environment variables are loaded automatically by Vite
- Changes to `.env` file will restart the development server
- The `.env` file should never be committed to Git
- Use `.env.example` to document required environment variables for other developers

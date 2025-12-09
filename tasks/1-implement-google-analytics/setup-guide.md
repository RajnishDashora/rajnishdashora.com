# Google Analytics 4 Setup Guide

## Step 1: Create Google Account (If Needed)
If you don't already have a Google account, create one at https://accounts.google.com/signup

## Step 2: Access Google Analytics
1. Go to https://analytics.google.com/
2. Sign in with your Google account

## Step 3: Create Google Analytics Account

### First-time Setup:
1. Click **"Start measuring"** button
2. Enter **Account name**: "Rajnish Dashora Personal Website" (or your preferred name)
3. Configure **Account Data Sharing Settings** (recommended to enable all):
   - ✅ Google products & services
   - ✅ Benchmarking
   - ✅ Technical support
   - ✅ Account specialists
4. Click **"Next"**

### If You Already Have a GA Account:
1. Click **"Admin"** (gear icon in bottom left)
2. Click **"Create Account"** in the Account column
3. Follow steps above

## Step 4: Create Property

1. **Property name**: "rajnishdashora.com"
2. **Reporting time zone**: Select your time zone (e.g., "India Standard Time" or your local timezone)
3. **Currency**: Select your preferred currency (e.g., "US Dollar" or "Indian Rupee")
4. Click **"Next"**

## Step 5: Business Information

1. **Industry category**: Select "Technology" or "Professional Services"
2. **Business size**: Select appropriate size (e.g., "Small - 1 to 10 employees" for personal website)
3. Click **"Next"**

## Step 6: Business Objectives

Select your objectives (you can select multiple):
- ✅ Examine user behavior
- ✅ Measure advertising ROI (if you plan to run ads)
- ✅ Get baseline reports

Click **"Create"**

## Step 7: Accept Terms of Service

1. Select your country
2. Check the box to accept "Google Analytics Terms of Service"
3. Check the box to accept "Data Processing Terms"
4. Click **"Accept"**

## Step 8: Choose Data Collection Method

You'll see several options. Select **"Web"**:
- Web
- iOS app
- Android app

## Step 9: Set Up Data Stream

1. **Website URL**: Enter `https://rajnishdashora.com` (or your domain)
2. **Stream name**: "rajnishdashora.com" (default is fine)
3. **Enhanced measurement**: Leave enabled (recommended)
   - This automatically tracks:
     - Page views
     - Scrolls
     - Outbound clicks
     - Site search
     - Video engagement
     - File downloads
4. Click **"Create stream"**

## Step 10: Get Your Measurement ID

After creating the stream, you'll see a **"Web stream details"** page.

### Important Information:
- **Measurement ID**: This will look like `G-XXXXXXXXXX`
- **Stream URL**: Your website URL
- **Stream ID**: Numerical ID

### Copy Your Measurement ID:
1. Find the **"Measurement ID"** field (format: `G-XXXXXXXXXX`)
2. Click the copy icon next to it
3. **Save this ID** - you'll need it for implementation

Example: `G-1A2B3C4D5E`

## Step 11: Optional - View Tag Installation Instructions

On the same page:
1. Scroll down to **"Tagging instructions"**
2. Click **"View tag instructions"**
3. You'll see two options:
   - **Install manually**: Shows the gtag.js code snippet
   - **Send tag configuration to developers**: Share via email

For our React implementation, we'll use this Measurement ID in our code, so you can close this modal.

## Step 12: Verify Your Setup

1. Go to **Reports** > **Realtime** (left sidebar)
2. This page will show active users once tracking is implemented
3. Keep this page open - you'll use it to verify tracking after implementation

## What You Need for Implementation

From the setup above, you should have:
- ✅ **Google Analytics Account** created
- ✅ **Property** (rajnishdashora.com) created
- ✅ **Data Stream** (Web) created
- ✅ **Measurement ID** (G-XXXXXXXXXX) copied

## Next Steps

1. **Save your Measurement ID** securely (e.g., in password manager)
2. **Add Measurement ID to your React app** (see implementation-plan.md)
3. **Test tracking** using the Realtime report
4. **Configure additional settings** in GA4 dashboard:
   - Events
   - Conversions
   - Audiences
   - Explore reports

## Additional Settings (Optional)

### Enable Google Signals (for cross-device tracking):
1. Go to **Admin** > **Data Settings** > **Data Collection**
2. Enable **Google signals data collection**
3. Click **Continue** > **Activate**

### Set Up Custom Events (Later):
1. Go to **Configure** > **Events**
2. Click **Create event**
3. Define custom events for specific user actions

### Set Up Conversions:
1. Go to **Configure** > **Conversions**
2. Mark important events as conversions
3. Examples: form submissions, button clicks, downloads

## Troubleshooting

### Can't create account?
- Make sure you're signed into a Google account
- Check if you have permissions (for work accounts)
- Try using an incognito/private window

### Can't find Measurement ID?
1. Go to **Admin** (gear icon)
2. Select your **Property** in the middle column
3. Click **Data Streams**
4. Click on your web stream
5. Measurement ID is at the top

### Need to add collaborators?
1. Go to **Admin**
2. Select **Property Access Management** or **Account Access Management**
3. Click **+** to add users
4. Enter email and select role (Viewer, Analyst, Editor, Administrator)

## Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GA4 Setup Assistant](https://support.google.com/analytics/answer/9744165)
- [GA4 Events](https://support.google.com/analytics/answer/9322688)
- [GA4 vs Universal Analytics](https://support.google.com/analytics/answer/11583528)

## Privacy Considerations

Since you're collecting user data:
1. **Privacy Policy**: Consider adding a privacy policy page
2. **Cookie Consent**: May be required depending on your audience (GDPR for EU visitors)
3. **Data Retention**: Configure in Admin > Data Settings > Data Retention
4. **IP Anonymization**: GA4 anonymizes IPs by default

## Notes

- GA4 is the current version (Universal Analytics sunset in July 2023)
- It may take 24-48 hours to see all reports populate
- Realtime reports show data immediately
- GA4 has a free tier (sufficient for personal websites)
- Data is retained for 14 months by default (can configure up to 26 months)

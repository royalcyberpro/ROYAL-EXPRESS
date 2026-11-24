# ROYAL EXPRESS – updated static storefront

## Updates included
- Admin **Store Settings & Ads** tab: custom categories, adjustable delivery fee and enable/disable control, named discounts with adjustable percentage and enable/disable control.
- Admin product creation and reseller product creation now include required descriptions.
- Admin can upload a homepage image/video advertisement or remove it. The public homepage hides the ad region when no ad is configured.
- Storefront language selector offers English, French, Spanish, Portuguese and Twi (Twi uses Google's Akan translation where available).
- Reseller-origin labels and seller names are hidden on public product/catalog/cart views; reseller logs remain in the admin dashboard.
- Product/category display uses the admin-managed category list.
- Improved honesty around verification mail: the browser no longer reports an accepted relay request as guaranteed inbox delivery.


## EmailJS configuration (added in this version)
- `js/email_service.js` contains the EmailJS **public** key, service ID, and template ID supplied for this project.
- Registration verification codes and password-reset codes are sent to the address being verified. Contact-form messages are sent to the Admin Email configured in the Admin settings; the customer's address is supplied as the reply-to address.
- In the EmailJS dashboard, open the template `template_fc9w76p` and set its **To Email** field to `{{to_email}}`. Use these template variables in the email body as needed: `{{to_name}}`, `{{name}}`, `{{email}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`, and `{{verification_code}}` (or `{{code}}`). Make sure the template is connected to service `service_b15sf2m`, save it, and test sending from the EmailJS dashboard.
- The template must allow dynamic recipient `{{to_email}}`; if the EmailJS account restricts dynamic recipients, configure an approved recipient/domain or use a server-side email service.
- The EmailJS public key is designed to be visible in frontend code. Do not add an EmailJS private key or any Paystack secret key to this ZIP.

### Important security limitation
This project still uses browser `localStorage` for accounts. Email delivery is handled by EmailJS, but the registration/reset code generation and comparison happen in the browser and are **not secure authentication**: a technically capable visitor can inspect or alter client-side code. Before using real customer accounts, move account storage, password hashing, code generation/expiry, rate limiting, and verification checks to a trusted backend. Password reset should not be considered production-secure until that is done.

## Important deployment limitations to resolve before going live

### Email delivery and production security
EmailJS is now wired into registration verification, password-reset code delivery, and the contact form. A successful EmailJS response means the provider accepted the send request; it does not guarantee inbox placement. Confirm the template's dynamic recipient and variables in the EmailJS dashboard, verify the sender/domain as required by EmailJS, and test delivery to real inboxes. This frontend-only project cannot securely validate codes or protect accounts: before production, move account storage, password hashing, code generation/expiry, rate limiting, and code validation to a trusted backend. Never put an EmailJS private key, SMTP password, or Paystack secret key in frontend files.

### Storage and uploaded ads
Settings, uploaded product images, and uploaded ads are currently stored in the browser's `localStorage`. This means they are local to the browser/device and do not automatically sync across the admin's phone, laptop, or customers' browsers. The ad uploader currently limits files to 8 MB to reduce browser storage failures. For a live multi-device store, connect a shared database and object storage (such as S3, Cloudinary, or Firebase Storage) and store media URLs instead of base64 data.

### AI assistant
The existing assistant is a client-side rule-based helper, not a connected generative AI service. It now reads the configured delivery fee, but production-grade AI requires a protected backend endpoint and an AI provider key stored server-side.

### Paystack
The existing public Paystack key remains in the project as supplied. Confirm that it is the correct public key for the deployed domain and implement server-side transaction verification/webhooks before production. Never expose a Paystack secret key in frontend files.

## Run
Unzip the archive and serve the folder through a web server (not by opening individual files with `file://`). Start with `index.html`; open `admin.html` for administration.

## Version 6 updates
- Homepage headline and shopping-focused description updated.
- Homepage hero uses a different product image.
- Admin can select multiple image/video ads; ads rotate continuously, videos autoplay muted and loop. Admin can pause/resume or remove ads.
- Motion effects added across pages with a reduced-motion accessibility preference.

## Important deployment limitations
- This project is a static browser-storage prototype. Ads, pause state, products, and orders are stored in each browser's localStorage and do not synchronize across devices or visitors. The ad uploader is intentionally limited to roughly 3 MB total to avoid exhausting browser storage. For production multi-device ads, upload media to cloud object storage and store the playlist/pause state in a shared database.
- The Paystack browser callback is not a secure payment verification mechanism. A production deployment must verify each transaction reference on a server using the Paystack secret key before marking an order paid or issuing a final receipt. Never put the Paystack secret key in browser JavaScript. The receipt displays the transaction reference and links to Paystack's official website, but it is not a Paystack-issued transaction receipt.
- The current static project cannot guarantee that a successful Paystack callback reflects a server-verified settlement.


## Version 7 visual and media updates
- Admin > Homepage video / advertisement accepts multiple image and video files. The public homepage now displays every enabled ad simultaneously in a responsive grid; videos are muted, autoplaying and looping (subject to browser autoplay rules).
- Admin > Homepage images & extra showcase gallery lets the admin add and delete custom homepage images. The first image becomes the main hero image and additional images appear in a separate gallery.
- Login and registration forms include enhanced entrance, focus, and button animations, while respecting reduced-motion accessibility settings.
- Uploaded media remains in browser local storage in this static build and is not synchronized to other devices. For production use, connect shared cloud object storage and a database.


## Latest update: instant admin settings and video ads
- Delivery fee, delivery open/closed, discount name/rate/status now publish as the admin edits the controls. The Save Store Settings button remains available.
- Store setting updates refresh the storefront immediately in the same tab and in other open tabs on the same browser/origin.
- Advertisement images and videos are stored as binary files in IndexedDB, not localStorage. This supports much larger uploads (up to 250 MB per file, subject to device/browser quota).
- Multiple uploaded ads display together on the homepage. Videos are muted, autoplay, loop, and use inline playback; browser autoplay policies may block playback until the visitor interacts with the page.
- Checkout button label is now “Pay Now”.
- IndexedDB and localStorage are device/browser-specific. To synchronize admin changes to customers on other devices, deploy a shared backend/database and cloud media storage.


## Mobile and smartphone experience

This version includes a responsive mobile layout across the storefront, catalog, cart, checkout, account, contact, reseller, receipt, and admin pages. On small screens it adjusts spacing and typography, keeps product cards readable in a two-column layout, makes navigation and tables scroll safely, enlarges touch targets and form controls, and adds a compact fixed quick-navigation bar to customer-facing pages. The viewport supports device safe areas, and reduced-motion preferences are respected.

The website remains a responsive website; it does not require a separate mobile app. Test the deployed site on real iOS and Android devices because browser behavior, especially autoplay and available screen space, can vary.

## GitHub Pages deployment checklist (important)
1. Upload the **contents** of this project folder to the repository's publishing root (the same level as `index.html`). Do not publish a parent folder that contains the site one directory deeper. The ZIP supplied with this update is arranged with `index.html` at the archive root.
2. In GitHub, open **Settings → Pages** and confirm the selected branch and folder contain `index.html`, `login.html`, and the `js/` folder.
3. In the EmailJS dashboard, add the exact published website host to the allowed origins / allowed domains list (for example, `your-account.github.io`, and any custom domain). Do not include a page path such as `/login.html`.
4. Confirm service `service_b15sf2m` and template `template_fc9w76p` are active. In the template, set **To Email** to `{{to_email}}` and confirm the template uses `{{verification_code}}` or `{{code}}`. Test the template in EmailJS.
5. Open the published `login.html`, switch to Register, and check the on-page error if sending fails. The page now shows the EmailJS error details instead of only a generic message.
6. Register a fresh test account on the published domain. Browser `localStorage` is separate for `file://`, localhost, and GitHub Pages, so accounts created in local testing will not exist online.

**Important:** Code changes cannot add a domain to your EmailJS account or repair a disabled/misconfigured EmailJS service/template. If the exact GitHub Pages domain is not authorized in EmailJS, email sending will still be rejected until that dashboard setting is corrected.

## Email verification setup (Cloudflare Worker + Brevo)

The registration and password-reset pages now call the Cloudflare Worker at:
`https://royal-express-email.isaacbekoeasabre.workers.dev`

The Worker must have POST routes `/send-code` and `/verify-code`, a KV binding named `VERIFICATION_CODES`, and the required Brevo secrets/variables configured in Cloudflare. Do not put the Brevo API key in website files. Deploy this ZIP to GitHub Pages after confirming the Worker is deployed.

**Important limitation:** this static website still stores customer accounts and passwords in each visitor's browser `localStorage`. Email-code verification is handled by the Worker, but login/account records are not stored in a shared server database. This is not a production-grade secure account system; a real launch should migrate accounts and authentication to a server-side auth/database service.


## Published domain and registration troubleshooting

The published website origin is `https://eroyalexpress.com`. The Cloudflare Worker CORS allow-list must include this exact origin. If the site redirects visitors to `https://www.eroyalexpress.com`, include that origin too. The frontend calls the Worker at `/send-code` and `/verify-code` on the Worker host.

The registration page now keeps the verification panel and the pending form details visible if sending the email fails. It displays the actual error and allows a resend attempt instead of silently returning to the first form. A code can only be accepted after the Worker confirms it.

/* ROYAL EXPRESS email verification via Cloudflare Worker.
 * The Brevo API key stays on the Cloudflare Worker and is never exposed here.
 */
const ROYAL_EMAIL_WORKER_URL = "https://royal-express-email.isaacbekoeasabre.workers.dev";

async function royalWorkerRequest(path, payload) {
    let response;
    try {
        response = await fetch(`${ROYAL_EMAIL_WORKER_URL}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        throw new Error("Could not connect to the email verification service. Check your internet connection and Worker deployment.");
    }

    let data = {};
    const raw = await response.text();
    try { data = raw ? JSON.parse(raw) : {}; }
    catch (_) { data = { message: raw }; }

    if (!response.ok || data.success === false || data.ok === false) {
        throw new Error(data.message || data.error || `Email service returned HTTP ${response.status}.`);
    }
    return data;
}

async function sendRoyalVerificationCode(email, name = "") {
    return royalWorkerRequest("/send-code", { email, name });
}

async function verifyRoyalVerificationCode(email, code) {
    return royalWorkerRequest("/verify-code", { email, code });
}

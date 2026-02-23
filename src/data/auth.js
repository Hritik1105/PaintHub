const USERS_KEY = 'ph_users';
const SESSION_KEY = 'ph_session';
const AUTH_CHANGED_EVENT = 'ph-auth-changed';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RULES = {
  minLength: 8,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  special: /[^A-Za-z0-9]/
};

function parseUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function validateSignupInput({ name, email, password, confirmPassword }) {
  if (!name.trim() || name.trim().length < 2) {
    return 'Name must be at least 2 characters.';
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address.';
  }

  if (password.length < PASSWORD_RULES.minLength) {
    return 'Password must be at least 8 characters.';
  }

  if (!PASSWORD_RULES.uppercase.test(password)) {
    return 'Password must include at least one uppercase letter.';
  }

  if (!PASSWORD_RULES.lowercase.test(password)) {
    return 'Password must include at least one lowercase letter.';
  }

  if (!PASSWORD_RULES.number.test(password)) {
    return 'Password must include at least one number.';
  }

  if (!PASSWORD_RULES.special.test(password)) {
    return 'Password must include at least one special character.';
  }

  if (password !== confirmPassword) {
    return 'Password and confirm password do not match.';
  }

  return null;
}

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function signupUser({ name, email, password }) {
  const users = parseUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    return { ok: false, message: 'This email is already registered. Please login.' };
  }

  const passwordHash = await hashPassword(password);
  users.push({
    id: Date.now(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash
  });
  saveUsers(users);

  return { ok: true };
}

export async function loginUser({ email, password }) {
  const users = parseUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((item) => item.email === normalizedEmail);

  if (!user) {
    return { ok: false, message: 'No account found for this email. Please sign up first.' };
  }

  const passwordHash = await hashPassword(password);
  if (user.passwordHash !== passwordHash) {
    return { ok: false, message: 'Incorrect password. Please try again.' };
  }

  const session = { id: user.id, name: user.name, email: user.email };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  return { ok: true, user: session };
}

export function logoutUser() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function getAuthChangedEventName() {
  return AUTH_CHANGED_EVENT;
}

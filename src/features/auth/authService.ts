export type UserRole = 'user' | 'admin'

export type AuthUser = {
  email: string
  role: UserRole
  createdAt: string
}

type StoredAccount = AuthUser & {
  salt: string
  passwordHash: string
}

const accountsKey = 'novelee.demo.accounts.v1'
const sessionKey = 'novelee.demo.session.v1'
const demoAdminEmail = 'admin@novelee.test'
const demoAdminPassword = 'DemoAdmin!2026'
const demoUserEmail = 'lecteur@novelee.test'
const demoUserPassword = 'DemoUser!2026'
const passwordIterations = 120_000
const textEncoder = new TextEncoder()

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isStoredAccount(value: unknown): value is StoredAccount {
  return (
    isRecord(value) &&
    typeof value.email === 'string' &&
    (value.role === 'user' || value.role === 'admin') &&
    typeof value.createdAt === 'string' &&
    typeof value.salt === 'string' &&
    typeof value.passwordHash === 'string'
  )
}

function isAuthUser(value: unknown): value is AuthUser {
  return (
    isRecord(value) &&
    typeof value.email === 'string' &&
    (value.role === 'user' || value.role === 'admin') &&
    typeof value.createdAt === 'string'
  )
}

function readAccounts(): StoredAccount[] {
  const raw = localStorage.getItem(accountsKey)
  if (!raw) return []

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error('Les comptes enregistrés dans ce navigateur sont illisibles.')
  }

  if (!Array.isArray(parsed) || !parsed.every(isStoredAccount)) {
    throw new Error('Les comptes enregistrés dans ce navigateur ont un format invalide.')
  }

  return parsed
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(accountsKey, JSON.stringify(accounts))
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function fromHex(hex: string): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(new ArrayBuffer(hex.length / 2))
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16)
  }
  return bytes
}

async function hashPassword(password: string, salt: Uint8Array<ArrayBuffer>) {
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const result = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: passwordIterations, hash: 'SHA-256' },
    key,
    256,
  )
  return toHex(new Uint8Array(result))
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function toAuthUser(account: StoredAccount): AuthUser {
  return {
    email: account.email,
    role: account.role,
    createdAt: account.createdAt,
  }
}

function saveSession(user: AuthUser) {
  sessionStorage.setItem(sessionKey, JSON.stringify(user))
}

export function startUserSession(user: AuthUser) {
  saveSession(user)
}

export async function registerLocalAccount(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email)
  if (
    import.meta.env.DEV &&
    (normalizedEmail === demoAdminEmail || normalizedEmail === demoUserEmail)
  ) {
    throw new Error('Cette adresse est réservée à un compte de démonstration.')
  }

  const accounts = readAccounts()
  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error('Un compte existe déjà avec cette adresse e-mail.')
  }

  const salt = new Uint8Array(new ArrayBuffer(16))
  crypto.getRandomValues(salt)
  const account: StoredAccount = {
    email: normalizedEmail,
    role: 'user',
    createdAt: new Date().toISOString(),
    salt: toHex(salt),
    passwordHash: await hashPassword(password, salt),
  }

  writeAccounts([...accounts, account])
  saveSession(toAuthUser(account))
  return toAuthUser(account)
}

async function ensureDemoAccounts() {
  if (!import.meta.env.DEV) return

  const accounts = readAccounts()
  const demoAccounts = [
    { email: demoAdminEmail, password: demoAdminPassword, role: 'admin' as const },
    { email: demoUserEmail, password: demoUserPassword, role: 'user' as const },
  ]
  const missingAccounts: StoredAccount[] = []

  for (const demoAccount of demoAccounts) {
    const existingAccount = accounts.find((account) => account.email === demoAccount.email)
    if (existingAccount) {
      if (existingAccount.role !== demoAccount.role) {
        throw new Error('Un compte de démonstration a un rôle invalide. Efface ses données locales.')
      }
      continue
    }

    const salt = new Uint8Array(new ArrayBuffer(16))
    crypto.getRandomValues(salt)
    missingAccounts.push({
      email: demoAccount.email,
      role: demoAccount.role,
      createdAt: new Date().toISOString(),
      salt: toHex(salt),
      passwordHash: await hashPassword(demoAccount.password, salt),
    })
  }

  if (missingAccounts.length) writeAccounts([...accounts, ...missingAccounts])
}

export async function loginLocalAccount(email: string, password: string) {
  await ensureDemoAccounts()
  const normalizedEmail = normalizeEmail(email)
  const account = readAccounts().find((item) => item.email === normalizedEmail)
  if (!account) throw new Error('E-mail ou mot de passe invalide.')

  const passwordHash = await hashPassword(password, fromHex(account.salt))
  if (passwordHash !== account.passwordHash) {
    throw new Error('E-mail ou mot de passe invalide.')
  }

  const user = toAuthUser(account)
  saveSession(user)
  return user
}

export function getCurrentUser(): AuthUser | null {
  const raw = sessionStorage.getItem(sessionKey)
  if (!raw) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error('La session locale est illisible. Reconnecte-toi.')
  }

  if (!isAuthUser(parsed)) {
    throw new Error('La session locale est invalide. Reconnecte-toi.')
  }

  return parsed
}

export function clearCurrentUser() {
  sessionStorage.removeItem(sessionKey)
}

export function listLocalUsers(): AuthUser[] {
  return readAccounts().map(toAuthUser)
}

export function isValidUserRole(value: unknown): value is UserRole {
  return value === 'user' || value === 'admin'
}

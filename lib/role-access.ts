export const ROLE_OPTIONS = [
  "Pemohon",
  "LPPS Pegawai Operasi",
  "SPSB",
  "LPPS Pengurus Besar",
  "LPPS Kewangan",
  "JKDM",
] as const

export type Role = typeof ROLE_OPTIONS[number]

export const DEFAULT_ROLE: Role = "Pemohon"

const ROLE_ROUTE_ACCESS: Record<Role, string[]> = {
  Pemohon: [
    "/roles/pemohon",
    "/dashboard",
    "/applications",
    "/applications/new",
    "/applications/renewal",
    "/payments",
    "/reports",
    "/support",
    "/profile",
  ],
  "LPPS Pegawai Operasi": [
    "/roles/pegawai-operasi",
    "/dashboard",
    "/applications",
    "/customers",
    "/storage",
    "/team-chat",
    "/support",
    "/reports",
    "/profile",
  ],
  SPSB: ["/roles/spsb", "/dashboard", "/applications", "/reports", "/profile"],
  "LPPS Pengurus Besar": [
    "/roles/pengurus-besar",
    "/dashboard",
    "/applications",
    "/reports",
    "/profile",
  ],
  "LPPS Kewangan": [
    "/roles/kewangan",
    "/dashboard",
    "/payments",
    "/finance-alerts",
    "/reports",
    "/profile",
  ],
  JKDM: ["/roles/jkdm", "/dashboard", "/applications", "/reports", "/security", "/profile"],
}

export function isRouteAllowed(role: Role, path: string) {
  const allowedRoutes = ROLE_ROUTE_ACCESS[role] || []
  return allowedRoutes.includes(path)
}

export function getDefaultRouteForRole(role: Role) {
  const allowedRoutes = ROLE_ROUTE_ACCESS[role] || []
  return allowedRoutes[0] || "/dashboard"
}

export function getAllowedRoutes(role: Role) {
  return ROLE_ROUTE_ACCESS[role] || []
}

import { useAuth } from "../lib/auth-context"
import { PemohonDashboardView } from "../components/dashboard/PemohonDashboardView"
import { PegawaiOperasiDashboardView } from "../components/dashboard/PegawaiOperasiDashboardView"
import { SpsbDashboardView } from "../components/dashboard/SpsbDashboardView"
import { PengurusBesarDashboardView } from "../components/dashboard/PengurusBesarDashboardView"
import { KewanganDashboardView } from "../components/dashboard/KewanganDashboardView"
import { JkdmDashboardView } from "../components/dashboard/JkdmDashboardView"

export default function Page() {
  const { role } = useAuth()

  if (role === "Pemohon") return <PemohonDashboardView />
  if (role === "LPPS Pegawai Operasi") return <PegawaiOperasiDashboardView />
  if (role === "SPSB") return <SpsbDashboardView />
  if (role === "LPPS Pengurus Besar") return <PengurusBesarDashboardView />
  if (role === "LPPS Kewangan") return <KewanganDashboardView />
  if (role === "JKDM") return <JkdmDashboardView />

  return <PemohonDashboardView />
}
import { useAuth } from "../lib/auth-context"
import { PemohonView } from "../components/applications/PemohonView"
import { PegawaiOperasiView } from "../components/applications/PegawaiOperasiView"
import { SpsbView } from "../components/applications/SpsbView"
import { PengurusBesarView } from "../components/applications/PengurusBesarView"
import { KewanganView } from "../components/applications/KewanganView"
import { JkdmView } from "../components/applications/JkdmView"

export default function ApplicationsPage() {
  const { role } = useAuth()

  if (role === "Pemohon") return <PemohonView />
  if (role === "LPPS Pegawai Operasi") return <PegawaiOperasiView />
  if (role === "SPSB") return <SpsbView />
  if (role === "LPPS Pengurus Besar") return <PengurusBesarView />
  if (role === "LPPS Kewangan") return <KewanganView />
  if (role === "JKDM") return <JkdmView />

  return <PemohonView />
}

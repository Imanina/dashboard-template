import { useAuth } from "../lib/auth-context"
import { PemohonProfileView } from "../components/profile/PemohonProfileView"
import { PegawaiOperasiProfileView } from "../components/profile/PegawaiOperasiProfileView"
import { SpsbProfileView } from "../components/profile/SpsbProfileView"
import { PengurusBesarProfileView } from "../components/profile/PengurusBesarProfileView"
import { KewanganProfileView } from "../components/profile/KewanganProfileView"
import { JkdmProfileView } from "../components/profile/JkdmProfileView"

export default function ProfilePage() {
  const { role } = useAuth()

  if (role === "Pemohon") return <PemohonProfileView />
  if (role === "LPPS Pegawai Operasi") return <PegawaiOperasiProfileView />
  if (role === "SPSB") return <SpsbProfileView />
  if (role === "LPPS Pengurus Besar") return <PengurusBesarProfileView />
  if (role === "LPPS Kewangan") return <KewanganProfileView />
  if (role === "JKDM") return <JkdmProfileView />

  return <PemohonProfileView />
}

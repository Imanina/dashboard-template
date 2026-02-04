export type ApplicationStatus =
  | "submitted"
  | "doc_checked"
  | "spsb_verified"
  | "assessed"
  | "approved"
  | "invoiced"
  | "paid"
  | "permit_issued"
  | "finalized"

export const FLOW_STEPS: { status: ApplicationStatus; label: string }[] = [
  { status: "submitted", label: "Submitted by Pemohon" },
  { status: "doc_checked", label: "Documents checked by Pegawai Operasi" },
  { status: "spsb_verified", label: "SPSB verification completed" },
  { status: "assessed", label: "Assessment completed" },
  { status: "approved", label: "Approved by Pengurus Besar" },
  { status: "invoiced", label: "Invoice issued by Kewangan" },
  { status: "paid", label: "Payment confirmed" },
  { status: "permit_issued", label: "Permit issued" },
  { status: "finalized", label: "Final approval by JKDM" },
]

export const ROLE_STEP_ACCESS: Record<string, ApplicationStatus[]> = {
  Pemohon: ["submitted", "invoiced", "paid", "permit_issued", "finalized"],
  "LPPS Pegawai Operasi": ["submitted", "spsb_verified", "paid"],
  SPSB: ["doc_checked"],
  "LPPS Pengurus Besar": ["assessed"],
  "LPPS Kewangan": ["approved", "invoiced"],
  JKDM: ["permit_issued"],
}

export function getNextStatus(current: ApplicationStatus): ApplicationStatus | null {
  const index = FLOW_STEPS.findIndex((step) => step.status === current)
  if (index === -1 || index === FLOW_STEPS.length - 1) {
    return null
  }
  return FLOW_STEPS[index + 1].status
}

export function getStepLabel(status: ApplicationStatus) {
  return FLOW_STEPS.find((step) => step.status === status)?.label ?? status
}

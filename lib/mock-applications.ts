import { ApplicationStatus } from "./application-flow"

export interface ApplicationRecord {
  id: string
  applicantName: string
  companyName: string
  submittedAt: string
  status: ApplicationStatus
  applicationType?: "New" | "Renewal"
  permitNumber?: string
}

export const MOCK_APPLICATIONS: ApplicationRecord[] = [
  {
    id: "APP-2026-001",
    applicantName: "Aina Sofea",
    companyName: "Sofea Logistics Sdn Bhd",
    submittedAt: "2026-01-24",
    status: "submitted",
    applicationType: "New",
  },
]

import { ApplicationStatus } from "./application-flow"

export type ApplicationType =
  | "New"
  | "Renewal"
  | "Private Jetty - New"
  | "Private Jetty - Renewal"
  | "Mid-Stream - New"
  | "Mid-Stream - Renewal"

export interface ApplicationRecord {
  id: string
  applicantName: string
  companyName: string
  submittedAt: string
  status: ApplicationStatus
  applicationType?: ApplicationType
  permitNumber?: string
  details?: Record<string, unknown>
  documents?: string[]
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

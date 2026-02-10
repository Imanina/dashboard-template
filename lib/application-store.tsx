import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { ApplicationStatus } from "./application-flow"
import { supabase } from "./supabase"
import { ApplicationRecord, ApplicationType, MOCK_APPLICATIONS } from "./mock-applications"

interface ApplicationStore {
  applications: ApplicationRecord[]
  addApplication: (app: ApplicationRecord) => Promise<void>
  updateStatus: (id: string, nextStatus: ApplicationStatus | null) => Promise<void>
}

const ApplicationContext = createContext<ApplicationStore | undefined>(undefined)

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<ApplicationRecord[]>([])

  useEffect(() => {
    let isActive = true

    const loadApplications = async () => {
      const { data, error } = await supabase
        .schema("LPPS")
        .from("applications")
        .select(
          "id, applicant_name, company_name, submitted_at, status, application_type, permit_number, details, documents"
        )
        .order("submitted_at", { ascending: false })

      if (error) {
        console.error("Failed to load applications:", error)
        if (isActive) {
          setApplications(MOCK_APPLICATIONS)
        }
        return
      }

      if (isActive) {
        setApplications(
          (data ?? []).map((row) => ({
            id: row.id,
            applicantName: row.applicant_name,
            companyName: row.company_name,
            submittedAt: row.submitted_at,
            status: row.status,
            applicationType: row.application_type as ApplicationType,
            permitNumber: row.permit_number ?? undefined,
            details: row.details ?? undefined,
            documents: row.documents ?? undefined,
          }))
        )
      }
    }

    loadApplications()

    return () => {
      isActive = false
    }
  }, [])

  const addApplication = async (app: ApplicationRecord) => {
    const { data, error } = await supabase
      .schema("LPPS")
      .from("applications")
      .insert({
        id: app.id,
        applicant_name: app.applicantName,
        company_name: app.companyName,
        submitted_at: app.submittedAt,
        status: app.status,
        application_type: app.applicationType ?? null,
        permit_number: app.permitNumber ?? null,
        details: app.details ?? null,
        documents: app.documents ?? null,
      })
      .select(
        "id, applicant_name, company_name, submitted_at, status, application_type, permit_number, details, documents"
      )
      .single()

    if (error) {
      console.error("Failed to add application:", error)
      setApplications((prev) => [app, ...prev])
      return
    }

    if (data) {
      setApplications((prev) => [
        {
          id: data.id,
          applicantName: data.applicant_name,
          companyName: data.company_name,
          submittedAt: data.submitted_at,
          status: data.status,
          applicationType: data.application_type as ApplicationType,
          permitNumber: data.permit_number ?? undefined,
          details: data.details ?? undefined,
          documents: data.documents ?? undefined,
        },
        ...prev,
      ])
    }
  }

  const updateStatus = async (id: string, nextStatus: ApplicationStatus | null) => {
    if (!nextStatus) return

    const { error } = await supabase
      .schema("LPPS")
      .from("applications")
      .update({ status: nextStatus })
      .eq("id", id)

    if (error) {
      console.error("Failed to update application status:", error)
      return
    }

    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: nextStatus } : app))
    )
  }

  const value = useMemo(
    () => ({
      applications,
      addApplication,
      updateStatus,
    }),
    [applications]
  )

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
}

export function useApplicationStore() {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error("useApplicationStore must be used within ApplicationProvider")
  }
  return context
}

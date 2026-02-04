import React, { createContext, useContext, useMemo, useState } from "react"
import { ApplicationStatus } from "./application-flow"
import { ApplicationRecord, MOCK_APPLICATIONS } from "./mock-applications"

interface ApplicationStore {
  applications: ApplicationRecord[]
  addApplication: (app: ApplicationRecord) => void
  updateStatus: (id: string, nextStatus: ApplicationStatus | null) => void
}

const ApplicationContext = createContext<ApplicationStore | undefined>(undefined)

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<ApplicationRecord[]>(MOCK_APPLICATIONS)

  const addApplication = (app: ApplicationRecord) => {
    setApplications((prev) => [app, ...prev])
  }

  const updateStatus = (id: string, nextStatus: ApplicationStatus | null) => {
    if (!nextStatus) return
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

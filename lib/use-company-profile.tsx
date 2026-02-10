import { useEffect, useState } from "react"
import { supabase } from "./supabase"

export interface CompanyProfile {
  id?: string
  companyName: string
  companyAddress: string
  contactFullName: string
  phoneNumber: string
  faxNumber: string
  email: string
  shippingAgent: string
  officerName: string
  officerPhone: string
}

const COMPANY_PROFILE_ID = "00000000-0000-0000-0000-000000000001"

export function useCompanyProfile() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    const loadProfile = async () => {
      const { data, error } = await supabase
        .schema("LPPS")
        .from("company_profiles")
        .select(
          "id, company_name, company_address, contact_full_name, phone_number, fax_number, email, shipping_agent, officer_name, officer_phone"
        )
        .eq("id", COMPANY_PROFILE_ID)
        .maybeSingle()

      if (!isActive) return

      if (error) {
        console.error("Failed to load company profile:", error)
        setProfile(null)
        setLoading(false)
        return
      }

      if (data) {
        setProfile({
          id: data.id ?? COMPANY_PROFILE_ID,
          companyName: data.company_name ?? "",
          companyAddress: data.company_address ?? "",
          contactFullName: data.contact_full_name ?? "",
          phoneNumber: data.phone_number ?? "",
          faxNumber: data.fax_number ?? "",
          email: data.email ?? "",
          shippingAgent: data.shipping_agent ?? "",
          officerName: data.officer_name ?? "",
          officerPhone: data.officer_phone ?? "",
        })
      } else {
        setProfile(null)
      }
      setLoading(false)
    }

    loadProfile()

    return () => {
      isActive = false
    }
  }, [])

  return { profile, loading }
}


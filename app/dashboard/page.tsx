import { DashboardPage } from "@/components/dashboard-page"
import { DashboardAuth } from "@/components/dashboard-auth"

export default function Dashboard() {
  return (
    <DashboardAuth>
      <DashboardPage />
    </DashboardAuth>
  )
}


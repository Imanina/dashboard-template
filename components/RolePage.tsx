import { PageShell } from "../components/PageShell"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

interface RoleSection {
  title: string
  items: string[]
}

interface RolePageProps {
  title: string
  subtitle: string
  sections: RoleSection[]
}

export function RolePage({ title, subtitle, sections }: RolePageProps) {
  return (
    <PageShell title={title} subtitle={subtitle}>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="text-base">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}

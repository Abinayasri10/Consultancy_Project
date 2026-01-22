import { BookOpen, Lightbulb, TrendingUp } from "lucide-react"
import "../styles/knowledge.css"

function KnowledgeHubPage() {
  const insights = [
    {
      title: "Farmer Mistakes & Solutions",
      icon: Lightbulb,
      items: [
        "Incorrect dosage application",
        "Over-spraying leading to phytotoxicity",
        "Using expired pesticides",
        "Not following pre-harvest intervals",
        "Spraying during wrong weather conditions",
      ],
    },
    {
      title: "Integrated Pest Management (IPM) Guide",
      icon: BookOpen,
      items: [
        "Cultural control: proper crop rotation",
        "Mechanical control: setting pheromone traps",
        "Biological control: promoting natural enemies",
        "Chemical control: minimal use approach",
        "Monitoring: regular field scouting",
      ],
    },
    {
      title: "Data-Driven Agricultural Insights",
      icon: TrendingUp,
      items: [
        "Regional pest prevalence data",
        "Seasonal disease outbreak patterns",
        "Crop-specific pesticide effectiveness",
        "Environmental impact assessments",
        "Best management practices by region",
      ],
    },
  ]

  return (
    <div className="knowledge-hub-page">
      <div className="page-header">
        <h1>Agricultural Knowledge Hub</h1>
        <p>Data-driven insights for informed farming decisions</p>
      </div>

      <div className="container">
        <div className="insights-grid">
          {insights.map((insight, idx) => {
            const Icon = insight.icon
            return (
              <section key={idx} className="insight-card">
                <div className="insight-header">
                  <Icon size={32} className="insight-icon" />
                  <h2>{insight.title}</h2>
                </div>
                <ul className="insight-list">
                  {insight.items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default KnowledgeHubPage

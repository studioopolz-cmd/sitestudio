import { SiteNav } from "@/components/site-nav"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { WorksSection } from "@/components/works-section"
import { ClientsSection } from "@/components/clients-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <WorksSection />
      <ClientsSection />
      <PricingSection />
      <ContactSection />
      <SiteFooter />
    </main>
  )
}

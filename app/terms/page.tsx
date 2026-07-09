import { LegalPage, Clause } from '@/components/os/Legal'
import { CONTACT } from '@/lib/os'

export const metadata = { title: 'Terms of Service, Xevaro Labs' }

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="June 2026">
      <Clause heading="1. Agreement">
        <p>These Terms of Service govern your access to and use of the Xevaro Labs website
        ({CONTACT.site}) and the AI automation, software, and consulting services we provide
        (the &quot;Services&quot;). By engaging Xevaro Labs or using this site, you agree to these terms.</p>
      </Clause>

      <Clause heading="2. Services">
        <p>Xevaro Labs designs, builds, and operates AI automation systems, agents, websites,
        e-commerce, lead generation, and business intelligence solutions. The specific scope,
        deliverables, and timelines for any engagement are defined in a separate written proposal
        or statement of work agreed between you and Xevaro Labs.</p>
      </Clause>

      <Clause heading="3. Quotes & pricing">
        <p>Pricing is provided on a per project basis after we assess your requirements. Any quote
        we issue is valid for the period stated within it and is subject to the agreed scope.
        Changes to scope may affect pricing and timelines.</p>
      </Clause>

      <Clause heading="4. Client responsibilities">
        <p>You agree to provide accurate information, timely access to systems and accounts needed
        to deliver the Services, and prompt feedback. Delays in providing these may affect delivery
        timelines. You are responsible for the legality of the data and use cases you ask us to automate.</p>
      </Clause>

      <Clause heading="5. Intellectual property">
        <p>Upon full payment, you own the custom deliverables created specifically for you. Xevaro
        Labs retains ownership of its preexisting tools, frameworks, and know how used to deliver
        the Services. Third party software and APIs remain subject to their own licenses.</p>
      </Clause>

      <Clause heading="6. Confidentiality">
        <p>Each party agrees to protect the other&apos;s confidential information and to use it only
        for the purpose of the engagement.</p>
      </Clause>

      <Clause heading="7. Limitation of liability">
        <p>The Services are provided on a commercially reasonable basis. To the maximum extent
        permitted by law, Xevaro Labs is not liable for indirect, incidental, or consequential
        damages, and our total liability is limited to the fees paid for the specific engagement
        giving rise to the claim.</p>
      </Clause>

      <Clause heading="8. Third party platforms">
        <p>Our automations may rely on third party services (e.g. hosting, AI model providers,
        messaging and CRM platforms). We are not responsible for outages, changes, or pricing of
        those providers.</p>
      </Clause>

      <Clause heading="9. Termination">
        <p>Either party may terminate an engagement in accordance with the relevant statement of
        work. Fees for work completed up to the termination date remain payable.</p>
      </Clause>

      <Clause heading="10. Contact">
        <p>Questions about these terms? Email <a href={`mailto:${CONTACT.email}`} className="text-[#E53E3E] hover:underline">{CONTACT.email}</a> or
        call <a href={`tel:${CONTACT.phone}`} className="text-[#E53E3E] hover:underline">{CONTACT.phone}</a>.</p>
      </Clause>
    </LegalPage>
  )
}

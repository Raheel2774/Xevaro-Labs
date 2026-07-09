import { LegalPage, Clause } from '@/components/os/Legal'
import { CONTACT } from '@/lib/os'

export const metadata = { title: 'Refund Policy, Xevaro Labs' }

export default function RefundPage() {
  return (
    <LegalPage title="Refund Policy" updated="June 2026">
      <Clause heading="1. Custom work">
        <p>Xevaro Labs delivers custom AI automation and software services. Because each engagement
        is bespoke and resources are committed in advance, fees are generally non refundable once
        work has begun, except as described below.</p>
      </Clause>

      <Clause heading="2. Deposits & milestones">
        <p>Projects are typically billed via an upfront deposit and milestone payments defined in
        your statement of work. Deposits secure your slot and cover initial discovery and setup, and
        are non refundable once that work has started.</p>
      </Clause>

      <Clause heading="3. Before work begins">
        <p>If you cancel before any work has commenced, you are eligible for a full refund of any
        amount paid, minus any third party costs already incurred on your behalf.</p>
      </Clause>

      <Clause heading="4. If we can't deliver">
        <p>If Xevaro Labs is unable to deliver an agreed milestone and no acceptable alternative can
        be arranged, we will refund the fees paid for that specific undelivered milestone.</p>
      </Clause>

      <Clause heading="5. Subscriptions & retainers">
        <p>Ongoing automation, support, or retainer plans can be cancelled for future billing
        periods with notice as specified in your agreement. Fees for the current period are not
        prorated unless stated otherwise.</p>
      </Clause>

      <Clause heading="6. Third party costs">
        <p>Charges paid to third party providers (hosting, AI model usage, messaging credits, domain
        and license fees) are non refundable, as they are consumed or committed externally.</p>
      </Clause>

      <Clause heading="7. How to request a refund">
        <p>To request a refund or discuss your engagement, email <a href={`mailto:${CONTACT.email}`} className="text-[#E53E3E] hover:underline">{CONTACT.email}</a> or
        call <a href={`tel:${CONTACT.phone}`} className="text-[#E53E3E] hover:underline">{CONTACT.phone}</a>. We aim to respond within one business day and resolve
        requests fairly.</p>
      </Clause>
    </LegalPage>
  )
}

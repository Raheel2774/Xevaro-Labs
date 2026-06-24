import { LegalPage, Clause } from '@/components/os/Legal'
import { CONTACT } from '@/lib/os'

export const metadata = { title: 'Privacy Policy — Xevaro Labs' }

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 2026">
      <Clause heading="1. Overview">
        <p>This Privacy Policy explains how Xevaro Labs collects, uses, and protects the information
        you provide through {CONTACT.site}. We respect your privacy and only collect what we need to
        respond to you and deliver our Services.</p>
      </Clause>

      <Clause heading="2. Information we collect">
        <p>When you submit a contact or pricing request, we collect the details you provide — such as
        your name, company, email address, phone number, the service you&apos;re interested in, and
        your message. For security and abuse prevention, we may also log your IP address and browser
        user agent.</p>
      </Clause>

      <Clause heading="3. How we use your information">
        <p>We use your information to respond to enquiries, prepare quotes, provide and improve our
        Services, and communicate with you about your project. We do not sell your personal
        information.</p>
      </Clause>

      <Clause heading="4. Where your data is stored">
        <p>Submissions are stored securely in our database hosted on Cloudflare. The website is
        served via Vercel. These providers process data on our behalf under their own security and
        privacy commitments.</p>
      </Clause>

      <Clause heading="5. Data retention">
        <p>We keep enquiry data for as long as needed to serve you and for legitimate business
        records. You may request deletion of your personal data at any time (see &quot;Your rights&quot;).</p>
      </Clause>

      <Clause heading="6. Your rights">
        <p>You may request access to, correction of, or deletion of the personal information we hold
        about you. To exercise these rights, contact us using the details below.</p>
      </Clause>

      <Clause heading="7. Cookies">
        <p>The site uses only the cookies necessary for core functionality (for example, the secure
        session cookie for our internal admin area). We do not use advertising trackers.</p>
      </Clause>

      <Clause heading="8. Third parties">
        <p>We may use third-party tools (hosting, AI providers, messaging, and analytics) to deliver
        the Services. These providers access data only as needed to perform their functions.</p>
      </Clause>

      <Clause heading="9. Contact">
        <p>For privacy questions or requests, email <a href={`mailto:${CONTACT.email}`} className="text-[#00D6FF] hover:underline">{CONTACT.email}</a> or
        call <a href={`tel:${CONTACT.phone}`} className="text-[#00D6FF] hover:underline">{CONTACT.phone}</a>.</p>
      </Clause>
    </LegalPage>
  )
}

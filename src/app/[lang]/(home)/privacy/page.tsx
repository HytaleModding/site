import type { Metadata } from "next";
import { Footer } from "../footer";

export const metadata: Metadata = {
  title: "Privacy Policy | HytaleModding",
  description: "HytaleModding is the largest community of modders for Hytale. We bring modders together to build, share, and celebrate what they make. We write docs, guides, and tools for modders of every skill level, and run events like ModJams, town halls, and more!",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName: "HytaleModding",
    url: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="flex-1">
        <article className="prose prose-zinc dark:prose-invert mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">
            Last updated: August 29, 2026
          </p>

          <h2>1. Controller and contact information</h2>
          <p>
            The data controller for this website and the HytaleModding grant
            program is <strong>The Modding Foundation</strong>, a nonprofit
            organization based in North Carolina, United States. HytaleModding
            is the name of the website and community operated by The Modding
            Foundation.
          </p>
          <p>
            Privacy questions and requests may be sent to{" "}
            <a href="mailto:legal@hytalemodding.dev">
              legal@hytalemodding.dev
            </a>
            .
          </p>

          <h2>2. Information we collect</h2>
          <h3>2.1 Ordinary website use</h3>
          <p>
            You can browse the website without creating an account or providing
            your name, email address, payment information, or other information
            directly identifying you. We do not operate advertising profiles,
            sell personal information, or use advertising cookies.
          </p>

          <h3>2.2 Grant applications</h3>
          <p>
            If you apply to the HytaleModding grant program, the application
            form asks for your email address and information about your project.
            We use that information to receive, review, evaluate, and
            administer your application and to contact you about it. Providing
            this information is optional, but we cannot review an application
            without it.
          </p>
          <p>
            The grant form is provided by Fillout. Information entered into the
            form is submitted to Fillout and may be processed by Fillout as
            described in its{" "}
            <a href="https://www.fillout.com/privacy" rel="noreferrer">
              privacy policy
            </a>
            . The Modding Foundation does not collect any additional applicant
            information beyond what is submitted through that form.
          </p>

          <h2>3. Anonymous analytics</h2>
          <p>
            We use PostHog to understand how HytaleModding is used. This helps
            us measure page views and broad, aggregate website usage, improve
            performance, and identify technical problems.
          </p>
          <p>
            Our PostHog implementation is configured for cookieless, anonymous
            tracking. IP anonymization is enabled, and PostHog does not receive
            or store visitors&apos; IP addresses. Session replay, session
            recording, and autocapture are disabled. We do not use PostHog to
            identify you, and we do not send names, email addresses, grant
            applications, or project details to PostHog.
          </p>
          <p>
            PostHog is a separate service provider and may process analytics data in
            accordance with its{" "}
            <a href="https://posthog.com/privacy" rel="noreferrer">
              privacy policy
            </a>
            .
          </p>

          <h2>4. Purposes and legal bases</h2>
          <p>
            We process information to receive, review, and administer grant
            applications; communicate with applicants; operate, secure,
            troubleshoot, and improve the website; measure aggregate page usage;
            comply with legal obligations; respond to lawful requests; protect
            our rights; and prevent misuse of the website.
          </p>
          <p>
            For individuals in the EU/EEA or United Kingdom, our legal basis for
            grant-application processing is taking steps at the applicant&apos;s
            request and our legitimate interests in administering the grant
            program. Our legal basis for security and aggregate analytics is our
            legitimate interest in operating and improving the website, where
            that basis is permitted by applicable law. Where applicable law
            requires consent, we will request consent before processing and you
            may withdraw it at any time.
          </p>

          <h2>5. Service providers and international transfers</h2>
          <p>
            We use service providers to host the website, deliver content,
            provide the grant application form, provide analytics, and protect
            the website. They may process information only as needed to provide
            those services and under their own terms and privacy policies.
          </p>
          <p>
            The Modding Foundation is based in the United States. Depending on
            the provider and your location, information may be processed in the
            United States or another country outside your country of residence.
            Where applicable law requires safeguards for an international
            transfer, we rely on the safeguards made available by the relevant
            provider, such as an adequacy decision or standard contractual
            clauses.
          </p>

          <h2>6. Retention</h2>
          <p>
            We retain grant-application emails and project details only for as
            long as reasonably necessary to review and administer the grant
            program, communicate with applicants, resolve disputes, maintain
            records, and comply with legal obligations. We then delete or
            anonymize them when reasonably practicable. Fillout may retain form
            submissions under its own retention practices.
          </p>
          <p>
            Anonymous analytics data is retained according to the retention
            settings of our PostHog project and as needed for aggregate
            reporting, security, and service operation. Technical logs may be
            retained by hosting and infrastructure providers for a limited
            period for security and troubleshooting.
          </p>

          <h2>7. Cookies and local storage</h2>
          <p>
            We do not use advertising cookies or analytics cookies. Our PostHog
            configuration is cookieless. Your browser may still store
            technically necessary data used by the website or by an external
            service that you choose to access.
          </p>

          <h2>8. Your rights</h2>
          <p>
            Depending on where you live and subject to applicable law, you may
            have the right to request access to, correction of, deletion of,
            restriction of, or portability of personal information we hold
            about you. You may also object to processing based on legitimate
            interests or withdraw consent where processing is based on consent.
          </p>
          <p>
            To make a request, email{" "}
            <a href="mailto:legal@hytalemodding.dev">
              legal@hytalemodding.dev
            </a>
            . We may need to verify your identity before fulfilling a request.
            We will respond within the period required by applicable law. If
            your request concerns a submission held directly by Fillout, we may
            need to refer you to Fillout or coordinate with Fillout.
          </p>
          <p>
            Individuals in the EU/EEA or United Kingdom may also lodge a
            complaint with their local data-protection supervisory authority.
            Individuals in India may exercise rights available under applicable
            Indian data-protection law by contacting us at the address above.
          </p>

          <h2>9. Sale, sharing, and targeted advertising</h2>
          <p>
            We do not sell personal information, share it for cross-context
            behavioral advertising, or use it for targeted advertising. We may
            disclose information to service providers, legal authorities, or
            other parties when necessary to provide the services described in
            this policy, comply with law, protect people or property, or enforce
            our rights.
          </p>

          <h2>10. Children</h2>
          <p>
            The website is not directed to children under 13, and we do not
            knowingly collect personal information from children under 13. If
            you believe a child has provided personal information to us, please
            contact us so we can take appropriate action.
          </p>

          <h2>11. Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational
            measures intended to protect information against unauthorized
            access, loss, misuse, or alteration. No internet transmission or
            storage system is completely secure, and we cannot guarantee
            absolute security.
          </p>

          <h2>12. External links and services</h2>
          <p>
            The website may link to or embed services operated by third parties,
            including Fillout and YouTube. Their collection and use of
            information is governed by their own privacy policies, not this
            policy. YouTube content may be delivered using its
            privacy-enhanced domain, but interacting with an embedded video or
            visiting another service may still involve that service&apos;s own
            processing.
          </p>

          <h2>13. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The revised policy
            becomes effective when posted on this page, unless a later effective
            date is stated. We will update the “Last updated” date when we make
            a material change.
          </p>

          <h2>14. Contact</h2>
          <p>
            For questions, privacy requests, or complaints about our handling of
            information, contact The Modding Foundation at{" "}
            <a href="mailto:legal@hytalemodding.dev">
              legal@hytalemodding.dev
            </a>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

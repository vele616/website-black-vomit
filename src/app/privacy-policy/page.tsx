export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <article className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: March 10, 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-foreground">1. Data Controller</h2>
          <p className="leading-relaxed text-muted-foreground">
            This website is operated by Black Vomit.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            If you have any questions about this privacy policy or your personal data,
            you can contact:
          </p>
          <p className="leading-relaxed text-muted-foreground">Email: bv.dizajn@hotmail.com</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-foreground">2. Analytics</h2>
          <p className="leading-relaxed text-muted-foreground">
            This website uses Vercel Analytics to understand how visitors use the
            website.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Vercel Analytics collects anonymous usage data such as page views, device
            type, browser information, referring website, and approximate geographic
            region.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            This information helps improve the website and its performance. No
            personally identifiable information is collected through analytics.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-foreground">3. Contact Form</h2>
          <p className="leading-relaxed text-muted-foreground">
            When you contact us through the website&apos;s contact form, the information
            you provide, including your name, email address, a short description of the
            reason for contacting, and the message content, may be collected and used
            solely for the purpose of responding to your inquiry.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The data will not be shared with third parties and will only be retained as
            long as necessary to respond to your request.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-foreground">4. Legal Basis</h2>
          <p className="leading-relaxed text-muted-foreground">
            Personal data submitted through the contact form is processed based on our
            legitimate interest in responding to inquiries and communication requests.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-foreground">5. Your Rights</h2>
          <p className="leading-relaxed text-muted-foreground">
            Depending on your location, you may have the right to request access to,
            correction of, or deletion of your personal data.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            If you wish to exercise these rights, please contact us using the email
            address listed above.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-medium text-foreground">6. Changes to This Policy</h2>
          <p className="leading-relaxed text-muted-foreground">
            This privacy policy may be updated from time to time. Any changes will be
            posted on this page.
          </p>
        </section>
      </article>
    </main>
  );
}

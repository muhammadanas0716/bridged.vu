import type { Metadata } from 'next';
import { NONPROFIT, nonprofitJsonLd } from '@/content/nonprofit';

export const metadata: Metadata = {
  title: 'Nonprofit Status — bridged.vu',
  description:
    'bridged.vu is fiscally sponsored by The Hack Foundation (dba Hack Club), a 501(c)(3) public charity. EIN 81-2908499. Learn more about our nonprofit status.',
  alternates: { canonical: '/nonprofit' },
  openGraph: {
    title: 'Nonprofit Status — bridged.vu',
    description:
      'bridged.vu is fiscally sponsored by The Hack Foundation (dba Hack Club), a 501(c)(3) public charity. EIN 81-2908499.',
    images: ['/logo.png'],
    url: '/nonprofit',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Nonprofit Status — bridged.vu', description: 'EIN 81-2908499. Fiscally sponsored by Hack Club.' },
};

export default function NonprofitPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const jsonLd = nonprofitJsonLd(base);
  const n = NONPROFIT;
  return (
    <div>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border px-3 py-1 rounded-lg">Skip to content</a>
      <div className="space-y-6" id="content">
        <nav className="text-xs text-neutral-700" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><a className="hover:underline" href="/">Home</a></li>
            <li aria-hidden>›</li>
            <li><a className="hover:underline" href="/about">About</a></li>
            <li aria-hidden>›</li>
            <li aria-current="page">Nonprofit</li>
          </ol>
        </nav>
        <h1 className="text-2xl md:text-3xl font-semibold">bridged.vu nonprofit status</h1>
        <p className="text-neutral-900/85 max-w-3xl">
          bridged.vu operates under fiscal sponsorship by The Hack Foundation (dba Hack Club), a 501(c)(3) public charity. This means we receive the benefits of nonprofit status while Hack Club provides the legal and financial umbrella. EIN 81-2908499.
        </p>
        <section className="rounded-xl border border-neutral-900/20 bg-white/60 p-4 space-y-2">
          <ul className="list-disc pl-5 space-y-1 text-neutral-900/90">
            <li><strong>EIN:</strong> {n.ein}</li>
            <li><strong>Legal address:</strong> {n.addressLine1}, {n.addressLocality}, {n.addressRegion} {n.postalCode}</li>
            <li><strong>Phone:</strong> 855-625-4225</li>
            <li>Learn more at <a className="underline" href={n.website} target="_blank" rel="noopener noreferrer">hackclub.com</a></li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-lg font-medium">FAQ</h2>
          <details className="rounded-lg border border-neutral-900/20 p-3">
            <summary className="cursor-pointer font-medium">What does fiscally sponsored mean?</summary>
            <p className="mt-2">bridged.vu is not its own standalone 501(c)(3). Instead, The Hack Foundation (dba Hack Club), a 501(c)(3) public charity, serves as our sponsor, extending its nonprofit status to our project and handling compliance and back-office support.</p>
          </details>
          <details className="rounded-lg border border-neutral-900/20 p-3">
            <summary className="cursor-pointer font-medium">Are donations tax-deductible?</summary>
            <p className="mt-2">Donations made to bridged.vu through our fiscal sponsor are generally tax-deductible in the U.S., subject to donor circumstances. Please consult a tax advisor.</p>
          </details>
          <details className="rounded-lg border border-neutral-900/20 p-3">
            <summary className="cursor-pointer font-medium">Where can I verify this information?</summary>
            <p className="mt-2">See Hack Club’s official site and nonprofit directories for The Hack Foundation (EIN 81-2908499).</p>
          </details>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Transparency</h2>
          <p className="text-sm text-neutral-900/85 max-w-3xl">We route donations through our fiscal sponsor, maintain receipts, and respond promptly to inquiries. For documentation or questions, email {n.contactEmail}.</p>
        </section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}


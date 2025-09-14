export const NONPROFIT = {
  siteName: 'bridged.vu',
  sponsorName: 'The Hack Foundation (dba Hack Club)',
  ein: '81-2908499',
  addressLine1: '8605 Santa Monica Blvd, Suite 86294',
  addressLocality: 'West Hollywood',
  addressRegion: 'CA',
  postalCode: '90069',
  country: 'US',
  phone: '+1-855-625-4225',
  website: 'https://hackclub.com',
  contactEmail: 'hello@bridged.vu',
};

export const NONPROFIT_SHORT_DISCLOSURE =
  'bridged.vu is fiscally sponsored by The Hack Foundation (dba Hack Club), a 501(c)(3) public charity, EIN 81-2908499.';

export function nonprofitJsonLd(baseUrl: string) {
  const n = NONPROFIT;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: n.siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'inquiries',
        email: n.contactEmail,
      },
    ],
    sponsor: {
      '@type': 'Organization',
      name: n.sponsorName,
      url: n.website,
      taxID: n.ein,
      address: {
        '@type': 'PostalAddress',
        streetAddress: n.addressLine1,
        addressLocality: n.addressLocality,
        addressRegion: n.addressRegion,
        postalCode: n.postalCode,
        addressCountry: n.country,
      },
      telephone: n.phone,
    },
  } as const;
}


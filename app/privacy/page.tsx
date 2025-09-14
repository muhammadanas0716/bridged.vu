"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-neutral-600">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-neutral-700 mb-4">
                FounderDiary ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our
                open-source platform and services.
              </p>
              <p className="text-neutral-700 mb-4">
                By using FounderDiary, you agree to the collection and use of
                information in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-medium text-neutral-900 mb-3">
                2.1 Personal Information
              </h3>
              <p className="text-neutral-700 mb-4">
                When you register for an account or use our services, we may
                collect:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>Name and username</li>
                <li>Email address</li>
                <li>Profile information you choose to provide</li>
                <li>Content you create and share on the platform</li>
              </ul>

              <h3 className="text-xl font-medium text-neutral-900 mb-3">
                2.2 Technical Information
              </h3>
              <p className="text-neutral-700 mb-4">
                We automatically collect certain technical information:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>IP address and browser information</li>
                <li>Device and operating system details</li>
                <li>Usage patterns and interactions with the platform</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-neutral-700 mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Create and manage your user account</li>
                <li>
                  Enable you to share content and connect with other users
                </li>
                <li>
                  Send important notifications about your account or the service
                </li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Ensure platform security and prevent abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-neutral-700 mb-4">
                We do not sell, trade, or rent your personal information to
                third parties. We may share information in the following
                circumstances:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>
                  <strong>Public Content:</strong> Content you choose to share
                  publicly on the platform
                </li>
                <li>
                  <strong>Service Providers:</strong> Trusted third-party
                  services that help us operate the platform
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or
                  to protect rights and safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with
                  mergers, acquisitions, or asset sales
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                5. Open Source Considerations
              </h2>
              <p className="text-neutral-700 mb-4">
                As an open-source project, certain aspects of our platform are
                transparent:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>Source code is publicly available on GitHub</li>
                <li>Development discussions and issues may be public</li>
                <li>
                  Contributors' GitHub profiles and contributions are visible
                </li>
                <li>Technical implementation details are open for review</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                6. Data Security
              </h2>
              <p className="text-neutral-700 mb-4">
                We implement appropriate technical and organizational measures
                to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure hosting and infrastructure</li>
              </ul>
              <p className="text-neutral-700 mb-4">
                However, no method of transmission over the Internet is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                7. Cookies and Tracking
              </h2>
              <p className="text-neutral-700 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Maintain your login session</li>
                <li>Analyze site usage and performance</li>
                <li>Provide personalized content</li>
              </ul>
              <p className="text-neutral-700 mb-4">
                You can control cookie settings through your browser, but some
                features may not function properly if cookies are disabled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                8. Your Rights and Choices
              </h2>
              <p className="text-neutral-700 mb-4">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>
                  <strong>Access:</strong> Request access to your personal data
                </li>
                <li>
                  <strong>Correction:</strong> Update or correct inaccurate
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your account
                  and data
                </li>
                <li>
                  <strong>Portability:</strong> Export your data in a structured
                  format
                </li>
                <li>
                  <strong>Objection:</strong> Object to certain processing
                  activities
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                9. Data Retention
              </h2>
              <p className="text-neutral-700 mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain security and prevent abuse</li>
              </ul>
              <p className="text-neutral-700 mb-4">
                When you delete your account, we will remove your personal
                information, though some data may be retained for legal or
                operational purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                10. International Data Transfers
              </h2>
              <p className="text-neutral-700 mb-4">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place to protect your data during such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                11. Children's Privacy
              </h2>
              <p className="text-neutral-700 mb-4">
                Our service is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13. If you become aware that a child has provided us with
                personal information, please contact us so we can take
                appropriate action.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                12. Changes to This Privacy Policy
              </h2>
              <p className="text-neutral-700 mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. We encourage you
                to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                13. Contact Us
              </h2>
              <p className="text-neutral-700 mb-4">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>Through our GitHub repository issues</li>
                <li>Via the contact methods provided on our website</li>
                <li>By email at the address provided on our platform</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 p-6 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-600">
              <strong>Note:</strong> As an open-source project, our privacy
              practices are transparent and can be reviewed in our public
              repository. We are committed to maintaining the highest standards
              of privacy and data protection.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

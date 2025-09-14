"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-neutral-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-neutral-700 mb-4">
                By accessing and using Bridged.vu ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Description of Service</h2>
              <p className="text-neutral-700 mb-4">
                Bridged.vu is an open-source platform where founders can share their story and daily progress. The Service allows users to create profiles, share project updates, and connect with other entrepreneurs in the community.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-neutral-700 mb-4">
                To use certain features of the Service, you may be required to register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your information to keep it accurate and current</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. User Content and Conduct</h2>
              <p className="text-neutral-700 mb-4">
                You are responsible for all content you post, upload, or share on the Service. You agree not to:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4">
                <li>Post content that is illegal, harmful, threatening, abusive, or defamatory</li>
                <li>Infringe on intellectual property rights of others</li>
                <li>Share spam, advertisements, or unsolicited promotional content</li>
                <li>Impersonate others or provide false information</li>
                <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
                <li>Use automated systems to access the Service without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Open Source License</h2>
              <p className="text-neutral-700 mb-4">
                Bridged.vu is released under the MIT License. The source code is available on GitHub and you are free to use, modify, and distribute the code in accordance with the MIT License terms. However, this does not grant you rights to use the Bridged.vu name, logo, or branding without permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Intellectual Property</h2>
              <p className="text-neutral-700 mb-4">
                You retain ownership of content you create and share on the Service. By posting content, you grant Bridged.vu a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content in connection with the Service.
              </p>
              <p className="text-neutral-700 mb-4">
                The Bridged.vu name, logo, and original design elements are protected by intellectual property laws and may not be used without permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. Privacy Policy</h2>
              <p className="text-neutral-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Service Availability</h2>
              <p className="text-neutral-700 mb-4">
                We strive to maintain the Service's availability, but cannot guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or technical issues. As an open-source project, the Service is provided "as is" without warranties of any kind.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">9. Termination</h2>
              <p className="text-neutral-700 mb-4">
                We may terminate or suspend your account and access to the Service at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">10. Disclaimer of Warranties</h2>
              <p className="text-neutral-700 mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">11. Limitation of Liability</h2>
              <p className="text-neutral-700 mb-4">
                IN NO EVENT SHALL BRIDGED.VU BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">12. Changes to Terms</h2>
              <p className="text-neutral-700 mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting the new Terms on the Service and updating the "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">13. Governing Law</h2>
              <p className="text-neutral-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the Service is operated, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">14. Contact Information</h2>
              <p className="text-neutral-700 mb-4">
                If you have any questions about these Terms, please contact us through our GitHub repository or the contact methods provided on our website.
              </p>
            </section>
          </div>

          <div className="mt-12 p-6 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-600">
              <strong>Note:</strong> This is an open-source project released under the MIT License. 
              These terms govern the use of the hosted service, while the MIT License governs the use of the source code.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

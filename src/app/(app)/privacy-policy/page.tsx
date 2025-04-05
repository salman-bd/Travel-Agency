import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last Updated: April 5, 2025</p>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Rebel Rover ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
            we collect, use, disclose, and safeguard your information when you visit our website and use our travel
            booking services, including when you access our services through Facebook Login.
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please
            do not access the site or use our services.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

          <h3 className="text-xl font-medium mt-6 mb-3">Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Register for an account</li>
            <li>Sign in with social media such as Facebook</li>
            <li>Make a booking or purchase</li>
            <li>Sign up for our newsletter</li>
            <li>Contact us</li>
            <li>Participate in promotions or surveys</li>
          </ul>
          <p>The personal information we collect may include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing and payment information</li>
            <li>Travel preferences and history</li>
            <li>Profile picture</li>
            <li>Social media profile information when you connect through Facebook Login</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">Information from Social Networks</h3>
          <p>
            When you use Facebook Login to access our services, we may collect information from your Facebook profile
            that you authorize Facebook to share with us, which may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your name</li>
            <li>Email address</li>
            <li>Profile picture</li>
            <li>Facebook ID</li>
            <li>Other information you choose to make public on Facebook</li>
          </ul>
          <p>
            We only request and collect the information necessary to provide our services and authenticate your
            identity.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Automatically Collected Information</h3>
          <p>
            When you access our website or services, we may automatically collect certain information about your device
            and usage, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Device information</li>
            <li>Usage patterns and preferences</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Create and manage your account</li>
            <li>Process and fulfill your bookings and transactions</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Send administrative information, updates, and marketing communications</li>
            <li>Personalize your experience and deliver content relevant to your interests</li>
            <li>Improve our website, products, and services</li>
            <li>Protect against fraud and unauthorized transactions</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Travel service providers necessary to fulfill your bookings (hotels, airlines, tour operators)</li>
            <li>Payment processors to complete transactions</li>
            <li>Service providers who assist us in operating our website and conducting business</li>
            <li>Marketing partners with your consent</li>
            <li>Legal authorities when required by law or to protect our rights</li>
          </ul>
          <p>
            We do not sell your personal information to third parties for their marketing purposes without your explicit
            consent.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Retention and Deletion</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>
          <p>You can request deletion of your account and personal information at any time by:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Emailing us at privacy@rebelrover.com</li>
            <li>Using the "Delete My Account" option in your account settings</li>
            <li>
              Submitting a request through our{" "}
              <Link href="/contact" className="text-[#069aba] hover:underline">
                Contact Form
              </Link>
            </li>
          </ul>
          <p>
            When you request deletion of your account, we will delete or anonymize your personal information so that it
            can no longer be used to identify you. However, some information may be retained in our backup systems or as
            required by law.
          </p>
          <p>
            <strong>Facebook Data Deletion:</strong> If you used Facebook Login to create your account, you can also
            revoke access to your Facebook data through your Facebook account settings. When you do this, or when you
            request account deletion directly with us, we will process the deletion of Facebook-provided data in
            accordance with our data deletion policy.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>The right to access the personal information we have about you</li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section
            below.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing activities and
            to remember your preferences. You can instruct your browser to refuse all cookies or to indicate when a
            cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our
            service.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal
            information. However, please be aware that no method of transmission over the internet or electronic storage
            is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 16. We do not knowingly collect personal
            information from children. If you are a parent or guardian and believe your child has provided us with
            personal information, please contact us.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="mt-4">
            <p>
              <strong>Rebel Rover Travel</strong>
            </p>
            <p>Email: privacy@rebelrover.com</p>
            <p>Phone: +62 6943 6956</p>
            <p>Address: 123 Travel Street, Adventure City, 12345</p>
          </div>
        </section>
      </div>
    </div>
  )
}


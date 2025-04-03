import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface SubscriptionConfirmationEmailProps {
  email: string
}

export const SubscriptionConfirmationEmail = ({ email }: SubscriptionConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the Traveller World Newsletter</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto max-w-[600px] rounded bg-white p-8">
            <Img
              src="https://via.placeholder.com/200x50?text=REBEL+ROVER"
              alt="Rebel Rover"
              width="200"
              height="50"
              className="mx-auto mb-4"
            />
            <Heading className="mb-4 text-center text-2xl font-bold text-gray-800">Welcome to Our Newsletter!</Heading>
            <Text className="mb-4 text-gray-700">Hello Traveler,</Text>
            <Text className="mb-4 text-gray-700">
              Thank you for subscribing to the Rebel Rover newsletter! You've taken the first step toward discovering
              amazing travel deals, insider tips, and exclusive offers.
            </Text>
            <Section className="mb-6 rounded bg-gray-50 p-4">
              <Text className="mb-2 font-bold text-gray-800">Your Subscription Details:</Text>
              <Text className="text-gray-700">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="mt-2 text-gray-700">
                You'll receive our newsletter with travel inspiration, special offers, and travel tips approximately
                once a month.
              </Text>
            </Section>
            <Text className="mb-4 text-gray-700">As a subscriber, you'll be the first to know about:</Text>
            <ul className="mb-4 list-inside list-disc text-gray-700">
              <li>Exclusive travel deals and discounts</li>
              <li>New destination launches</li>
              <li>Travel tips and inspiration</li>
              <li>Seasonal promotions</li>
            </ul>
            <Section className="mb-6 text-center">
              <Link
                href="https://rebelrover.com/destinations"
                className="inline-block rounded bg-primary px-6 py-3 text-center text-white no-underline"
              >
                Explore Our Destinations
              </Link>
            </Section>
            <Text className="mb-4 text-gray-700">
              If you ever wish to unsubscribe, you can click the unsubscribe link at the bottom of any newsletter.
            </Text>
            <Text className="text-gray-700">
              Happy travels!
              <br />
              The Traveller World Team
            </Text>
            <Hr className="my-6 border-gray-300" />
            <Text className="text-center text-xs text-gray-500">
              © {new Date().getFullYear()} Traveller World. All rights reserved.
              <br />
              123 Travel Street, City, Country
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}


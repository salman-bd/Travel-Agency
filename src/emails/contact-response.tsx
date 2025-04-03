import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface ContactResponseEmailProps {
  customerName: string
  message: string
}

export const ContactResponseEmail = ({ customerName, message }: ContactResponseEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>We've received your message</Preview>
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
            <Heading className="mb-4 text-center text-2xl font-bold text-gray-800">We've Received Your Message</Heading>
            <Text className="mb-4 text-gray-700">Hello {customerName},</Text>
            <Text className="mb-4 text-gray-700">
              Thank you for contacting Rebel Rover. We've received your message and our team will get back to you as
              soon as possible, usually within 24-48 hours.
            </Text>
            <Section className="mb-6 rounded bg-gray-50 p-4">
              <Text className="mb-2 font-bold text-gray-800">Your Message:</Text>
              <Text className="italic text-gray-700">"{message}"</Text>
            </Section>
            <Text className="mb-4 text-gray-700">
              If you have any urgent inquiries, please don't hesitate to call us at +1 (123) 456-7890.
            </Text>
            <Text className="mb-4 text-gray-700">
              In the meantime, you might want to explore our latest travel packages and destinations on our website.
            </Text>
            <Section className="mb-6 text-center">
              <Link
                href="https://rebelrover.com/destinations"
                className="inline-block rounded bg-primary px-6 py-3 text-center text-white no-underline"
              >
                Explore Destinations
              </Link>
            </Section>
            <Text className="text-gray-700">Thank you for choosing Rebel Rover for your travel needs.</Text>
            <Text className="text-gray-700">
              Best regards,
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


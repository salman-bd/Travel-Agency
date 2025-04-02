import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface WelcomeEmailProps {
  name: string
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Rebel Rover - Your adventure begins now!</Preview>
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
            <Heading className="mb-4 text-center text-2xl font-bold text-primary">Welcome to Rebel Rover!</Heading>
            <Text className="mb-4 text-gray-700">Hello {name},</Text>
            <Text className="mb-4 text-gray-700">
              Congratulations and welcome to the Rebel Rover family! We're thrilled to have you join our community of
              passionate travelers.
            </Text>
            <Text className="mb-4 text-gray-700">
              Your account has been successfully created and verified. You can now explore exotic destinations, book
              exciting travel packages, and create unforgettable memories with us.
            </Text>
            <Section className="mb-6 text-center">
              <Link
                href="https://rebelrover.com/destinations"
                className="inline-block rounded bg-primary px-6 py-3 text-center text-white no-underline"
              >
                Explore Destinations
              </Link>
            </Section>
            <Text className="mb-4 text-gray-700">Here are some things you can do with your new account:</Text>
            <ul className="mb-4 list-inside list-disc text-gray-700">
              <li>Browse our curated collection of destinations</li>
              <li>Book travel packages with exclusive member discounts</li>
              <li>Create and manage your travel itineraries</li>
              <li>Share your travel experiences with our community</li>
            </ul>
            <Text className="mb-4 text-gray-700">
              If you have any questions or need assistance, our customer support team is always ready to help.
            </Text>
            <Text className="text-gray-700">
              Happy travels!
              <br />
              The Rebel Rover Team
            </Text>
            <Hr className="my-6 border-gray-300" />
            <Text className="text-center text-xs text-gray-500">
              © {new Date().getFullYear()} Rebel Rover. All rights reserved.
              <br />
              123 Travel Street, City, Country
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}


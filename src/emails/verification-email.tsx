import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface VerificationEmailProps {
  name: string
  verificationCode: string
}

export const VerificationEmail = ({ name, verificationCode }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address for Traveller World</Preview>
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
            <Heading className="mb-4 text-center text-2xl font-bold text-primary">Verify Your Email Address</Heading>
            <Text className="mb-4 text-gray-700">Hello {name},</Text>
            <Text className="mb-4 text-gray-700">
              Thank you for signing up with Traveller World! To complete your registration, please enter the verification
              code below:
            </Text>
            <Section className="mb-6 text-center">
              <div className="inline-block rounded-lg bg-gray-100 px-6 py-4">
                <Text className="text-2xl font-bold tracking-wide text-primary">{verificationCode}</Text>
              </div>
            </Section>
            <Text className="mb-4 text-gray-700">
              This code will expire in 24 hours. If you did not sign up for a Traveller World account, please ignore this
              email.
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


import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface PasswordResetEmailProps {
  name: string
  resetUrl: string
}

export const PasswordResetEmail = ({ name, resetUrl }: PasswordResetEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your Rebel Rover password</Preview>
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
            <Heading className="mb-4 text-center text-2xl font-bold text-primary">Reset Your Password</Heading>
            <Text className="mb-4 text-gray-700">Hello {name},</Text>
            <Text className="mb-4 text-gray-700">
              We received a request to reset your password for your Rebel Rover account. If you didn't make this
              request, you can safely ignore this email.
            </Text>
            <Text className="mb-4 text-gray-700">To reset your password, click the button below:</Text>
            <Section className="mb-6 text-center">
              <Link
                href={resetUrl}
                className="inline-block rounded bg-primary px-6 py-3 text-center text-white no-underline"
              >
                Reset Password
              </Link>
            </Section>
            <Text className="mb-4 text-gray-700">
              This link will expire in 1 hour for security reasons. If you need to request a new password reset link,
              please visit our website.
            </Text>
            <Text className="mb-4 text-gray-700">
              If the button above doesn't work, you can also copy and paste the following URL into your browser:
            </Text>
            <Text className="mb-4 break-all rounded bg-gray-100 p-3 text-xs text-gray-700">{resetUrl}</Text>
            <Text className="text-gray-700">
              Best regards,
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


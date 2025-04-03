import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface BookingConfirmationEmailProps {
  customerName: string
  bookingId: string
  packageName: string
  destination: string
  startDate: string
  endDate: string
  totalPrice: string
  adults: number
  children: number
}

export const BookingConfirmationEmail = ({
  customerName,
  bookingId,
  packageName,
  destination,
  startDate,
  endDate,
  totalPrice,
  adults,
  children,
}: BookingConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Rebel Rover booking confirmation</Preview>
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
            <Heading className="mb-4 text-center text-2xl font-bold text-gray-800">Booking Confirmation</Heading>
            <Text className="mb-4 text-gray-700">Hello {customerName},</Text>
            <Text className="mb-4 text-gray-700">
              Thank you for booking with Traveller World! Your adventure to <strong>{destination}</strong> is confirmed.
              Below are your booking details:
            </Text>
            <Section className="mb-6 rounded bg-gray-50 p-4">
              <Text className="mb-2 font-bold text-gray-800">Booking Details:</Text>
              <Text className="mb-1 text-gray-700">
                <strong>Booking ID:</strong> {bookingId}
              </Text>
              <Text className="mb-1 text-gray-700">
                <strong>Package:</strong> {packageName}
              </Text>
              <Text className="mb-1 text-gray-700">
                <strong>Destination:</strong> {destination}
              </Text>
              <Text className="mb-1 text-gray-700">
                <strong>Travel Dates:</strong> {startDate} to {endDate}
              </Text>
              <Text className="mb-1 text-gray-700">
                <strong>Travelers:</strong> {adults} {adults === 1 ? "Adult" : "Adults"}
                {children > 0 && `, ${children} ${children === 1 ? "Child" : "Children"}`}
              </Text>
              <Text className="text-gray-700">
                <strong>Total Price:</strong> ${totalPrice}
              </Text>
            </Section>
            <Text className="mb-4 text-gray-700">
              You can view your booking details and itinerary by logging into your account on our website.
            </Text>
            <Section className="mb-6 text-center">
              <Link
                href="https://rebelrover.com/bookings"
                className="inline-block rounded bg-primary px-6 py-3 text-center text-white no-underline"
              >
                View My Booking
              </Link>
            </Section>
            <Text className="mb-4 text-gray-700">
              If you have any questions or need to make changes to your booking, please contact our customer service
              team at support@travellerworld.com or call us at +1 (123) 456-7890.
            </Text>
            <Text className="mb-4 text-gray-700">We're excited to help you create unforgettable memories!</Text>
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


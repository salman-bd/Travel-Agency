import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash("Admin123!", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@rebelrover.com" },
    update: {},
    create: {
      email: "admin@rebelrover.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  })

  console.log({ admin })

  // Create sample destinations
  const bali = await prisma.destination.upsert({
    where: { id: "clq1234567890" },
    update: {},
    create: {
      name: "Bali",
      country: "Indonesia",
      description:
        "Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Soak up the sun on a stretch of fine white sand, or commune with the tropical creatures as you dive along coral ridges or the colorful wreck of a WWII war ship.",
      price: 1199,
      rating: 4.8,
      category: "Beach",
      featured: true,
      imageUrl: "/placeholder.svg?height=500&width=800&text=Bali",
    },
  })

  const paris = await prisma.destination.upsert({
    where: { id: "clq2345678901" },
    update: {},
    create: {
      name: "Paris",
      country: "France",
      description:
        "Paris, the City of Light, is filled with thousands of hotels, museums, and restaurants. Visit the Eiffel Tower, the Louvre, Notre Dame, and the Arc de Triomphe, or take a boat cruise on the Seine.",
      price: 1299,
      rating: 4.7,
      category: "City",
      featured: false,
      imageUrl: "/placeholder.svg?height=500&width=800&text=Paris",
    },
  })

  // Create sample packages
  await prisma.package.create({
    data: {
      title: "Bali Adventure Package",
      description:
        "Experience the best of Bali with our adventure package. Visit temples, beaches, and rice terraces while enjoying luxury accommodations.",
      price: 1499,
      duration: 7,
      destinationId: bali.id,
      imageUrl: "/placeholder.svg?height=500&width=800&text=Bali+Adventure",
      inclusions: ["Airport transfers", "Accommodation", "Daily breakfast", "Guided tours", "Welcome dinner"],
      exclusions: ["International flights", "Travel insurance", "Personal expenses", "Optional activities"],
      itinerary: {
        create: [
          {
            day: 1,
            title: "Arrival in Bali",
            description:
              "Arrive at Ngurah Rai International Airport. Transfer to your hotel in Ubud. Welcome dinner and briefing about your tour.",
          },
          {
            day: 2,
            title: "Ubud Cultural Tour",
            description:
              "Visit the Monkey Forest, Ubud Palace, and local art galleries. Afternoon free for shopping or spa treatments.",
          },
          {
            day: 3,
            title: "Tegallalang Rice Terraces",
            description:
              "Morning visit to the famous Tegallalang Rice Terraces. Afternoon visit to a coffee plantation and Tirta Empul Temple.",
          },
          {
            day: 4,
            title: "Transfer to Seminyak",
            description:
              "Check out from your Ubud hotel and transfer to Seminyak. Afternoon free to explore the beach and surrounding area.",
          },
          {
            day: 5,
            title: "Uluwatu Temple and Kecak Dance",
            description:
              "Day at leisure. Evening visit to Uluwatu Temple to watch the sunset and traditional Kecak dance performance.",
          },
          {
            day: 6,
            title: "Nusa Penida Island Tour",
            description:
              "Full-day tour to Nusa Penida Island. Visit Kelingking Beach, Angel's Billabong, and Broken Beach.",
          },
          {
            day: 7,
            title: "Departure",
            description: "Free time until your airport transfer. Departure from Bali.",
          },
        ],
      },
    },
  })

  await prisma.package.create({
    data: {
      title: "Paris City Break",
      description:
        "Discover the romance and charm of Paris with our city break package. Visit iconic landmarks, enjoy French cuisine, and experience Parisian culture.",
      price: 1699,
      duration: 5,
      destinationId: paris.id,
      imageUrl: "/placeholder.svg?height=500&width=800&text=Paris+City+Break",
      inclusions: ["Airport transfers", "Accommodation", "Daily breakfast", "Paris Museum Pass", "Seine River cruise"],
      exclusions: ["International flights", "Travel insurance", "Personal expenses", "Optional activities"],
      itinerary: {
        create: [
          {
            day: 1,
            title: "Arrival in Paris",
            description:
              "Arrive at Charles de Gaulle Airport. Transfer to your hotel in central Paris. Evening orientation walk around your neighborhood.",
          },
          {
            day: 2,
            title: "Eiffel Tower and Seine River Cruise",
            description:
              "Morning visit to the Eiffel Tower. Afternoon at leisure. Evening Seine River cruise with dinner.",
          },
          {
            day: 3,
            title: "Louvre Museum and Montmartre",
            description:
              "Morning visit to the Louvre Museum. Afternoon exploring the artistic neighborhood of Montmartre and Sacré-Cœur Basilica.",
          },
          {
            day: 4,
            title: "Versailles Palace",
            description: "Full-day excursion to the Palace of Versailles. Evening free for shopping or dining.",
          },
          {
            day: 5,
            title: "Departure",
            description: "Free time until your airport transfer. Departure from Paris.",
          },
        ],
      },
    },
  })

  // Create sample blog
  await prisma.blog.create({
    data: {
      title: "Top 10 Things to Do in Bali",
      slug: "top-10-things-to-do-in-bali",
      content: `
        # Top 10 Things to Do in Bali

        Bali, the Island of the Gods, is a paradise for travelers seeking natural beauty, cultural experiences, and adventure. Here are the top 10 things you must do when visiting Bali:

        ## 1. Visit the Sacred Monkey Forest Sanctuary

        Located in Ubud, this natural reserve is home to over 700 monkeys and 186 species of trees. The forest has three temples dating back to the 14th century.

        ## 2. Explore the Tegallalang Rice Terraces

        These stunning terraced rice fields offer a picturesque view and insight into Bali's traditional irrigation system known as subak.

        ## 3. Watch the Sunset at Tanah Lot Temple

        Built on a rock formation in the sea, this temple is one of Bali's most iconic landmarks, especially during sunset.

        ## 4. Relax on Kuta Beach

        Known for its long stretch of white sand, Kuta Beach is perfect for sunbathing, surfing, or simply enjoying the vibrant atmosphere.

        ## 5. Climb Mount Batur

        For adventure seekers, a sunrise trek up Mount Batur offers breathtaking views of the surrounding landscape and Lake Batur.

        ## 6. Visit the Ubud Art Market

        Shop for handmade crafts, textiles, and souvenirs at this traditional market in the heart of Ubud.

        ## 7. Experience a Traditional Balinese Dance Performance

        Witness the grace and beauty of Balinese culture through traditional dance performances like the Legong or Kecak Fire Dance.

        ## 8. Explore the Uluwatu Temple

        Perched on a cliff 70 meters above the sea, this temple offers stunning ocean views and is home to mischievous monkeys.

        ## 9. Snorkel or Dive in Amed

        Discover Bali's underwater world with colorful coral reefs and diverse marine life in the clear waters of Amed.

        ## 10. Indulge in Balinese Cuisine

        Try local dishes like Babi Guling (suckling pig), Nasi Campur (mixed rice), and fresh seafood at beachside warungs.

        Bali offers something for everyone, whether you're seeking relaxation, adventure, culture, or culinary delights. Plan your trip to include these experiences for an unforgettable Balinese adventure!
      `,
      excerpt:
        "Discover the must-do activities in Bali, from exploring ancient temples to relaxing on pristine beaches and experiencing local culture.",
      imageUrl: "/placeholder.svg?height=500&width=800&text=Bali+Blog",
      published: true,
      authorId: admin.id,
      category: "Travel Tips",
    },
  })

  console.log("Database seeded successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


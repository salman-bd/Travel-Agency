import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function TravelStoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-[url('/bg/travel-concept3.png?height=500&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Travel Stories For Now and the Future</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="relative mb-6 h-[400px] w-full overflow-hidden rounded-lg">
                  <Image
                    src="/travelling-1.jpg?height=600&width=800"
                    alt="traveling"
                    fill
                    className="object-cover"
                  />
                </div>

                <h1 className="mb-4 text-3xl font-bold">Rice Terraces, Tegallalang</h1>

                <div className="mb-6 text-gray-700">
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>

                  <h2 className="mb-4 text-2xl font-bold">Rice Terraces, Tegallalang</h2>

                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                  </p>

                  <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="relative h-[300px] overflow-hidden rounded-lg">
                      <Image
                        src="/travelling2.jpg?height=400&width=600"
                        alt="Travelers with backpacks"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-[300px] overflow-hidden rounded-lg">
                      <Image
                        src="/traveller2.jpg?height=400&width=600"
                        alt="Travelers with backpacks"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Tags: </span>
                    <Link href="/destinations" className="text-sm hover:underline">
                      Destintion,
                    </Link>
                    <Link href="/travel" className="text-sm hover:underline">
                      Travel
                    </Link>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Share This: </span>
                    <Link href="#" className="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <Link href="#" className="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <Link href="#" className="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 9H2V21H6V9Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="mb-8 rounded-lg bg-white p-6 shadow">
                <h3 className="mb-6 text-xl font-bold">Recent Post</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <Image
                        src="/gallery/paris.png?height=80&width=80"
                        alt="Recent post"
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="font-medium hover:text-primary">
                          <Link href="#">Travel Stories for Now and the Future</Link>
                        </h4>
                        <p className="text-xs text-gray-500">14 Dec 2022</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 rounded-lg bg-white p-6 shadow">
                <h3 className="mb-6 text-xl font-bold">Catagories</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="#" className="flex items-center gap-2 hover:text-primary">
                      <ChevronRight className="h-4 w-4" />
                      <span>Travel</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center gap-2 hover:text-primary">
                      <ChevronRight className="h-4 w-4" />
                      <span>Tips</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center gap-2 hover:text-primary">
                      <ChevronRight className="h-4 w-4" />
                      <span>Stories</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center gap-2 hover:text-primary">
                      <ChevronRight className="h-4 w-4" />
                      <span>Destination</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-black p-6 text-white">
                <h3 className="mb-4 text-xl font-bold">Have Any Question?</h3>
                <p className="mb-4 text-sm">
                  Do not hesitate to give us a call. We are an expert team and we are happy to talk to you.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>+62 6943 6956</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6L12 13L2 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>contact@domain.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}


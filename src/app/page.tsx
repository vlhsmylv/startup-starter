export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welcome to Your Startup Template
      </h1>
      <p className="text-center text-lg mb-8">
        You&apos;ve successfully cloned the Next.js starter template with Prisma,
        TypeScript, and NextAuth.
      </p>
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
        <p className="mb-4">
          To get started, install dependencies and run the development server:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md mb-6">
          <code>
            npm install --legacy-peer-deps <br />
            npm run dev
          </code>
        </pre>
        <p className="mb-6">
          Visit the following resources for more details on how to configure
          each part:
        </p>
        <ul className="text-blue-500">
          <li>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js Documentation
            </a>
          </li>
          <li>
            <a
              href="https://www.prisma.io/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prisma Documentation
            </a>
          </li>
          <li>
            <a
              href="https://authjs.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Auth.js (NextAuth) Documentation
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

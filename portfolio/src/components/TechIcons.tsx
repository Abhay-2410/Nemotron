import type { ComponentType } from 'react'

const iconBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

export const techIconMap: Record<string, string> = {
  React: `${iconBase}/react/react-original.svg`,
  'Node.js': `${iconBase}/nodejs/nodejs-original.svg`,
  TypeScript: `${iconBase}/typescript/typescript-original.svg`,
  FastAPI: `${iconBase}/fastapi/fastapi-original.svg`,
  MongoDB: `${iconBase}/mongodb/mongodb-original.svg`,
  HTML5: `${iconBase}/html5/html5-original.svg`,
  CSS3: `${iconBase}/css3/css3-original.svg`,
  JavaScript: `${iconBase}/javascript/javascript-original.svg`,
  'Express.js': `${iconBase}/express/express-original.svg`,
  MySQL: `${iconBase}/mysql/mysql-original.svg`,
  Git: `${iconBase}/git/git-original.svg`,
  GitHub: `${iconBase}/github/github-original.svg`,
  Supabase: `${iconBase}/supabase/supabase-original.svg`,
  Vercel: `${iconBase}/vercel/vercel-original.svg`,
  Redux: `${iconBase}/redux/redux-original.svg`,
  TailwindCSS: `${iconBase}/tailwindcss/tailwindcss-original.svg`,
  Nextjs: `${iconBase}/nextjs/nextjs-original.svg`,
  Java: `${iconBase}/java/java-original.svg`,
  Python: `${iconBase}/python/python-original.svg`,
  Vite: `${iconBase}/vitejs/vitejs-original.svg`,
  PostgreSQL: `${iconBase}/postgresql/postgresql-original.svg`,
  Redis: `${iconBase}/redis/redis-original.svg`,
  Docker: `${iconBase}/docker/docker-original.svg`,
  'GitHub Actions': `${iconBase}/githubactions/githubactions-original.svg`,
  Twilio: `${iconBase}/twilio/twilio-original.svg`,
  AWS: `${iconBase}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  'Google Cloud': `${iconBase}/googlecloud/googlecloud-original.svg`,
  Qdrant: 'https://cdn.simpleicons.org/qdrant/DC244C',
  Stellar: 'https://cdn.simpleicons.org/stellar/7D00FF',
}

/** Icons that are black on transparent and need invert on the dark UI. */
const invertIcons = new Set(['Express.js', 'Vercel', 'GitHub'])

function RestApiIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" stroke="#22c55e" strokeWidth="2" />
      <text
        x="24"
        y="29"
        textAnchor="middle"
        fill="#22c55e"
        fontSize="14"
        fontFamily="monospace"
        fontWeight="600"
      >
        {'{ }'}
      </text>
    </svg>
  )
}

function OAuthIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="2" />
      <circle cx="24" cy="20" r="6" stroke="#f97316" strokeWidth="2" />
      <path
        d="M14 34c2.5-5 6-7 10-7s7.5 2 10 7"
        stroke="#f97316"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TableauIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="14" height="14" rx="2" fill="#E8762D" />
      <rect x="26" y="8" width="14" height="14" rx="2" fill="#1F77B4" />
      <rect x="8" y="26" width="14" height="14" rx="2" fill="#59A14F" />
      <rect x="26" y="26" width="14" height="14" rx="2" fill="#4E79A7" />
    </svg>
  )
}

function PowerBIIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="10" y="28" width="6" height="12" rx="1" fill="#F2C811" />
      <rect x="21" y="18" width="6" height="22" rx="1" fill="#F2C811" />
      <rect x="32" y="10" width="6" height="30" rx="1" fill="#F2C811" />
    </svg>
  )
}

function SqlIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="6" y="8" width="36" height="32" rx="6" fill="#336791" fillOpacity="0.2" stroke="#336791" strokeWidth="2" />
      <text
        x="24"
        y="29"
        textAnchor="middle"
        fill="#7eb6d8"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
      >
        SQL
      </text>
    </svg>
  )
}

function LlmIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" stroke="#a78bfa" strokeWidth="2" />
      <path
        d="M16 30c2-6 5.5-10 8-10s6 4 8 10"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="18" cy="20" r="2" fill="#a78bfa" />
      <circle cx="24" cy="16" r="2" fill="#c4b5fd" />
      <circle cx="30" cy="20" r="2" fill="#a78bfa" />
    </svg>
  )
}

function RagIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="10" width="14" height="18" rx="2" stroke="#38bdf8" strokeWidth="2" />
      <path d="M11 16h8M11 21h8M11 26h5" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 18h10l4 6-4 6H26V18z" stroke="#38bdf8" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="33" cy="24" r="2" fill="#38bdf8" />
    </svg>
  )
}

function MultiAgentIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="16" cy="18" r="5" stroke="#34d399" strokeWidth="2" />
      <circle cx="32" cy="18" r="5" stroke="#34d399" strokeWidth="2" />
      <circle cx="24" cy="32" r="5" stroke="#34d399" strokeWidth="2" />
      <path d="M20 20l4 8M28 20l-4 8M21 18h6" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function EmbeddingsIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M10 34L18 14l8 20" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 26h8" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="16" r="3" fill="#f472b6" />
      <circle cx="38" cy="28" r="2.5" fill="#f9a8d4" />
      <circle cx="30" cy="34" r="2" fill="#f472b6" />
      <path d="M34 19v6M36.5 26.5l-4 5" stroke="#f9a8d4" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function EnkryptIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 8l14 6v10c0 9-6 16-14 18-8-2-14-9-14-18V14l14-6z"
        stroke="#22d3ee"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="18" y="20" width="12" height="10" rx="2" stroke="#22d3ee" strokeWidth="2" />
      <path d="M21 20v-3a3 3 0 016 0v3" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function WebScrapingIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="14" stroke="#94a3b8" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="6" ry="14" stroke="#94a3b8" strokeWidth="2" />
      <path d="M10 24h28M24 10c4 4 6 9 6 14s-2 10-6 14M24 10c-4 4-6 9-6 14s2 10 6 14" stroke="#94a3b8" strokeWidth="1.5" />
      <path d="M30 34l6 6M36 34l-6 6" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const customIcons: Record<string, ComponentType<{ className?: string }>> = {
  'REST APIs': RestApiIcon,
  'OAuth 2.0': OAuthIcon,
  OAuth: OAuthIcon,
  Tableau: TableauIcon,
  'Power BI': PowerBIIcon,
  SQL: SqlIcon,
  'LLM Applications': LlmIcon,
  RAG: RagIcon,
  'Multi-Agent Systems': MultiAgentIcon,
  Embeddings: EmbeddingsIcon,
  'Enkrypt AI': EnkryptIcon,
  'Web Scraping': WebScrapingIcon,
}

export function TechIcon({
  name,
  className = 'h-6 w-6',
}: {
  name: string
  className?: string
}) {
  const Custom = customIcons[name]
  if (Custom) return <Custom className={className} />

  const src = techIconMap[name]

  if (!src) {
    return (
      <span
        className={`inline-flex items-center justify-center text-xs font-bold text-muted ${className}`}
      >
        {name.charAt(0)}
      </span>
    )
  }

  const invert = invertIcons.has(name) ? ' brightness-0 invert' : ''

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`object-contain${invert} ${className}`}
      loading="lazy"
    />
  )
}

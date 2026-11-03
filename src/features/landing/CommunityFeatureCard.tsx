import { Link } from 'react-router-dom'
import { ArrowIcon } from './icons'

type IllustrationName =
  | 'recommendations'
  | 'chat'
  | 'library'
  | 'groups'
  | 'challenges'
  | 'assistant'

type CommunityService = {
  illustration: IllustrationName
  title: string
  description: string
  ai?: boolean
}

function FeatureIllustration({ name }: { name: IllustrationName }) {
  return (
    <svg className="community-illustration" viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="70" r="64" fill="#fff1e8" />
      <circle cx="70" cy="70" r="54" fill="#fffaf5" />
      <path d="M25 92c11 9 23 10 34 8" fill="none" stroke="#f4d6c6" strokeWidth="2" />
      <path d="M103 35c4 3 7 7 9 12" fill="none" stroke="#f4d6c6" strokeWidth="2" />
      {name === 'recommendations' && (
        <>
          <path d="M36 58c12-4 23-1 34 7v36c-10-7-22-10-34-6V58Z" fill="#f3c9b4" stroke="#790d32" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M104 58c-12-4-23-1-34 7v36c10-7 22-10 34-6V58Z" fill="#ffe2cf" stroke="#790d32" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M70 65v36M45 68c5 0 9 1 13 3m37-3c-5 0-9 1-13 3" fill="none" stroke="#b65d58" strokeWidth="2" strokeLinecap="round" />
          <path d="m43 38 3-7m24 3v-8m23 12 5-6" fill="none" stroke="#f28a78" strokeWidth="3" strokeLinecap="round" />
          <path d="m50 50-5-4m43 4 5-4" fill="none" stroke="#f28a78" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      {name === 'chat' && (
        <>
          <path d="M34 43h48a12 12 0 0 1 12 12v18a12 12 0 0 1-12 12H58L44 96v-11h-10a12 12 0 0 1-12-12V55a12 12 0 0 1 12-12Z" fill="#ffe2cf" stroke="#790d32" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M65 70h38a11 11 0 0 1 11 11v13a11 11 0 0 1-11 11h-6v9L85 105H65a11 11 0 0 1-11-11v-3" fill="#f3c9b4" stroke="#790d32" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="41" cy="65" r="3" fill="#b65d58" /><circle cx="56" cy="65" r="3" fill="#b65d58" /><circle cx="71" cy="65" r="3" fill="#b65d58" />
          <path d="M73 87h3m12 0h3" stroke="#b65d58" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {name === 'library' && (
        <>
          <path d="m31 87 49-13 7 26-49 13-7-26Z" fill="#f3c9b4" stroke="#790d32" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="m41 63 48-15 8 25-49 15-7-25Z" fill="#ffe2cf" stroke="#790d32" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="m49 48 41 13m-40 16 39-12m-47 34 40-11" fill="none" stroke="#b65d58" strokeWidth="2" strokeLinecap="round" />
          <path d="m54 45 4-10 47 17-4 10" fill="#ffd7c3" stroke="#790d32" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="m67 47 3-8" stroke="#b65d58" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {name === 'groups' && (
        <>
          <circle cx="48" cy="53" r="9" fill="#f3c9b4" stroke="#790d32" strokeWidth="2.2" />
          <circle cx="92" cy="53" r="9" fill="#ffe2cf" stroke="#790d32" strokeWidth="2.2" />
          <path d="M30 82c1-12 8-19 18-19s17 7 18 19" fill="#f3c9b4" stroke="#790d32" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M76 82c1-12 7-19 16-19 10 0 17 7 18 19" fill="#ffe2cf" stroke="#790d32" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="70" cy="62" r="10" fill="#f7d8bd" stroke="#790d32" strokeWidth="2.2" />
          <path d="M55 92c1-12 6-20 15-20s14 8 15 20" fill="#e8b1a0" stroke="#790d32" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M47 98c8-4 15-4 23 0 8-4 15-4 23 0v12c-8-4-15-4-23 0-8-4-15-4-23 0V98Z" fill="#fffaf5" stroke="#790d32" strokeWidth="2" strokeLinejoin="round" />
          <path d="M70 99v11" stroke="#b65d58" strokeWidth="2" />
        </>
      )}
      {name === 'challenges' && (
        <>
          <rect x="34" y="39" width="72" height="67" rx="10" fill="#fffaf5" stroke="#790d32" strokeWidth="2.5" />
          <path d="M34 58h72" stroke="#790d32" strokeWidth="2.5" />
          <path d="M49 34v12m42-12v12" stroke="#f28a78" strokeWidth="4" strokeLinecap="round" />
          <path d="m47 75 7 7 13-14" fill="none" stroke="#b65d58" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M75 74h18m-18 12h18" stroke="#f1cbb8" strokeWidth="3" strokeLinecap="round" />
          <path d="M49 96c6-3 12-2 18 2v13c-6-4-12-5-18-2V96Zm18 2c6-4 12-5 18-2v13c-6-3-12-2-18 2V98Z" fill="#f3c9b4" stroke="#790d32" strokeWidth="2" strokeLinejoin="round" />
        </>
      )}
      {name === 'assistant' && (
        <>
          <path d="M46 76c0-14 10-25 24-25s24 11 24 25v10H46V76Z" fill="#f3c9b4" stroke="#790d32" strokeWidth="2.5" />
          <circle cx="70" cy="45" r="16" fill="#ffe2cf" stroke="#790d32" strokeWidth="2.5" />
          <path d="M64 46h.1m11.8 0h.1" stroke="#790d32" strokeWidth="4" strokeLinecap="round" />
          <path d="M65 53c3 2 7 2 10 0" fill="none" stroke="#b65d58" strokeWidth="2" strokeLinecap="round" />
          <path d="M70 27v-6m-20 13-5-4m50 4 5-4" stroke="#f28a78" strokeWidth="2.5" strokeLinecap="round" />
          <path d="m43 94 27-9 27 9v14l-27-9-27 9V94Z" fill="#fffaf5" stroke="#790d32" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M70 85v14" stroke="#b65d58" strokeWidth="2" />
          <path d="m102 46 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#f28a78" />
        </>
      )}
    </svg>
  )
}

function CommunityFeatureCard({ service }: { service: CommunityService }) {
  return (
    <Link
      className="community-feature-card"
      to="/inscription"
      aria-label={`${service.title} : rejoindre la communauté`}
    >
      <FeatureIllustration name={service.illustration} />
      <div className="community-feature-copy">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        {service.ai && <span className="community-ai-label">Assistant IA, toujours à ton service</span>}
      </div>
      <span className="community-card-arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
    </Link>
  )
}

export default CommunityFeatureCard

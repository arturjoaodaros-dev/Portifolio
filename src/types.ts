import type { LucideIcon } from 'lucide-react'

/** Nível de contato com uma tecnologia. Só descreve o que é verdadeiro hoje. */
export type Level = 'studying' | 'exploring' | 'used'

export type CertificateTrack = 'python' | 'dados-apis' | 'claude'

export interface CertificateImage {
  width: number
  height: number
  thumbWidth: number
  thumbHeight: number
}

export interface Certificate {
  /** Nome do arquivo em public/certificates/ (sem extensão) */
  id: string
  title: string
  issuer: 'DIO' | 'Claude Academy'
  track: CertificateTrack
  /** AAAA-MM-DD, exatamente como impresso no certificado */
  date: string
  hours?: number
  /** Ausente quando o site não exibe a imagem do certificado */
  image?: CertificateImage
}

/** Certificado que o site exibe com imagem */
export type ImagedCertificate = Certificate & { image: CertificateImage }

export type TechIconSource =
  | { type: 'brand'; path: string }
  | { type: 'lucide'; Icon: LucideIcon }

export interface Technology {
  name: string
  group: 'principal' | 'explorada'
  level: Level
  note: string
  icon: TechIconSource
}

export interface FocusItem {
  name: string
  stage: 'studying' | 'exploring'
  summary: string
  evidence: string
}

export interface TimelineStage {
  title: string
  description: string
  /** Certificados que sustentam a etapa; datas e contagem saem deles */
  certificateIds?: string[]
  status?: 'current' | 'parallel'
}

export type ProjectStatus = 'em-desenvolvimento' | 'concluido' | 'experimento'

export interface Project {
  id: string
  name: string
  summary: string
  context?: string
  stack: string[]
  status: ProjectStatus
  category: 'unity' | 'backend' | 'ia' | 'web' | 'outro'
  image?: { src: string; alt: string; width: number; height: number }
  repository?: string
  demo?: string
}

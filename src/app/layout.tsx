import type { Metadata } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { CONTAINER_CLASS } from '@/components/ui-classes';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Lucas Maciel | Full-Stack Engineer & Applied AI Researcher',
  description:
    'Portfolio of Lucas Maciel, Full-Stack Engineer at Projeto CIn/Motorola and MSc student in Computational Intelligence at Universidade de Pernambuco.',
  openGraph: {
    title: 'Lucas Maciel | Full-Stack Engineer & Applied AI Researcher',
    description:
      'Production AI systems, Google ADK agents, BigQuery and Vertex AI pipelines, web performance engineering, and 2026 research publications.',
    type: 'website',
  },
};

const THEME_INIT_SCRIPT = `(function () {
  var theme = 'light';
  try {
    var saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') {
      theme = saved;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
  } catch (err) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
  }
  document.documentElement.dataset.theme = theme;
})();`;

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a
          className="absolute top-3 -left-[9999px] z-[100] rounded-sm bg-accent px-4 py-2 font-semibold text-white focus:left-4"
          href="#main-content"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className={`${CONTAINER_CLASS} pt-12 pb-18`}>
          {children}
        </main>
        <footer className="border-t border-border pt-6 pb-8 text-sm text-text-muted">
          <div className={`${CONTAINER_CLASS} flex flex-wrap justify-between gap-3`}>
            <span>Lucas Maciel · Recife, PE, Brazil</span>
            <span>Built with Next.js, React, and TypeScript</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

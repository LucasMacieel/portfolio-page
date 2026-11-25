export const CONTAINER_CLASS = 'mx-auto w-[min(100%-2rem,1120px)]';

export const SECTION_CLASS = 'border-t border-border py-8';

export const SECTION_HEADER_CLASS = 'mb-6 flex flex-wrap items-end justify-between gap-4';

export const SECTION_TITLE_CLASS = 'text-[clamp(1.45rem,2.4vw,1.85rem)] font-bold tracking-[-0.025em]';

export const SECTION_SUBTITLE_CLASS = 'mt-1 text-[0.9375rem] text-text-muted';

const BUTTON_BASE =
  'inline-flex cursor-pointer items-center gap-[0.45rem] rounded-sm border px-4 py-[0.62rem] text-[0.9375rem] font-semibold transition-[background-color,border-color,color] duration-[140ms] ease-in-out';

export const BUTTON_CLASSES = {
  primary: `${BUTTON_BASE} border-transparent bg-accent text-white hover:bg-accent-hover dark:text-[#08111e]`,
  secondary: `${BUTTON_BASE} border-border bg-surface hover:border-border-strong hover:bg-surface-subtle`,
  ghost: `${BUTTON_BASE} border-border bg-transparent text-text-muted hover:border-border-strong hover:bg-surface-subtle hover:text-text`,
} as const;

export const CARD_CLASS =
  'flex flex-col rounded-md border border-border bg-surface p-6 shadow-sm transition-[border-color,box-shadow] duration-150 ease-in-out';

export const INTERACTIVE_CARD_CLASS = `${CARD_CLASS} hover:border-border-strong hover:shadow-md`;

export const CARD_META_CLASS = 'mb-3 flex flex-wrap items-center justify-between gap-2';

export const CARD_TITLE_CLASS = 'text-[1.125rem] leading-[1.3] font-bold tracking-[-0.015em]';

export const CARD_SUMMARY_CLASS = 'mt-3 text-[0.9375rem] text-text-muted';

const BADGE_BASE = 'inline-block rounded-sm px-[0.55rem] py-[0.2rem] font-mono text-xs font-semibold';

export const BADGE_CLASS = `${BADGE_BASE} bg-surface-subtle text-text`;

export const BADGE_ACCENT_CLASS = `${BADGE_BASE} bg-accent-soft text-accent`;

export const META_TEXT_CLASS = 'font-mono text-xs text-text-muted';

const TAG_LIST_BASE = 'mt-auto flex flex-wrap gap-[0.4rem]';

export const TAG_LIST_CLASS = `${TAG_LIST_BASE} pt-4`;

export const STACK_TAG_LIST_CLASS = `${TAG_LIST_BASE} pt-2`;

export const TAG_CLASS =
  'rounded-sm border border-border bg-surface-subtle px-[0.55rem] py-[0.22rem] font-mono text-xs text-text-muted';

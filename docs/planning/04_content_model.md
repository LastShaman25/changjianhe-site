# Content Model

## UI copy
Stored in:
- `src/messages/en.json`
- `src/messages/zh.json`

Used for:
- nav labels
- button labels
- short hero lines
- reusable section labels

## MDX content
Stored in:
- `src/content/en/**/*.mdx`
- `src/content/zh/**/*.mdx`

Used for:
- About page body
- Project page body
- Research overview
- Accomplishments overview

## Typed data
Stored in:
- `src/data/projects.ts`
- `src/data/nav.ts`
- `src/data/timeline.ts` later if needed

Used for:
- project cards
- route metadata
- featured selections
- structured summaries

## Rendering model
- route pages should import typed data for summary/index pages
- route pages should load MDX for long-form body content
- future animation layers should be added around the content structure, not mixed into raw content files
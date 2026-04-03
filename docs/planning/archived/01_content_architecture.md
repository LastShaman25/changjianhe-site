# Content Architecture

## Goal
Create a bilingual content architecture for a cinematic personal website for Changjian “CJ” He.

## Principles
- UI microcopy belongs in `src/messages/*.json`
- Long-form content belongs in `src/content/**/*.mdx`
- Typed indexes and shared metadata belong in `src/data/*.ts`
- Codex task instructions belong in `docs/planning/*.md`

## Locale model
Supported locales:
- en
- zh

## Content areas
- site/about
- projects
- research
- accomplishments

## Project content model
Each project should have:
- title
- slug
- summary
- featured flag
- hero statement
- long-form narrative
- optional sections for visuals, diagrams, metrics, and next steps

## Current flagship projects
- Elementization Infrastructure
- Agnostic Membership Inference Attack on Two-Tower Neural Networks for Recommendation Systems
- AI Learning Assistant

## Constraints
- bilingual
- mobile-friendly
- Vercel-ready
- premium visual tone
- content should support future cinematic scroll storytelling
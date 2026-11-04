# Orbit · Report workshop

- This workshop has one React/TypeScript project. Read docs/report-brief.md before editing.
- Discuss the design and scope before implementation. Build inside web/src/components/ReportBuilder.tsx and dedicated helpers/styles/tests; keep the operations prop as source.
- Extend the existing Orbit app with the Reporte ejecutivo view in its current navigation. Preserve the Orbit shell and visual identity; do not scaffold another app or replace the dashboard.
- This is the same mariotavarez/claude-bienestar repository as module 1. Work on the module-2 continuation; preserve learners' earlier commits and local changes. modulo-2-solucion is the completed reference, not the workshop starting point.
- Preserve API, existing dashboard/filter behavior and fixtures. No new dependencies or external AI API are required.
- All calculations use integer cents; format pesos only at presentation/export boundaries. Do not mutate inputs.
- Implement scope selection, metrics, segment bars, deterministic summary, clipboard feedback and CSV export. Support empty data, keyboard and 390px viewports.
- Add meaningful report tests, run npm test and npm run typecheck. Never remove assertions or modify expected fixtures to hide failures.
- Explain changed files, checks actually run, manual checks pending and limitations. Keep notes in docs/report-brief.md. Never include secrets or personal data.

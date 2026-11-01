# Bienestar · Módulo 2

- Read the selected route, docs/acceptance.md, and the tests before editing.
- Explain the plan and wait for permission before changing code.
- Code, function names, scripts, and test descriptions use English. README and explanations use Spanish.
- Preserve fixtures and passing baseline tests. Never remove an assertion to obtain a green result.
- Web route: edit only web/src/selection.ts and the UI integration when explicitly required. Keep segment and status as independent conditions joined with AND. Keep amounts in integer cents. Do not mutate input.
- Data route: edit data/pipeline.py. Do not guess null amounts. Drop only identical normalized duplicates. Quarantine every occurrence of a conflicting ID. Preserve counts and source indexes for reconciliation.
- No network integrations, secrets, production data, MCP installation, or new packages are required for this lab.
- The selected route is the required workshop. The second route is optional. Report checks you ran, failures that remain and files changed.

# Misión Expo

Construir Personal y cobertura con Claude Code, los agentes leo-data y ana-ui y la skill /expo-team.

- Lee docs/brief.md y docs/plan.md antes de implementar. Pide aprobación del plan.
- Cada agente lee sus reglas en .claude/rules/ y su referencia en docs/references/. Ana consulta DESIGN.md y Leo consulta CONTRACT.md.
- Leo implementa el registro, la llegada y la proyección del padrón en operations.js.
- Ana implementa formulario lateral, lista y cobertura en index.html, expo.js y expo.css. Usa el contrato que entrega Leo.
- Delega primero a Leo y espera su resultado antes de encargar la interfaz a Ana.
- Conserva incidentes, Acreditaciones y CSV. Usa datos ficticios y mantén las conexiones fuera de prompts y archivos.
- Anota en docs/activity-log.md solo lo comprobado. El usuario verifica el navegador y decide si acepta el resultado.

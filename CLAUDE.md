# Misión Expo · taller de dos horas

El encargo y criterios ya están en docs/task.md; el orden, en docs/plan.md.
La única regla está preparada en .claude/rules/project.md. Conserva DESIGN.md
y CONTRACT.md y la app sin dependencias.

En clase solo creamos .claude/agents/leo-data.md, ana-ui.md y
.claude/skills/expo-team/SKILL.md. No crees documentos, agentes o carpetas extra.
Al crear esas definiciones, no implementes aún la app.

Cuando el usuario pida construir Personal y cobertura, utiliza expo-team para
coordinar a Leo (datos) y Ana (interfaz). Espera el contrato de Leo antes de
encargar la pantalla. La sesión principal revisa y el usuario prueba la app.
La selección automática se guía por las descriptions y el contexto. Si no se
activa la skill, indica la llamada directa /expo-team. No simules delegaciones.

Sonnet es la propuesta para implementar; comprueba disponibilidad. Si falta,
usa inherit con el modelo principal confirmado. Conexión y Sheets los prepara
el mentor. No guardes datos privados ni declares pruebas que no observaste.

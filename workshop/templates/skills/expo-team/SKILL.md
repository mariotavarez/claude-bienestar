# Taller · crea la skill expo-team

Esta hoja no es una skill activa. Durante el paso 5 crea
.claude/skills/expo-team/SKILL.md y su carpeta references/ con Claude.

## Resultado
Una receta manual que coordina Leo → Ana → Eva → pruebas del grupo.

## Decisiones que debes revisar con el grupo
1. Requisitos antes de empezar: encargo, plan aprobado, reglas y agentes.
2. Qué contrato entrega Leo y qué recibirá Ana.
3. Qué revisa Eva y qué pruebas solo puede confirmar el usuario.
4. Qué hacer si un agente encuentra un conflicto o necesita ampliar el alcance.
5. Qué hechos quedarán documentados en docs/activity-log.md.

## Estructura que pedirás a Claude
- YAML: name expo-team, description y disable-model-invocation true.
- Objetivo, requisitos, fases, recuperación y formato de cierre.
- references/handoff.md con el formato de encargos y entregas.
- references/acceptance.md con pruebas cortas de navegador.

## Comprueba el diseño de la receta
La skill corre en la sesión principal. No uses context: fork para esta
coordinación. Espera el contrato de Leo antes de encargar la interfaz a Ana.
Eva tiene herramientas de lectura; separa sus hallazgos de pruebas ejecutadas.

## Activación
Revisa la propuesta, autoriza guardarla, abre una sesión nueva y ejecuta
/expo-team. Observa qué agente recibe cada encargo y qué devuelve.

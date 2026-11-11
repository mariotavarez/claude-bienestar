# Taller · crea leo-data

Esta hoja es material de trabajo. Claude la usará para crear el archivo activo
.claude/agents/leo-data.md durante el paso 4. Revisa su propuesta antes de guardarla.

## Decisiones ya acordadas
- Responsabilidad: datos y operaciones de Personal y cobertura.
- Modelo propuesto: sonnet. Revisa disponibilidad con /model y /agents.
- Encargo y plan: docs/brief.md y docs/plan.md.
- Contrato de eventos: CONTRACT.md. Diseño: DESIGN.md.
- Conservar incidentes, acreditaciones y CSV. Sin nuevas dependencias.

## Construye las instrucciones con Claude
Pide YAML con name, description, tools y model. La descripción debe explicar
cuándo delegar a este agente. Después pide estas secciones con contenido real.
1. Misión y resultado observable.
2. Documentos que leerá y por qué los necesita.
3. Archivos que puede editar y límites del encargo.
4. Contratos, procedimiento y criterios de calidad.
5. Ejemplos de entrada, salida y error.
6. Formato de entrega y qué hacer si falta información.

## Completa estas decisiones en voz alta
- ¿Qué archivo necesita leer primero y qué decisión no debe inventar?
- ¿Qué evidencia recibirá y qué tendrá que probar el grupo?
- ¿A quién devolverá un problema que queda fuera de su encargo?

## Antes de guardar
Comprueba que los nombres coincidan con los prompts del aula, que los archivos
existan y que el modelo esté disponible. Para Eva, usa solo Read, Grep y Glob.
Para Leo y Ana, añade Edit y Write. El alcance escrito no impide técnicamente
editar otros archivos. Revisa la propuesta y autoriza guardar el archivo.

## Así sabes que quedó
Abre /agents y selecciona leo-data. Comprueba su modelo y herramientas. Si no
aparece, vuelve a abrir Claude en esta carpeta. Conserva esta hoja como referencia.

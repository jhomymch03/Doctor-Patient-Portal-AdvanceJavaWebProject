# Registro de ejecución y evidencias

## Ambiente

Esta es la ejecución automática realizada en el equipo local. Completar los nombres del grupo y la evidencia manual antes de entregar. No confundir la ejecución automática del script con la revisión manual de cada caso.

## Colaboración del grupo por completar

| Campo | Valor |
| --- | --- |
| URL del fork común | Pendiente |
| Scrum Master | Persona 1 — nombre por completar |
| Integrador elegido | Pendiente |
| PR Persona 1 — `qa/plan-smoke` | Pendiente |
| PR Persona 2 — `qa/admin-catalogo` | Pendiente |
| PR Persona 3 — `qa/pacientes` | Pendiente |
| PR Persona 4 — `qa/citas-doctor` | Pendiente |

Los resultados automáticos siguientes corresponden al material base local, **antes** de los aportes por rama. Tras integrar los cuatro PR, ejecutar la suite de nuevo y agregar un nuevo registro con commit, fecha y resultado; no reutilizar esta salida como prueba de los cambios posteriores.

| Campo | Valor |
| --- | --- |
| Fecha/hora | 18 de octubre de 2026, aproximadamente 18:05 (America/La_Paz) |
| Responsable del run | Codex, verificación técnica previa; el equipo debe firmar su propia ejecución |
| Commit o versión | Base `17c2958` más carpeta `entrega-qa/` sin commit |
| URL | `http://127.0.0.1:8080/Doctor-Patient-Portal/` |
| Chrome/Cypress | Chrome 155 headless / Cypress 16.1.1 |
| MySQL/Tomcat | MySQL 8 local en Docker / Tomcat 9.0.123 portátil |
| Comando | `npm run cy:smoke`; `npm run cy:full` |

## Resultado automático observado

| Ejecución | Tests aprobados | Fallidos | Pendientes | Duración | Evidencia |
| --- | ---: | ---: | ---: | --- | --- |
| Smoke final | 4 | 0 | 2 omitidos intencionalmente | 3 s | Salida de Cypress de esta ejecución |
| Suite completa final | 6 | 0 | 0 | 10 s | Salida de Cypress de esta ejecución |

En la suite completa, TC-01 a TC-04 y TC-06 son tests independientes. TC-05, TC-07, TC-08, TC-09 y TC-10 comparten un único test secuencial; sus aserciones se ejecutaron dentro de ese flujo. El runner no generó capturas de fallo. La matriz siguiente está reservada para la revisión y evidencia manual de cada integrante, por lo que permanece pendiente.

## Matriz de resultados

| Caso | Responsable | Estado | Evidencia | Defecto |
| --- | --- | --- | --- | --- |
| TC-01 | Persona 1 | Pendiente | — | — |
| TC-02 | Persona 3 | Pendiente | — | — |
| TC-03 | Persona 2 | Pendiente | — | — |
| TC-04 | Persona 2 | Pendiente | — | — |
| TC-05 | Persona 3 | Pendiente | — | — |
| TC-06 | Persona 3 | Pendiente | — | — |
| TC-07 | Persona 2 | Pendiente | — | — |
| TC-08 | Persona 2 | Pendiente | — | — |
| TC-09 | Persona 4 | Pendiente | — | — |
| TC-10 | Persona 4 | Pendiente | — | — |

Estados permitidos: `Aprobado`, `Fallido`, `Bloqueado`, `Pendiente`. Registrar el nombre real del responsable y una ruta de captura, log o enlace a una evidencia de la plataforma. Si Cypress crea datos, anotar el identificador del run para localizarlos.

## Plantilla de defecto

```text
ID: BUG-___
Historia / caso: HU-___ / TC-___
Severidad: P0 bloqueante | P1 importante | P2 menor
Ambiente y commit:
Precondición y datos ficticios:
Pasos para reproducir:
Resultado esperado:
Resultado observado:
Evidencia (captura/log):
Estado y responsable:
```

## Acta de cierre del sprint

```text
Fecha:
Participantes:
Casos ejecutados / aprobados / fallidos / bloqueados:
Defectos P0/P1 abiertos:
Objetivo cumplido: sí / no (justificación)
Comentario del interesado/docente:
Mejora de la retrospectiva:
```

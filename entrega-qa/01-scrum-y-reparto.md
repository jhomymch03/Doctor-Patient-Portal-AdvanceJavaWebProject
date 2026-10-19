# Organización Scrum y reparto del equipo

## Acuerdo inicial

El producto es el portal hospitalario Java/JSP. El objetivo del sprint es entregar un plan de pruebas, una batería smoke, casos vinculados a historias de usuario, un script Cypress y evidencia real. Las cuatro historias de `03-historias-y-test-cases.md` son una **guía inicial**: en la planificación pueden cambiarse si el equipo justifica el alcance. El docente es el interesado que revisa el resultado; no se inventa un Product Owner.

La **Persona 1 será el Scrum Master**. En la primera reunión se registra su nombre y usuario de GitHub. Antes de que empiecen las ramas individuales, crea el fork común en su cuenta de GitHub, invita a las Personas 2, 3 y 4 como colaboradoras, confirma que aceptaron y prepara el commit inicial de `entrega-qa` con la **plantilla Cypress**, no con el script completo. Además facilita reuniones y quita impedimentos; estas tareas no reemplazan su aporte QA de plan y smoke. El grupo elige por separado quién integrará los PR y quién hará la revisión final.

## Equipo de cuatro y entregables

| Integrante | Área QA asignada | Casos que debe revisar y ejecutar | Rama del fork | Aporte propio |
| --- | --- | --- | --- | --- |
| Persona 1 — Scrum Master | Smoke, plan y trazabilidad | TC-01; revisar TC-02 a TC-04 y ejecutar smoke final | `qa/plan-smoke` | Crear el fork, invitar a los otros tres y preparar la base; luego añadir el código Cypress TC-01, ajustar el plan y aportar evidencia. |
| Persona 2 | Administración y catálogo | TC-03, TC-04, TC-07, TC-08 | `qa/admin-catalogo` | Añade código Cypress de acceso admin y alta de especialista/doctor; documenta casos y evidencia. |
| Persona 3 | Paciente | TC-02, TC-05, TC-06 | `qa/pacientes` | Añade código Cypress de formularios y registro/login; documenta casos y evidencia. |
| Persona 4 | Citas y doctor | TC-09, TC-10 | `qa/citas-doctor` | Añade código Cypress de cita y atención, activa flujo integrado y documenta evidencia. |

Cada persona registra sus aportes en `aportes/persona-N.md` desde su rama y **añade su bloque al mismo `cypress/e2e/portal_hospital.cy.js`**. Los cuatro PR deben mostrar líneas JavaScript nuevas, no solo revisión documental. Los bloques listos para copiar se entregan individualmente en `codigo-por-persona/persona-N.md`, que no forma parte del commit base. El responsable de integración actualiza los documentos consolidados después de revisar los cuatro PR. El procedimiento detallado está en `documentos/Guia_Cuatro_Personas.docx`.

## Sprint sugerido de cinco jornadas

| Jornada | Actividad | Resultado verificable |
| --- | --- | --- |
| 1 | Registrar a Persona 1 como Scrum Master; elegir integrador y revisores. Confirmar HU; Persona 1 crea fork, invita y sube la base. | Nombres, fork, invitaciones aceptadas y cuatro ramas. |
| 2 | Cada persona revisa sus casos y criterios; abre su aporte desde una rama. | Cuatro archivos de aporte iniciados y PR en borrador. |
| 3 | Ejecución manual y registro de defectos con datos ficticios. | Evidencia fechada por caso, no solo resultados esperados. |
| 4 | Ejecución Cypress, corrección de problemas propios y revisión cruzada. | Logs o capturas, PR revisados y casos repruebados. |
| 5 | Integración, smoke y suite completa; revisión y retrospectiva; carga a plataforma. | PR integrados, acta y archivos finales según la plataforma. |

Daily sugerida de 10 minutos: avance, siguiente tarea e impedimento. La Persona 1, como Scrum Master, facilita y anota bloqueos; el integrador mantiene el tablero. Las duraciones y ceremonias son una guía, no una afirmación de que ya ocurrieron.

## Tablero y backlog inicial

Columnas: `Pendiente → En curso → En revisión → Hecho`. Cada tarjeta incluye responsable, HU/TC, rama, PR, evidencia y estado. Los IDs se pueden ajustar tras la planificación.

| ID | Tarea | Responsable inicial | Dependencia |
| --- | --- | --- | --- |
| QA-01 | Persona 1 crea fork, invita y prepara base | Persona 1 | Ninguna |
| QA-02 | Plan, portada y smoke TC-01 | Persona 1 | QA-01 |
| QA-03 | Administración TC-03/04/07/08 | Persona 2 | QA-01 |
| QA-04 | Formularios y paciente TC-02/05/06 | Persona 3 | QA-01 |
| QA-05 | Cita y doctor TC-09/10 | Persona 4 | QA-03 y QA-04 para datos de prueba |
| QA-06 | Revisión cruzada y merge de los cuatro PR | Integrador por elegir | QA-02 a QA-05 |
| QA-07 | Suite final, acta y entrega a clase | Grupo; coordina integrador | QA-06 |

## Reglas de colaboración

Definición de terminado: caso con HU y resultado esperado, ejecución en ambiente identificado, resultado observado y evidencia, defectos registrados, PR con revisión de otra persona y archivos integrados. Un caso fallido puede estar documentado, pero no cuenta como aprobado.

El trabajo se realiza en el **fork común**, no en `mdtalalwasim/...` como destino de los PR. La Persona 1, como Scrum Master, es propietaria del fork; espera a que las Personas 2, 3 y 4 acepten la invitación y sube el commit inicial. Después cada integrante, incluida la Persona 1, crea su rama desde la rama principal vigente del fork, hace commits pequeños y abre un PR hacia esa principal. Tras el commit inicial nadie hace `push` directo a la principal ni sube `tools/`, `node_modules/`, `target/`, contraseñas nuevas o datos reales. El rol de integrador sigue pendiente de elección; ser propietario del fork no implica integrar PR sin revisión.

Los revisores propuestos son cruzados: Persona 1 revisa Persona 2; Persona 2 revisa Persona 3; Persona 3 revisa Persona 4; Persona 4 revisa Persona 1. El grupo puede cambiarlos. La Persona 1 comprueba que haya revisión y resuelve bloqueos, pero no aprueba automáticamente todos los PR.

## Registro de responsables

| Decisión | Nombre elegido | Fecha |
| --- | --- | --- |
| Scrum Master y dueño del fork | Persona 1 — nombre por completar | Pendiente |
| Integrador de PR y entrega | Pendiente | Pendiente |

En la retrospectiva registren una mejora concreta para el siguiente sprint. No presenten los roles pendientes o la revisión manual como si ya se hubieran completado.

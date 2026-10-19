# Aporte de la Persona 1 — plan, portada y smoke

Completar en la rama `qa/plan-smoke`. La Persona 1 es Scrum Master y propietaria del fork común; primero crea el fork, invita a las Personas 2, 3 y 4 y prepara el commit base. Después realiza su aporte QA de plan y smoke.

| Campo | Valor a completar |
| --- | --- |
| Nombre y usuario GitHub | Nombre completo pendiente de confirmación / `@jhomymch03` |
| Fecha y ambiente | 19 de octubre de 2026; Windows; Docker Desktop 4.88.1; MySQL 8; Tomcat 9; Cypress 16.1.1; Electron 146 headless |
| URL del fork y PR | Fork: `https://github.com/jhomymch03/Doctor-Patient-Portal-AdvanceJavaWebProject`; PR: pendiente de apertura |
| Historia/caso | HU-01 / TC-01; revisión transversal de TC-01 a TC-04 |

## Revisión del plan

Se revisaron objetivo, alcance, prioridades P0/P1, criterios de entrada/salida, riesgos y trazabilidad. El plan vigente vincula correctamente HU-01 con TC-01 y define TC-01 a TC-04 como smoke P0, por lo que no se propuso un cambio documental. Se registra como desviación del ambiente que esta ejecución individual usó Electron 146 porque Chrome no está disponible en el equipo; el smoke final deberá ejecutarse con el navegador acordado o dejar documentada la excepción.

## Ejecución propia

| Caso/comando | Pasos y datos usados | Esperado | Observado | Estado | Evidencia |
| --- | --- | --- | --- | --- | --- |
| TC-01 manual | Abrir la URL local y verificar título, marca del portal y enlaces ADMIN, DOCTOR, APPOINTMENT y USER. No se usaron datos personales. | Portada y enlaces visibles | HTTP 200; título `Home Page \| Doctor Patient Portal`; los cuatro enlaces estuvieron visibles y apuntaron a sus JSP esperados. | Aprobado | `evidencias/persona-1/TC-01-2026-10-19.md` |
| TC-01 Cypress — `npm run cy:smoke:electron` | Portal y MySQL levantados con Docker; ejecución desde `qa/plan-smoke`. | TC-01 aprobado sin fallos | 1 prueba aprobada, 0 fallidas; duración del spec: 2 s. El flujo funcional permaneció omitido intencionalmente. | Aprobado | `evidencias/persona-1/TC-01-2026-10-19.md` |
| `npm run cy:smoke` final | Ejecutar después de integrar TC-02, TC-03 y TC-04. | TC-01 a TC-04 aprobados | No ejecutado todavía: faltan los PR de Personas 2 y 3. | Pendiente | Pendiente de integración |

Defectos, bloqueos o riesgos encontrados: no se observaron defectos en TC-01. Riesgos abiertos: smoke final dependiente de los bloques TC-02 a TC-04 y navegador Chrome no disponible en este equipo.

## Revisión y PR

Archivos modificados y motivo: `cypress/e2e/portal_hospital.cy.js` para añadir TC-01; `aportes/persona-1.md` para registrar revisión y resultados; `evidencias/persona-1/TC-01-2026-10-19.md` para conservar la evidencia. Revisor propuesto: Persona 4. Enlace del PR: pendiente de apertura.

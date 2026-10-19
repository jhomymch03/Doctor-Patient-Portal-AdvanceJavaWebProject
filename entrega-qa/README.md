# Entrega QA: portal hospitalario

Esta carpeta contiene la práctica de Scrum y aseguramiento de calidad para el proyecto `Doctor-Patient-Portal`. La aplicación Java original está en `../Doctor-Patient-Portal`; las pruebas se mantienen separadas.

## Archivos para entregar por separado

| Archivo | Contenido |
| --- | --- |
| `documentos/Plan_de_Pruebas_Hospital.docx` | Plan de pruebas con estrategia smoke, alcance, riesgos y criterios. |
| `documentos/Casos_de_Prueba_Hospital.docx` | Historias propuestas y casos de prueba trazables. |
| `documentos/Organizacion_Equipo_Hospital.docx` | Scrum y responsabilidades, con Persona 1 como Scrum Master. |
| `cypress/e2e/portal_hospital.cy.js` | Script JavaScript de Cypress para la plataforma de clase. |

La guía `documentos/Guia_Cuatro_Personas.docx` resume el flujo del fork común. Además, compartir a cada integrante su documento individual `documentos/Guia_Persona_N.docx` **y** `codigo-por-persona/persona-N.md`, que contiene su código JavaScript exacto. No hay ZIP de entrega.

## Qué compartir con el grupo

Al comenzar, enviar `documentos/Organizacion_Equipo_Hospital.docx` y `documentos/Guia_Cuatro_Personas.docx` al chat de las cuatro personas. Enviar además `documentos/Guia_Persona_N.docx` y `codigo-por-persona/persona-N.md` a la persona correspondiente. Compartir el plan y los casos para revisión. La Persona 1 crea el fork y cambia el `.cy.js` completo por `cypress/plantilla/portal_hospital.base.js` **antes del commit base**. El script del fork empieza con marcadores; cada PR añade una parte real al mismo JS. La versión completa local es referencia y no debe entrar terminada en `main` inicial. Los archivos `aportes/persona-N.md` se completan en los PR.

No enviar a la plataforma de clase `node_modules/`, `target/`, `tools/`, capturas sin revisar, PDFs/PNG temporales ni un ZIP. `package.json`, `package-lock.json` y `cypress.config.js` son necesarios para ejecutar Cypress desde el fork, pero no sustituyen el `.js` solicitado para la entrega.

## Fuentes y seguimiento

`01-scrum-y-reparto.md`, `02-test-plan.md` y `03-historias-y-test-cases.md` son las fuentes editables de los tres Word principales. `aportes/persona-1.md` a `persona-4.md` son plantillas para registrar el trabajo real; `04-ejecucion-y-evidencias.md` contiene el registro de resultados, y `05-puesta-en-marcha-y-entrega.md` las instrucciones técnicas. Las guías Word son los documentos canónicos de reparto; sus duplicados Markdown se retiraron. `scripts/build_delivery_docs.py` regenera solo los tres Word principales.

## Ejecución rápida

Desde esta carpeta, con el portal funcionando en `http://127.0.0.1:8080/Doctor-Patient-Portal/`:

```powershell
npm ci
npx cypress install
npm run cy:smoke
npm run cy:full
```

`cy:smoke` verifica navegación y acceso administrativo sin crear registros. `cy:full` agrega un especialista, doctor, paciente y cita con datos únicos **solo después de integrar los cuatro bloques y activar el flujo**; debe ejecutarse en una base de pruebas. Los registros creados permanecen para presentar evidencia. Véase `05-puesta-en-marcha-y-entrega.md` antes del flujo completo.

## Criterio de entrega

Las cuatro historias son una propuesta inicial, no una cantidad obligatoria. La **Persona 1 es Scrum Master**: crea el fork común, invita a las Personas 2, 3 y 4 y prepara el commit base antes de abrir las ramas individuales. El grupo elige por separado al integrador y a los revisores. Cada integrante, incluida la Persona 1, sube su aporte en una rama del fork y abre un Pull Request antes de la entrega a clase. El registro de ejecución distingue la verificación automática realizada aquí de la revisión y evidencia que debe aportar cada integrante. La aplicación es de demostración: contiene credenciales administrativas y contraseñas de usuarios en texto plano; no se deben usar datos personales reales.

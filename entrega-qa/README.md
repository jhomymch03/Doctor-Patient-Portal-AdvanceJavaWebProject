# Entrega QA: portal hospitalario

Esta carpeta contiene la práctica de Scrum y aseguramiento de calidad para el proyecto `Doctor-Patient-Portal`. La aplicación Java original está en `../Doctor-Patient-Portal`; las pruebas se mantienen separadas.

## Archivos para entregar por separado

| Archivo | Contenido |
| --- | --- |
| `documentos/Plan_de_Pruebas_Hospital.docx` | Plan de pruebas con estrategia smoke, alcance, riesgos y criterios. |
| `documentos/Casos_de_Prueba_Hospital.xlsx` | Historias, criterios de aceptación y casos de prueba trazables. |
| `documentos/Organizacion_Equipo_Hospital.docx` | Scrum y responsabilidades, con Persona 1 como Scrum Master. |
| `cypress/e2e/portal_hospital.cy.js` | Script JavaScript de Cypress para la plataforma de clase. |

Los tres documentos indicados arriba son las versiones vigentes de la entrega. No hay ZIP de entrega.

## Qué compartir con el grupo

Compartir el plan de pruebas, la organización Scrum, el Excel de casos y el script Cypress. Los aportes individuales y la evidencia de ejecución están en `aportes/` y `evidencias/`.

No enviar a la plataforma de clase `node_modules/`, `target/`, `tools/`, capturas sin revisar, PDFs/PNG temporales ni un ZIP. `package.json`, `package-lock.json` y `cypress.config.js` son necesarios para ejecutar Cypress desde el fork, pero no sustituyen el `.js` solicitado para la entrega.

## Fuentes y seguimiento

`aportes/persona-1.md` a `aportes/persona-4.md` registran el trabajo de cada integrante. `evidencias/` conserva los resultados y capturas de las ejecuciones documentadas.

## Ejecución rápida

Desde esta carpeta, con el portal funcionando en `http://127.0.0.1:8080/Doctor-Patient-Portal/`:

```powershell
npm ci
npx cypress install
npm run cy:smoke
npm run cy:full
```

`cy:smoke` verifica navegación y acceso administrativo sin crear registros. `cy:full` agrega un especialista, doctor, paciente y cita con datos únicos; debe ejecutarse solo en una base de pruebas. Los registros creados permanecen para presentar evidencia.

## Criterio de entrega

Las cuatro historias organizan diez casos de prueba. Los aportes de las cuatro personas se integraron mediante Pull Requests. La aplicación es de demostración: contiene credenciales administrativas y contraseñas de usuarios en texto plano; no se deben usar datos personales reales.

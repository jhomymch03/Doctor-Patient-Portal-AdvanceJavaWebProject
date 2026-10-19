# Aporte de la Persona 3 — formularios y paciente

Completar en la rama `qa/pacientes` con correo ficticio único de `example.test`.

| Campo | Valor a completar |
| --- | --- |
| Nombre y usuario GitHub | Nombre por completar / `@BolivianProgrammer` |
| Fecha y ambiente | 19 de octubre de 2026; Windows; Docker (MySQL 8.4 `hospital-mysql`, Tomcat 9 con JDK 21); Cypress 16.1.1; Chrome 155 headless |
| URL del fork y PR | Fork: `https://github.com/jhomymch03/Doctor-Patient-Portal-AdvanceJavaWebProject`; PR: pendiente de abrir |
| Historias/casos | HU-01/HU-03 / TC-02, TC-05, TC-06 |

## Casos ejecutados

| Caso | Datos y pasos usados | Esperado | Observado | Estado | Evidencia |
| --- | --- | --- | --- | --- | --- |
| TC-02 formularios | Abrir `signup.jsp`, `user_login.jsp`, `doctor_login.jsp` y `user_appointment.jsp` en navegador y con Cypress | Formularios accesibles | Las cuatro páginas mostraron su formulario sin error de servidor; Cypress TC-02 aprobado | Aprobado | `evidencias/persona-3/TC02_*.jpg`, `ejecucion.md` |
| TC-05 registro/login | Registro y login de `Paciente QA Manual 01` (`paciente.qa.manual01@example.test`) en navegador; mismos pasos con spec temporal para `Paciente QA 1792438296795133` | Registro y nombre visibles | `Register Successfully`; tras el login, `index.jsp` con el nombre del paciente en el menú; filas `id = 1` e `id = 2` en `user_details` | Aprobado | `evidencias/persona-3/TC05_*`, `ejecucion.md` |
| TC-06 login inválido | Correo inexistente `inexistente.manual01@example.test` y contraseña incorrecta, en navegador y con Cypress | Mensaje de error | Permaneció en `user_login.jsp` con `Invalid email or password`; Cypress TC-06 aprobado | Aprobado | `evidencias/persona-3/TC06_login_invalido.jpg`, `ejecucion.md` |

Identificador ficticio del run: `1792438296795133` (spec temporal de TC-05, retirado antes del commit). Revisión/cambio del bloque Cypress y comandos ejecutados: se pegaron sin cambios `PERSONA_3_TC02`, `PERSONA_3_TC06` y `PERSONA_3_REGISTRO` en `cypress/e2e/portal_hospital.cy.js`, conservando los marcadores y los bloques ajenos. `npm run cy:smoke`: 1 passing, 0 failing, 2 pending. `npm run cy:full`: 2 passing, 0 failing, 1 pending (flujo largo `it.skip`). El bloque de registro solo se ejecutará integrado cuando la Persona 4 active el flujo.

Defectos o bloqueos: ninguno observado. Observación: la aplicación guarda las contraseñas de pacientes en texto plano (riesgo ya registrado en el plan). Revisor: Persona 2 (`@karciss`). Enlace del PR: pendiente de abrir.

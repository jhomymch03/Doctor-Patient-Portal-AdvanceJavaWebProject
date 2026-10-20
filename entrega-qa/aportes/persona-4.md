# Aporte de la Persona 4 — cita y atención médica

Se añadieron los bloques de TC-09/TC-10 y se activó el recorrido completo después de integrar los PR de Personas 1, 2 y 3.

| Campo | Valor |
| --- | --- |
| Nombre y usuario GitHub | Chucho / `Chucharizard` (nombre de perfil; nombre académico por confirmar) |
| Fecha y ambiente | 19 de octubre de 2026, America/La_Paz; Windows, Java 17, Tomcat 9.0.123, MariaDB 11.4.8, Cypress 16.1.1, Chrome 155 headless |
| Fork | https://github.com/jhomymch03/Doctor-Patient-Portal-AdvanceJavaWebProject |
| Rama y base | `qa/citas-doctor`, desde `main` integrado `8baac8a` |
| Historias y casos | HU-03/HU-04 / TC-09 y TC-10 |
| Commit de código ejecutado | `aab4ce7d9a2913583a04ad6ae0ad35c9afbdfc7d` |
| PR | Pendiente de apertura al terminar de adjuntar esta evidencia |

## Casos ejecutados

| Caso | Pasos y datos usados | Esperado | Observado | Estado | Evidencia |
| --- | --- | --- | --- | --- | --- |
| TC-09 cita | Paciente y doctor ficticios del run `1792459066630253`. Login, reserva para `2026-10-27` y consulta del listado. | Confirmación y fila con paciente, doctor, fecha y estado `Pending`. | Se mostró la confirmación; fila con los datos esperados y `Pending`. | Aprobado — automático | `evidencias/persona-4/ejecucion.md`, capturas TC09 y log completo. |
| TC-10 doctor | Login del doctor, apertura de cita `4`, envío de `Control de prueba 1792459066630253` y recarga del listado. | Comentario guardado y persistente; acción de comentar desactivada. | Mensaje `Comment updated`, comentario visible tras recarga y enlace con clase `disabled`. | Aprobado — automático | `evidencias/persona-4/ejecucion.md`, capturas TC10 y log completo. |

## Cambios y verificación

- Se añadieron únicamente los bloques de Persona 4 al JS compartido y se cambió `it.skip` por `it` en el recorrido integrado.
- Se comprueba también la identidad del paciente en el formulario del doctor y la persistencia del comentario.
- Se generan cuatro capturas y un JSON con identificadores ficticios sin contraseñas.
- Se amplía la ventana de Chromium headless desde `cypress.config.js` para que el listado del doctor quepa completo en las capturas.
- `npm run cy:smoke`: **4 aprobados, 0 fallidos, 2 pendientes intencionales**. La suite final vuelve a ejecutar los cuatro smoke.
- `npm run cy:full` final: **6 aprobados, 0 fallidos, 0 pendientes**, 11 segundos.
- `node --check` del spec y configuración, y `git diff --check`: correctos.

Paciente ficticio: `Paciente QA 1792459066630253`, `paciente.qa.1792459066630253@example.test`. Doctor ficticio: `Doctor QA 1792459066630253`, `doctor.qa.1792459066630253@example.test`. Cita: `4`. Run: `1792459066630253`.

## Ambiente y alcance de la evidencia

Ejecución automática asistida por Codex, con revisión visual de las cuatro capturas; no se atribuye una ejecución manual independiente. Docker falló al iniciar, por lo que se usó MariaDB portátil y una copia local de despliegue con ajustes declarados de Servlet y rutas CSS. El detalle, parche reproducible y esquema están en [la evidencia](../evidencias/persona-4/ejecucion.md).

No se observaron defectos funcionales en los dos casos en este ambiente. La validación final en MySQL 8 queda a cargo del integrador después del merge, junto con la revisión y consolidación del equipo.

Revisor previsto según el reparto: Persona 3, `BolivianProgrammer`. Revisión y merge del PR: pendientes.

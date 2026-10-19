# Aporte de la Persona 2 — administración y catálogo

Completar en la rama `qa/admin-catalogo` con datos ficticios. No poner contraseñas reales.

| Campo | Valor a completar |
| --- | --- |
| Nombre y usuario GitHub | Nombre por confirmar; identidad Git local `karciss` |
| Fecha y ambiente | 19/10/2026; Windows, Tomcat 9, MySQL en Docker (`hospital-mysql`), Chrome 155 headless, Cypress 16.1.1, `http://127.0.0.1:8080/Doctor-Patient-Portal/` |
| URL del fork y PR | Fork: https://github.com/jhomymch03/Doctor-Patient-Portal-AdvanceJavaWebProject ; PR: pendiente de crear |
| Historia/casos | HU-02 / TC-03, TC-04, TC-07, TC-08 |

## Casos ejecutados

| Caso | Datos y pasos usados | Esperado | Observado | Estado | Evidencia |
| --- | --- | --- | --- | --- | --- |
| TC-03 login válido | Abrir `admin_login.jsp`, iniciar sesión con el administrador de prueba | Panel admin | Se abrió `admin/index.jsp`; visibles `Admin Dashboard`, `Total Appointment` y `Specialist` | Aprobado | `npm run cy:smoke`: TC-03 aprobado |
| TC-04 login inválido | Abrir `admin_login.jsp`, usar contraseña de prueba incorrecta | Mensaje de error, sin acceso al panel | Permaneció en `admin_login.jsp`; visible `Invalid Username or Password.` | Aprobado | `npm run cy:smoke`: TC-04 aprobado |
| TC-07 especialidad | En el panel, agregar `Especialidad QA 1792434951335415` | Confirmación y opción disponible para doctor | Visible `Specialist added Successfully.`; la especialidad apareció en el selector usado para registrar al doctor | Aprobado en verificación aislada | [Captura TC-07](../evidencias/persona-2/TC07_especialidad_ficticia_creada.png) |
| TC-08 doctor | Registrar `Doctor QA 1792434951335415`, correo `doctor.qa.1792434951335415@example.test`, con la especialidad anterior | Confirmación y fila visible en listado | Visible `Doctor added Successfully`; la fila del doctor apareció en `admin/view_doctor.jsp` | Aprobado en verificación aislada | [Captura TC-08](../evidencias/persona-2/TC08_doctor_ficticio_en_listado.png) |

## Automatización y ejecución

Se añadieron al único `cypress/e2e/portal_hospital.cy.js` los tests TC-03 y TC-04 y el bloque `PERSONA_2_ADMIN` de alta de especialidad y doctor. Se conservaron todos los marcadores y los bloques ajenos.

`npm run cy:smoke` en esta rama: **2 aprobados, 0 fallidos, 1 pendiente**. El pendiente es el flujo largo `it.skip`, que se activará después de integrar las otras partes.

Verificación aislada de los mismos pasos de TC-07/08 con un spec temporal, retirado antes del commit: **1 aprobado, 0 fallidos**, dos capturas revisadas. Esto comprueba la funcionalidad local, pero **no** equivale a una ejecución del flujo largo integrado en esta rama. Registro: [evidencia de ejecución](../evidencias/persona-2/ejecucion.md).

Defectos observados: ninguno en los casos ejecutados. Bloqueo pendiente: suite funcional integrada hasta los PR de Personas 3 y 4. Revisor: por asignar por el grupo. Enlace del PR: pendiente de crear.

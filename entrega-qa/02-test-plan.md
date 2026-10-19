# Plan de pruebas y automatización Cypress del portal hospitalario

## Resumen

Este plan de pruebas *light* sigue la estructura del ejercicio previo de Cypress: resume el objetivo, alcance, ambiente, datos, ejecución, riesgos y resultado. La suite comprueba primero los accesos esenciales del portal y luego recorre registro de paciente, alta de catálogo médico, cita y atención, usando datos ficticios únicos en cada ejecución.

## Identificación

Versión del plan: 1.1. Aplicación bajo prueba: `Doctor-Patient-Portal` del repositorio clonado. Entorno objetivo: Windows, Java 21, Tomcat 9, MySQL 8 en Docker, navegador Chrome, Cypress 16.1.1. URL local prevista: `http://127.0.0.1:8080/Doctor-Patient-Portal/`. La colaboración se realiza en un **fork del grupo**, con una rama y un Pull Request por integrante; la entrega final sigue siendo la plataforma de clase.

## Objetivo

Confirmar que los recorridos esenciales del portal funcionan y que los datos de pacientes, doctores y citas se reflejan en las vistas correctas. El equipo debe poder reproducir y documentar los resultados y los defectos encontrados.

## Alcance de las pruebas

| Caso | Escenario | Resultado esperado |
| --- | --- | --- |
| TC-01 | Portada y navegación | Título y enlaces principales visibles |
| TC-02 | Formularios principales | Registro, logins y cita accesibles |
| TC-03 | Acceso admin válido | Panel y contadores visibles |
| TC-04 | Acceso admin inválido | Error, sin acceso al panel |
| TC-05 | Registro y acceso paciente | Confirmación y nombre visibles |
| TC-06 | Acceso paciente inválido | Error y permanencia en login |
| TC-07 | Alta de especialidad | Confirmación y nueva opción disponible |
| TC-08 | Alta de doctor | Confirmación y doctor en listado |
| TC-09 | Reserva y listado de cita | Confirmación, doctor y estado `Pending` |
| TC-10 | Comentario del doctor | Cita visible y comentario guardado |

## Fuera de alcance

Quedan fuera en este sprint: rendimiento, accesibilidad completa, dispositivos móviles, seguridad profunda, recuperación ante fallos, correo electrónico y despliegue público. Esos temas se pueden agregar al backlog tras el sprint.

## Tipos de prueba

1. **Smoke (P0):** ejecutar TC-01 a TC-04 al iniciar el entorno y después de cada cambio. Debe tardar pocos minutos y no crea registros.
2. **Funcional (P1):** ejecutar TC-05 a TC-10 con Cypress y contrastar manualmente las vistas. El script genera correos y nombres únicos por ejecución.
3. **Evidencia:** anotar resultado `Aprobado`, `Fallido` o `Bloqueado` por caso, fecha, navegador, versión, responsable y captura/log. No convertir una expectativa en resultado observado.
4. **Reprueba:** al corregir un defecto, repetir el caso afectado y la batería smoke.

El flujo automatizado TC-05 y TC-07 a TC-10 se ejecuta como un único escenario dependiente porque requiere crear sucesivamente paciente, especialista, doctor y cita. TC-06 es un escenario automatizado independiente. El equipo debe registrar por separado los puntos de control del recorrido en la matriz manual.

## Ambiente de prueba

| Componente | Configuración |
| --- | --- |
| Aplicación | `Doctor-Patient-Portal` del repositorio clonado |
| URL base | `http://127.0.0.1:8080/Doctor-Patient-Portal/` |
| Servidor | Tomcat 9 portátil, Java 21 |
| Base de datos | MySQL 8 en Docker, base `hospital` |
| Herramienta | Cypress 16.1.1 |
| Navegador de referencia | Chrome 155 headless en Windows |

## Datos de prueba

| Dato | Valor o estrategia |
| --- | --- |
| Administrador de demostración | `admin@gmail.com` y contraseña del entorno local de práctica |
| Paciente | `Paciente QA <ID>` y `paciente.qa.<ID>@example.test` |
| Doctor | `Doctor QA <ID>` y `doctor.qa.<ID>@example.test` |
| Especialidad | `Especialidad QA <ID>` |
| Cita | Fecha futura, contacto y dirección ficticios, motivo `Control general` |
| Comentario | `Control de prueba <ID>` |

Usar solo nombres ficticios y dominios `example.test`. El administrador de demostración configurado en el código es `admin@gmail.com` / `admin`; puede pasarse otro par con `CYPRESS_ADMIN_EMAIL` y `CYPRESS_ADMIN_PASSWORD`. El flujo funcional crea un paciente, un especialista, un doctor y una cita. No borra registros al terminar para conservar evidencia; ejecutar en `hospital` de práctica o en una copia desechable.

## Precondiciones y criterios

**Entrada:** Docker y MySQL activos; cuatro tablas presentes; WAR desplegado en Tomcat 9; portada HTTP 200; Chrome/Cypress disponibles; datos de prueba autorizados.

**Salida del smoke:** TC-01 a TC-04 aprobados. Si uno falla, detener la aceptación funcional y registrar defecto o bloqueo.

**Salida del sprint:** todos los casos ejecutados; ningún defecto P0 abierto; P1 documentados y aceptados por el interesado o corregidos; evidencia asociada; script y documentación entregables. Un `cy:full` correcto por sí solo no demuestra requisitos fuera del alcance.

**Colaboración:** los cuatro aportes deben quedar visibles en ramas y Pull Requests del fork común. La Persona 1 será Scrum Master: crea el fork, invita a las Personas 2, 3 y 4 y prepara la base con la plantilla Cypress antes de que cada integrante abra su rama. También añade su test TC-01. Cada PR debe añadir código al `.cy.js`, tener revisión de otra persona y enlazar casos/evidencias. La guía operativa está en `documentos/Guia_Cuatro_Personas.docx`.

## Ejecución de los casos

| Grupo | Acción | Aserción principal |
| --- | --- | --- |
| Smoke | `npm run cy:smoke` | TC-01 a TC-04 aprobados |
| Funcional | `npm run cy:full` | Smoke más TC-05 y TC-07 a TC-10 aprobados |
| Manual | Contrastar vistas y casos del recorrido | Registrar esperado, observado y evidencia |

## Riesgos y mitigación

| Riesgo observado o plausible | Impacto | Tratamiento |
| --- | --- | --- |
| Tomcat no inicia automáticamente después de reiniciar Windows. | Bloquea todas las pruebas. | Comprobar 8080 y arrancar `startup.bat`. |
| `hospital-mysql` no está activo. | Formularios y paneles pueden fallar. | Iniciar Docker Desktop y verificar contenedor antes del smoke. |
| La interfaz depende de Bootstrap externo. | El modal de especialidad puede no abrir si no hay red. | Registrar bloqueo; probar con acceso a CDN o resolver dependencia de UI. |
| Datos duplicados en cada ejecución. | Base de práctica crece. | Correos/nombres únicos; usar base dedicada y conservar evidencia del run. |
| El proyecto original guarda contraseñas en texto plano y tiene admin fijo. | No es apto para datos reales. | Usar solo datos ficticios y entorno local; abrir defecto de seguridad para trabajo posterior. |
| El proyecto guarda fecha/edad como texto. | Validación limitada. | Probar formatos y registrar anomalías, sin afirmar validación que no existe. |

## Matriz de trazabilidad resumida

| Historia | Casos | Automatización |
| --- | --- | --- |
| HU-01 Portada | TC-01, TC-02 | Smoke. |
| HU-02 Administración y catálogo | TC-03, TC-04, TC-07, TC-08 | Smoke y flujo completo. |
| HU-03 Paciente y cita | TC-05, TC-06, TC-09 | TC-06 independiente; otros en flujo. |
| HU-04 Atención médica | TC-10 | Flujo completo. |

Las cuatro HU son una propuesta inicial. Si el grupo modifica el backlog, debe actualizar esta tabla y los IDs de `03-historias-y-test-cases.md`; el objetivo no es alcanzar un número fijo de historias.

## Estructura del proyecto

| Archivo o carpeta | Propósito |
| --- | --- |
| `cypress/e2e/portal_hospital.cy.js` | Casos smoke y flujo funcional |
| `cypress.config.js` | URL base y configuración de Cypress |
| `package.json` y `package-lock.json` | Dependencia y comandos reproducibles |
| `01-scrum-y-reparto.md` | Roles y división del trabajo |
| `03-historias-y-test-cases.md` | Historias, pasos y expectativas |
| `04-ejecucion-y-evidencias.md` | Registro observado |
| `05-puesta-en-marcha-y-entrega.md` | Arranque y entrega a la clase |
| `documentos/Guia_Cuatro_Personas.docx` | Fork, ramas, PR y contenido exacto de cada aporte |

## Instrucciones de ejecución

1. Abrir PowerShell en `HospitalAutomatizacion/entrega-qa`.
2. Ejecutar `npm ci`; si falta el binario, ejecutar `npx cypress install`.
3. Ejecutar `npm run cy:smoke` y después `npm run cy:full`.
4. Contrastar manualmente los casos, guardar evidencia y completar el acta.

## Resultado de la verificación

| Fecha | Navegador | Grupo | Aprobados | Fallidos | Nota |
| --- | --- | --- | ---: | ---: | --- |
| 18 de octubre de 2026 | Chrome 155 headless | Smoke | 4 | 0 | Los dos tests funcionales se omitieron intencionalmente |
| 18 de octubre de 2026 | Chrome 155 headless | Suite completa | 6 | 0 | Cuatro smoke, TC-06 y un flujo TC-05/07/08/09/10 |

La suite completa tardó aproximadamente 10 segundos. Los cinco puntos de control del flujo se reportan como un solo test de Cypress; el equipo aún debe completar la revisión manual por caso y adjuntar evidencia en `04-ejecucion-y-evidencias.md`.

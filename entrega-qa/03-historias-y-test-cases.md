# Historias de usuario y casos de prueba

Estas cuatro historias son una **base ajustable**, no una cantidad obligatoria ni una especificación aprobada por el autor original. El equipo puede dividir, combinar o añadir historias en la planificación si el alcance real lo justifica; debe mantener la trazabilidad de los casos que conserve.

## Historias y criterios de aceptación

| ID | Historia de usuario | Criterios de aceptación |
| --- | --- | --- |
| HU-01 | Como visitante quiero abrir el portal y llegar a los formularios principales para elegir mi acción. | La portada carga; están disponibles enlaces de administrador, doctor, usuario y cita; los formularios se abren. |
| HU-02 | Como administrador quiero acceder y mantener especialidades y doctores para ofrecer citas. | Login válido abre el panel, inválido muestra error; el especialista se agrega y el doctor aparece en la lista. |
| HU-03 | Como paciente quiero crear mi cuenta, acceder y reservar una cita para recibir atención. | Registro y login válidos funcionan; login inválido muestra error; la cita se guarda con doctor y estado `Pending`. |
| HU-04 | Como doctor quiero ver mis citas y registrar un comentario o prescripción. | Login válido abre panel; la cita aparece en `Patient Details`; el comentario sustituye el estado inicial. |

## Casos

### TC-01 — Portada y enlaces principales · HU-01 · P0 smoke

Precondición: Tomcat activo. Pasos: (1) abrir `/Doctor-Patient-Portal/`; (2) revisar título y barra; (3) comprobar enlaces `ADMIN`, `DOCTOR`, `USER` y `APPOINTMENT`. Esperado: HTTP 200, título `Home Page | Doctor Patient Portal` y enlaces visibles. Responsable: Persona 1.

### TC-02 — Formularios accesibles · HU-01 · P0 smoke

Precondición: TC-01. Pasos: (1) abrir `signup.jsp`; (2) `user_login.jsp`; (3) `doctor_login.jsp`; (4) `user_appointment.jsp`. Esperado: cada página presenta su formulario correspondiente, sin error de servidor. Responsable: Persona 3.

### TC-03 — Login admin válido · HU-02 · P0 smoke

Precondición: base `hospital` accesible. Datos: `admin@gmail.com` / `admin` (solo entorno de práctica). Pasos: (1) abrir `admin_login.jsp`; (2) ingresar datos; (3) pulsar `Submit`. Esperado: redirección a `admin/index.jsp`, encabezado `Admin Dashboard` y contadores visibles. Responsable: Persona 2.

### TC-04 — Login admin inválido · HU-02 · P0 smoke

Precondición: formulario admin. Datos: correo admin y contraseña `incorrecta`. Pasos: (1) ingresar datos; (2) enviar. Esperado: vuelve a `admin_login.jsp`, muestra `Invalid Username or Password.` y no abre el panel. Responsable: Persona 2.

### TC-05 — Registro y acceso de paciente · HU-03 · P1

Precondición: correo ficticio único. Datos sugeridos: `Paciente QA <ID>`, `paciente.qa.<ID>@example.test`, `Prueba123!`. Pasos: (1) abrir `signup.jsp`; (2) completar y registrar; (3) abrir `user_login.jsp`; (4) iniciar sesión. Esperado: `Register Successfully`, luego portada con nombre del paciente. Responsable: Persona 3.

### TC-06 — Login de paciente inválido · HU-03 · P1

Precondición: formulario paciente. Datos: correo inexistente de `example.test` y contraseña incorrecta. Pasos: (1) ingresar datos; (2) enviar. Esperado: permanece en login y muestra `Invalid email or password`. Responsable: Persona 3. Está automatizado como prueba negativa independiente y también puede repetirse manualmente.

### TC-07 — Alta de especialidad · HU-02 · P1

Precondición: admin autenticado. Datos: `Especialidad QA <ID>`. Pasos: (1) abrir modal `Specialist` del panel; (2) ingresar nombre; (3) pulsar `Add`; (4) abrir alta de doctor. Esperado: mensaje `Specialist added Successfully.` y la nueva especialidad está en el selector. Responsable: Persona 2.

### TC-08 — Alta de doctor · HU-02 · P1

Precondición: TC-07. Datos: doctor ficticio, correo único `doctor.qa.<ID>@example.test`, fecha de nacimiento, cualificación, especialidad, teléfono y contraseña. Pasos: (1) abrir `admin/doctor.jsp`; (2) llenar formulario; (3) registrar; (4) abrir lista. Esperado: `Doctor added Successfully` y fila con correo del doctor. Responsable: Persona 2.

### TC-09 — Reserva y listado de cita · HU-03 · P1

Precondición: paciente y doctor de TC-05/TC-08. Datos: fecha futura, género, edad, correo, teléfono, enfermedad ficticia y dirección ficticia. Pasos: (1) iniciar sesión paciente; (2) abrir `user_appointment.jsp`; (3) llenar y enviar; (4) abrir `view_appointment.jsp`. Esperado: `Appointment is recorded Successfully.`, fila del paciente, doctor elegido y estado `Pending`. Responsable: Persona 4.

### TC-10 — Vista y comentario del doctor · HU-04 · P1

Precondición: TC-09. Pasos: (1) iniciar sesión con el doctor creado; (2) abrir `doctor/patient.jsp`; (3) seleccionar la cita del paciente; (4) escribir comentario ficticio; (5) enviar. Esperado: la cita aparece y la columna de estado muestra el comentario; la acción de comentar queda inactiva para esa cita. Responsable: Persona 4.

## Resultado por caso

El estado inicial de cada caso es `Pendiente de ejecución`. Completar los resultados reales en `04-ejecucion-y-evidencias.md`. Para un fallo, registrar URL, pasos, dato usado, esperado, observado, captura/log y severidad.

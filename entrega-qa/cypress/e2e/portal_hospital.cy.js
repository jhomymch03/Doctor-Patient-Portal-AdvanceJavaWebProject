// Suite integrada del equipo; ejecutar contra la instalación local de práctica.
// El flujo completo crea paciente, especialidad, doctor y cita ficticios.

const admin = {
  email: Cypress.expose('adminEmail'),
  password: Cypress.expose('adminPassword'),
};

function loginAdmin() {
  cy.visit('/admin_login.jsp');
  cy.get('form[action="adminLogin"] input[name="email"]').type(admin.email);
  cy.get('form[action="adminLogin"] input[name="password"]').type(admin.password, { log: false });
  cy.get('form[action="adminLogin"] button[type="submit"]').click();
  cy.location('pathname').should('include', '/admin/index.jsp');
  cy.contains('Admin Dashboard').should('be.visible');
}

function loginPatient(email, password) {
  cy.visit('/user_login.jsp');
  cy.get('form[action="userLogin"] input[name="email"]').type(email);
  cy.get('form[action="userLogin"] input[name="password"]').type(password, { log: false });
  cy.get('form[action="userLogin"] button[type="submit"]').click();
  cy.location('pathname').should('match', /\/Doctor-Patient-Portal\/index\.jsp$/);
}

describe('Smoke test del portal hospitalario', () => {
  // PERSONA_1_TC01_INICIO
  it('TC-01 | abre portada y navegación principal', () => {
    cy.visit('/');
    cy.title().should('contain', 'Home Page | Doctor Patient Portal');
    cy.get('nav').should('contain.text', 'Doctor Patient Portal');
    cy.get('nav a[href="admin_login.jsp"]').should('be.visible');
    cy.get('nav a[href="doctor_login.jsp"]').should('be.visible');
    cy.get('nav a[href="user_login.jsp"]').should('be.visible');
    cy.get('nav a[href="user_appointment.jsp"]').should('be.visible');
  });
  // PERSONA_1_TC01_FIN

  // PERSONA_3_TC02_INICIO
  it('TC-02 | abre formularios principales', () => {
    cy.visit('/signup.jsp');
    cy.get('form[action="user_register"]').should('be.visible');
    cy.visit('/user_login.jsp');
    cy.get('form[action="userLogin"]').should('be.visible');
    cy.visit('/doctor_login.jsp');
    cy.get('form[action="doctorLogin"]').should('be.visible');
    cy.visit('/user_appointment.jsp');
    cy.get('form[action="addAppointment"]').should('be.visible');
  });
  // PERSONA_3_TC02_FIN

  // PERSONA_2_TC03_TC04_INICIO
  it('TC-03 | inicia sesión de administrador y consulta el panel', () => {
    loginAdmin();
    cy.contains('Total Appointment').should('be.visible');
    cy.contains('Specialist').should('be.visible');
  });

  it('TC-04 | rechaza acceso de administrador con contraseña incorrecta', () => {
    cy.visit('/admin_login.jsp');
    cy.get('form[action="adminLogin"] input[name="email"]').type(admin.email);
    cy.get('form[action="adminLogin"] input[name="password"]').type('incorrecta', { log: false });
    cy.get('form[action="adminLogin"] button[type="submit"]').click();
    cy.location('pathname').should('include', '/admin_login.jsp');
    cy.contains('Invalid Username or Password.').should('be.visible');
  });
  // PERSONA_2_TC03_TC04_FIN
});

const describeFunctional = Cypress.expose('onlySmoke') ? describe.skip : describe;

describeFunctional('Flujo funcional de extremo a extremo', () => {
  // PERSONA_3_TC06_INICIO
  it('TC-06 | rechaza acceso de paciente con credenciales inválidas', () => {
    cy.visit('/user_login.jsp');
    cy.get('form[action="userLogin"] input[name="email"]').type(`inexistente.${Date.now()}@example.test`);
    cy.get('form[action="userLogin"] input[name="password"]').type('incorrecta', { log: false });
    cy.get('form[action="userLogin"] button[type="submit"]').click();
    cy.location('pathname').should('include', '/user_login.jsp');
    cy.contains('Invalid email or password').should('be.visible');
  });
  // PERSONA_3_TC06_FIN

  // Persona 4 activa el flujo después de integrar administración y paciente.
  it('TC-05 y TC-07 a TC-10 | registra paciente, especialista y doctor; crea y atiende una cita', () => {
    const runId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const patient = {
      name: `Paciente QA ${runId}`,
      email: `paciente.qa.${runId}@example.test`,
      password: 'Prueba123!',
    };
    const doctor = {
      name: `Doctor QA ${runId}`,
      email: `doctor.qa.${runId}@example.test`,
      password: 'Doctor123!',
    };
    const specialist = `Especialidad QA ${runId}`;
    const prescription = `Control de prueba ${runId}`;
    const appointmentDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString().slice(0, 10);

    // PERSONA_3_REGISTRO_INICIO
    // HU-03: registro y autenticación del paciente.
    cy.visit('/signup.jsp');
    cy.get('form[action="user_register"] input[name="fullName"]').type(patient.name);
    cy.get('form[action="user_register"] input[name="email"]').type(patient.email);
    cy.get('form[action="user_register"] input[name="password"]').type(patient.password, { log: false });
    cy.get('form[action="user_register"] button[type="submit"]').click();
    cy.contains('Register Successfully').should('be.visible');
    loginPatient(patient.email, patient.password);
    cy.get('#dropdownMenuButton1').should('contain.text', patient.name);
    cy.visit('/userLogout');
    // PERSONA_3_REGISTRO_FIN

    // PERSONA_2_ADMIN_INICIO
    // HU-02: el administrador agrega una especialidad y un doctor.
    loginAdmin();
    cy.get('[data-bs-target="#exampleModal"]').click();
    cy.get('#exampleModal').should('be.visible');
    cy.get('form[action="../addSpecialist"] input[name="specialistName"]').type(specialist);
    cy.get('form[action="../addSpecialist"] button[type="submit"]').click();
    cy.contains('Specialist added Successfully.').should('be.visible');

    cy.visit('/admin/doctor.jsp');
    cy.get('form[action="../addDoctor"] input[name="fullName"]').type(doctor.name);
    cy.get('form[action="../addDoctor"] input[name="dateOfBirth"]').type('1985-05-10');
    cy.get('form[action="../addDoctor"] input[name="qualification"]').type('Medicina general');
    cy.get('form[action="../addDoctor"] select[name="specialist"]').select(specialist);
    cy.get('form[action="../addDoctor"] input[name="email"]').type(doctor.email);
    cy.get('form[action="../addDoctor"] input[name="phone"]').type('70012345');
    cy.get('form[action="../addDoctor"] input[name="password"]').type(doctor.password, { log: false });
    cy.get('form[action="../addDoctor"] button[type="submit"]').click();
    cy.contains('Doctor added Successfully').should('be.visible');
    cy.visit('/admin/view_doctor.jsp');
    cy.get('table tbody tr').contains(doctor.email).should('be.visible');
    // PERSONA_2_ADMIN_FIN

    // PERSONA_4_CITA_INICIO
    // HU-03 / TC-09: reserva y listado de la cita con datos ficticios.
    cy.log(`Persona 4 | TC-09 | runId: ${runId}`);
    loginPatient(patient.email, patient.password);
    cy.visit('/user_appointment.jsp');
    const form = 'form[action="addAppointment"]';
    cy.get(`${form} input[name="fullName"]`).type(patient.name);
    cy.get(`${form} select[name="gender"]`).select('female');
    cy.get(`${form} input[name="age"]`).type('30');
    cy.get(`${form} input[name="appointmentDate"]`).type(appointmentDate);
    cy.get(`${form} input[name="email"]`).type(patient.email);
    cy.get(`${form} input[name="phone"]`).type('70012345');
    cy.get(`${form} input[name="diseases"]`).type('Control general');
    cy.get(`${form} select[name="doctorNameSelect"] option`).contains(doctor.name)
      .invoke('val').then((doctorId) => {
        cy.get(`${form} select[name="doctorNameSelect"]`).select(doctorId);
      });
    cy.get(`${form} textarea[name="address"]`).type('Calle de prueba 123');
    cy.get(`${form} button[type="submit"]`).click();
    cy.contains('Appointment is recorded Successfully.').should('be.visible');
    cy.screenshot(`persona-4/${runId}/TC09-reserva-confirmada`, { capture: 'viewport', scale: true });
    cy.visit('/view_appointment.jsp');
    cy.contains('table tbody tr', patient.name)
      .should('contain.text', doctor.name)
      .and('contain.text', appointmentDate)
      .and('contain.text', 'Pending');
    cy.screenshot(`persona-4/${runId}/TC09-cita-pendiente`, { capture: 'viewport', scale: true });
    cy.visit('/userLogout');
    // PERSONA_4_CITA_FIN

    // PERSONA_4_DOCTOR_INICIO
    // HU-04 / TC-10: el doctor atiende la cita y guarda el comentario.
    cy.log(`Persona 4 | TC-10 | runId: ${runId}`);
    // El listado incluye correos largos; ampliar para que la evidencia sea legible.
    cy.viewport(1600, 900);
    cy.visit('/doctor_login.jsp');
    cy.get('form[action="doctorLogin"] input[name="email"]').type(doctor.email);
    cy.get('form[action="doctorLogin"] input[name="password"]').type(doctor.password, { log: false });
    cy.get('form[action="doctorLogin"] button[type="submit"]').click();
    cy.location('pathname').should('include', '/doctor/index.jsp');
    cy.visit('/doctor/patient.jsp');
    cy.contains('table tbody tr', patient.name)
      .should('contain.text', patient.email)
      .and('contain.text', appointmentDate)
      .and('contain.text', 'Pending');
    cy.screenshot(`persona-4/${runId}/TC10-cita-del-doctor`, { capture: 'viewport', scale: true });
    cy.contains('table tbody tr', patient.name)
      .contains('a', 'Comment / Prescription')
      .should('not.have.class', 'disabled').click();
    cy.get('form[action="../updateStatus"] input[name="fullName"]')
      .should('have.value', patient.name);
    cy.get('form[action="../updateStatus"] input[name="id"]').invoke('val')
      .then((appointmentId) => {
        cy.writeFile(`cypress/results/persona-4-${runId}.json`, {
          runId,
          appointmentId,
          appointmentDate,
          patient: { name: patient.name, email: patient.email },
          doctor: { name: doctor.name, email: doctor.email },
          prescription,
        });
      });
    cy.get('form[action="../updateStatus"] textarea[name="comment"]').type(prescription);
    cy.get('form[action="../updateStatus"] button[type="submit"]').click();
    cy.location('pathname').should('include', '/doctor/patient.jsp');
    cy.contains('Comment updated').should('be.visible');
    cy.contains('table tbody tr', patient.name).should('contain.text', prescription);
    cy.contains('table tbody tr', patient.name)
      .contains('a', 'Comment / Prescription').should('have.class', 'disabled');
    cy.screenshot(`persona-4/${runId}/TC10-comentario-guardado`, { capture: 'viewport', scale: true });
    // Comprobar que el comentario persiste al volver a cargar la página.
    cy.reload();
    cy.contains('table tbody tr', patient.name).should('contain.text', prescription);
    cy.contains('table tbody tr', patient.name)
      .contains('a', 'Comment / Prescription').should('have.class', 'disabled');
    // PERSONA_4_DOCTOR_FIN
  });
});

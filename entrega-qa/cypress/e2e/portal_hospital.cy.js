// Plantilla para el commit inicial del fork. No es la entrega final.
// Cada persona copia su código desde codigo-por-persona/persona-N.md
// en los marcadores indicados. No declarar la suite completa como aprobada
// hasta integrar los cuatro PR y ejecutar las pruebas contra la BD de práctica.

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
  // PERSONA_3_TC02_FIN

  // PERSONA_2_TC03_TC04_INICIO
  // PERSONA_2_TC03_TC04_FIN
});

const describeFunctional = Cypress.expose('onlySmoke') ? describe.skip : describe;

describeFunctional('Flujo funcional de extremo a extremo', () => {
  // PERSONA_3_TC06_INICIO
  // PERSONA_3_TC06_FIN

  // La Persona 4 cambia it.skip por it al completar el flujo.
  it.skip('TC-05 y TC-07 a TC-10 | registra paciente, especialista y doctor; crea y atiende una cita', () => {
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
    // PERSONA_3_REGISTRO_FIN

    // PERSONA_2_ADMIN_INICIO
    // PERSONA_2_ADMIN_FIN

    // PERSONA_4_CITA_INICIO
    // PERSONA_4_CITA_FIN

    // PERSONA_4_DOCTOR_INICIO
    // PERSONA_4_DOCTOR_FIN
  });
});

# Puesta en marcha y entrega

## 1. Aplicación local

En la máquina donde ya se preparó el proyecto, iniciar Docker Desktop y comprobar `hospital-mysql`:

```powershell
docker ps --filter "name=hospital-mysql"
docker start hospital-mysql
```

`docker start` solo es necesario si aparece detenido. Debe exponerse `127.0.0.1:3306`. El código Java del repositorio apunta a `jdbc:mysql://localhost:3306/hospital` con usuario `root` y contraseña local `wasim`; cada integrante necesita su propia base compatible o cambiar esa configuración de forma segura para su equipo. No subir contraseñas nuevas al repositorio.

Iniciar Tomcat portátil en esta máquina con Java 21:

```powershell
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-21.0.12'
$env:CATALINA_HOME = 'C:\INFO\Caro Trabajo\Soft Qual Assur\HospitalAutomatizacion\tools\apache-tomcat-9.0.123'
& "$env:CATALINA_HOME\bin\startup.bat"
```

Abrir `http://127.0.0.1:8080/Doctor-Patient-Portal/`. Si se recompila el WAR, copiarlo a `webapps` y reiniciar Tomcat. La carpeta `tools` es local y pesada; no forma parte del material que se sube a la plataforma.

## 2. Cypress

Instalar Node.js y Chrome si faltan. Desde `entrega-qa`:

```powershell
npm ci
npx cypress install
npx cypress verify
npm run cy:smoke
npm run cy:full
```

Si Chrome no está disponible, usar `npm run cy:smoke:electron` y `npm run cy:full:electron`. Para abrir el runner visual: `npm run cy:open`. El script único es `cypress/e2e/portal_hospital.cy.js`. `cy:full` crea datos ficticios y por eso se ejecuta en base local de práctica. Fallos de Cypress generan capturas en `cypress/screenshots/`, que deben revisarse antes de registrar resultados.

## 3. Qué subir a la plataforma de clase

Después de integrar los cuatro PR, entregar por separado `documentos/Plan_de_Pruebas_Hospital.docx`, `documentos/Casos_de_Prueba_Hospital.docx`, `documentos/Organizacion_Equipo_Hospital.docx` y el **`cypress/e2e/portal_hospital.cy.js` integrado del fork**. La guía general, las cuatro guías y los cuatro archivos `codigo-por-persona/persona-N.md` sirven para repartir el trabajo; los fragmentos no sustituyen el JS final. Si la plataforma solo admite un `.js`, subir el integrado en su casilla y usar las casillas de documentos para los Word. No hay ZIP. Leer el formato exacto de la plataforma antes de cargar los archivos.

## 4. Fork y ramas obligatorios para esta práctica

La entrega final indicada es la plataforma de clase, pero el proceso de colaboración del grupo usará GitHub. El remoto de **esta copia local antigua** apunta al repositorio de un tercero; no hacer `git push origin main` desde aquí. La **Persona 1 será Scrum Master**; el grupo elige por separado al integrador. La Persona 1 crea el **fork común** en su cuenta de GitHub, invita a las Personas 2, 3 y 4, confirma que aceptaron y prepara el commit base. Después:

1. Cada integrante clona el fork común en una carpeta nueva y crea su rama desde `main`: `qa/plan-smoke`, `qa/admin-catalogo`, `qa/pacientes` o `qa/citas-doctor`.
2. Cada persona modifica su archivo `aportes/persona-N.md` y **añade al único `.cy.js` su código desde `codigo-por-persona/persona-N.md`**. El PR debe mostrar líneas Cypress nuevas. La Persona 4 parte de `main` después de integrar los PR de Personas 2 y 3 y activa el flujo completo. No incluir `tools/`, `node_modules/`, capturas con datos personales ni artefactos de `target/`.
3. Cada integrante hace `push` **de su rama al fork** y abre un Pull Request con base en `main` del fork común. Otra persona revisa antes del merge. No abrir PR al proyecto original.
4. El integrador elegido actualiza el acta con evidencia verificable, ejecuta de nuevo smoke y suite completa, prepara los archivos finales por separado y registra enlaces al fork y los cuatro PR.

La secuencia completa, comandos y contenido exigido a cada persona están en `documentos/Guia_Cuatro_Personas.docx` y en su guía Word individual. Un ejemplo, **dentro de un clon nuevo del fork del grupo**, es:

```powershell
git switch main
git pull --ff-only origin main
git switch -c qa/admin-catalogo
# Editar entrega-qa/aportes/persona-2.md y los archivos de su área.
git add entrega-qa/aportes/persona-2.md
git commit -m "test(qa): documentar administracion"
git push -u origin qa/admin-catalogo
```

No se ha creado todavía el fork ni se han enviado ramas o PR: la Persona 1 necesita los usuarios de GitHub de las Personas 2, 3 y 4 para invitarlas. Nadie debe marcar esa fase como realizada antes de ver el fork, las invitaciones aceptadas y los enlaces reales.

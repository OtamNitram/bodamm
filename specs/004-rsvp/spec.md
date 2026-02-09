# Feature Specification: RSVP — Confirmación de Asistencia

**Feature Branch**: `004-rsvp`  
**Created**: 2026-02-07  
**Status**: Draft  
**Input**: User description: "Sección RSVP integrada en la web de boda para que invitados confirmen asistencia e indiquen restricciones alimentarias, con lista privada accesible solo por los novios."

## Clarifications

### Session 2026-02-07

- Q: ¿Las restricciones alimentarias se registran por grupo o por invitado individual? → A: Restricciones por invitado individual.
- Q: ¿El formulario RSVP se integra inline en la página principal o vive en una página separada /rsvp? → A: Inline — el formulario reemplaza la sección Asistencia actual en la página principal.
- Q: ¿El sistema debe bloquear envíos después del 25 de marzo o solo mostrar un aviso? → A: Bloqueo suave — después de la fecha se oculta el formulario y se muestra solo la opción de contacto por WhatsApp.
- Q: ¿Cómo se capturan las restricciones alimentarias? → A: En vez de checkboxes predefinidos, cada invitado individual tiene un toggle sí/no para indicar si tiene restricciones, y si marca sí se muestra un campo de texto libre para describirlas. UI más limpia.
- Q: ¿Puede un invitado re-registrarse? → A: Sí, se sobrescribe la información anterior. Antes de enviar se muestra un modal de confirmación con el resumen de lo seleccionado para evitar errores.
- Q: ¿Cómo evitar que gente ajena explore la lista de invitados? → A: Sin typeahead/autocomplete. El invitado escribe nombre y apellido completo y presiona "Buscar". Match exacto (tolerante a mayúsculas/acentos). No se expone la lista.

## User Scenarios & Testing _(mandatory)_

### User Story 1 — Buscar nombre y confirmar asistencia (Priority: P1)

Un invitado entra a la sección "Confirmación de Asistencia" integrada directamente en la página principal de la web de boda (reemplaza la sección Asistencia actual). Escribe su nombre y apellido completo en el campo de búsqueda (sin typeahead/autocomplete para no exponer la lista) y presiona "Buscar". El sistema hace un match exacto (tolerante a mayúsculas/acentos). Si encuentra coincidencia, muestra los miembros de su grupo (por ejemplo, si Martín y Mariana son pareja, aparecen ambos). El invitado selecciona con checkboxes quiénes del grupo confirman asistencia. Antes de enviar, se muestra un modal de confirmación con el resumen de todas las selecciones (asistencia, restricciones). El invitado confirma y envía. Si ya había registrado antes, la nueva información sobrescribe la anterior.

**Why this priority**: Es la funcionalidad principal del RSVP — sin esto no hay confirmación de asistencia posible.

**Independent Test**: Se puede probar buscando un nombre existente en la lista, seleccionando asistentes y enviando. Se verifica que la confirmación se persista correctamente.

**Acceptance Scenarios**:

1. **Given** un invitado cuyo nombre está en la lista, **When** escribe su nombre y apellido completo y presiona "Buscar", **Then** se muestran todos los miembros de su grupo con checkboxes. No hay typeahead ni sugerencias.
2. **Given** los miembros del grupo están visibles, **When** el invitado selecciona quiénes asisten y presiona enviar, **Then** se muestra un modal de confirmación con el resumen de todas las selecciones.
3. **Given** el modal de confirmación visible, **When** el invitado confirma, **Then** la información se guarda y el sistema muestra un mensaje de éxito.
4. **Given** un invitado que ya confirmó previamente, **When** busca su nombre de nuevo, **Then** se muestran las selecciones previas (checkboxes ya marcados) y puede modificarlas. Al enviar, la nueva información sobrescribe la anterior.
5. **Given** un visitante que escribe un nombre que no coincide exactamente con ningún invitado, **When** presiona "Buscar", **Then** se muestra un mensaje de "No encontramos tu nombre" con sugerencia de contactar por WhatsApp.

---

### User Story 2 — Indicar restricciones alimentarias (Priority: P1)

Dentro del mismo formulario de RSVP, para cada invitado individual del grupo se muestra un toggle (sí/no) preguntando si tiene alguna restricción alimentaria. Si el invitado marca "sí", se despliega un campo de texto libre donde puede describir su restricción (ej. celiaquía, vegetarianismo, alergias, etc.). Esto mantiene la UI limpia y permite capturar cualquier tipo de restricción sin limitar a opciones predefinidas.

**Why this priority**: Información crítica para la organización del catering de la boda. Se muestra en el mismo formulario que la confirmación.

**Independent Test**: Se puede probar marcando "sí" en el toggle de restricciones de un invitado, escribiendo la restricción, y verificando que se guarda correctamente.

**Acceptance Scenarios**:

1. **Given** el formulario de RSVP con los miembros del grupo visibles, **When** el invitado marca "sí" en el toggle de restricción alimentaria de un miembro, **Then** se despliega un campo de texto libre asociado a ese invitado individual.
2. **Given** el campo de texto libre visible, **When** el invitado escribe una restricción (ej. "celíaco", "alergia a frutos secos"), **Then** la restricción se asocia a ese invitado individual y se persiste al enviar.
3. **Given** el toggle de restricción en "no" (por defecto), **When** el invitado envía el formulario, **Then** se guarda sin restricciones para ese miembro (campo opcional).

---

### User Story 3 — Mensaje de éxito y agregar al calendario (Priority: P2)

Al enviar el formulario correctamente, el invitado ve un mensaje de confirmación exitosa. Se le ofrece la opción de agregar la fecha del evento a su calendario (Google Calendar, Apple Calendar, etc.).

**Why this priority**: Cierra el flujo de confirmación con una buena experiencia de usuario y reduce la posibilidad de que los invitados olviden la fecha.

**Independent Test**: Se puede probar enviando el formulario y verificando que aparece el mensaje de éxito con el botón de agregar al calendario funcional.

**Acceptance Scenarios**:

1. **Given** el formulario enviado con éxito, **When** la respuesta del servidor es exitosa, **Then** se muestra un mensaje de confirmación visible y claro.
2. **Given** el mensaje de éxito visible, **When** el invitado hace click en "Agregar al calendario", **Then** se descarga/abre un archivo de evento (.ics) o enlace directo con la fecha, hora y lugar de la boda.

---

### User Story 4 — Contacto directo por WhatsApp (Priority: P2)

Como alternativa o complemento al formulario, el invitado puede contactar directamente a Martín o Mariana por WhatsApp. Dos botones visibles debajo del formulario permiten abrir una conversación de WhatsApp con cada uno.

**Why this priority**: Ofrece un canal alternativo de comunicación para dudas, cambios de último momento o invitados que prefieran no usar el formulario.

**Independent Test**: Se puede probar verificando que los botones abren WhatsApp con el número correcto pre-cargado.

**Acceptance Scenarios**:

1. **Given** la sección de contacto visible, **When** el invitado hace click en "WhatsApp a Martín", **Then** se abre WhatsApp con el número +598 99 318 813.
2. **Given** la sección de contacto visible, **When** el invitado hace click en "WhatsApp a Mariana", **Then** se abre WhatsApp con el número +598 99 158 944.

---

### User Story 5 — Pop-up de bienvenida para RSVP (Priority: P3)

Al entrar por primera vez a la página en una sesión, aparece un pop-up discreto pero que llame la atención preguntando si el visitante viene a confirmar asistencia. Si el usuario acepta, se desplaza a la sección de RSVP. El pop-up no debe mostrarse de nuevo en la misma sesión.

**Why this priority**: Mejora la conversión de confirmaciones al guiar a los invitados directamente al formulario. Es un complemento pero no bloquea el flujo principal.

**Independent Test**: Se puede probar abriendo la página en una sesión nueva y verificando que el pop-up aparece, luego cerrándolo y recargando para verificar que no reaparece en la misma sesión.

**Acceptance Scenarios**:

1. **Given** un visitante que abre la página por primera vez en una sesión, **When** la página carga, **Then** aparece un pop-up discreto preguntando si quiere confirmar asistencia.
2. **Given** el pop-up visible, **When** el visitante acepta, **Then** la página se desplaza suavemente a la sección de RSVP y el pop-up se cierra.
3. **Given** el pop-up visible, **When** el visitante lo descarta, **Then** el pop-up se cierra y no vuelve a aparecer durante la sesión.
4. **Given** un visitante que ya interactuó con el pop-up, **When** navega o recarga la página en la misma sesión, **Then** el pop-up no aparece de nuevo.

---

### User Story 6

_Removed — Transport coordination moved to a separate spec._

---

### User Story 7 — Acceso privado a la lista de invitados (Priority: P2)

Martín y Mariana son los únicos que pueden ver y gestionar la lista completa de invitados con todas las confirmaciones y restricciones alimentarias. La lista debe ser accesible de forma privada.

**Why this priority**: Los novios necesitan ver las confirmaciones para planificar el evento. La privacidad de los datos de los invitados es fundamental.

**Independent Test**: Se puede probar accediendo a la lista con credenciales válidas y verificando que sin credenciales no se puede acceder.

**Acceptance Scenarios**:

1. **Given** Martín o Mariana con acceso autorizado, **When** acceden al mecanismo de consulta de la lista, **Then** ven la lista completa con: nombre, apellido, confirmación y restricciones alimentarias de cada invitado.
2. **Given** un visitante no autorizado, **When** intenta acceder a la lista de invitados, **Then** no puede ver ni modificar los datos.

---

### Edge Cases

- ¿Qué pasa si el invitado busca un nombre que no está en la lista? → Se muestra un mensaje "No encontramos tu nombre" y se sugiere contactar a los novios por WhatsApp. No se dan pistas sobre nombres existentes.
- ¿Qué pasa si el invitado escribe solo el nombre o solo el apellido? → El sistema intenta match con nombre+apellido completo. Si no hay coincidencia exacta, muestra "No encontramos tu nombre".
- ¿Qué pasa si un invitado ya registró y vuelve a enviar? → La nueva información sobrescribe la anterior sin conflicto.
- ¿Qué pasa si un invitado intenta confirmar cuando ya pasó la fecha límite (25 de marzo)? → El formulario se oculta, se muestra un mensaje indicando que el plazo ha vencido y se muestran únicamente los botones de contacto por WhatsApp.
- ¿Qué pasa si hay un error de servidor al enviar el formulario? → Se muestra un mensaje de error y se sugiere reintentar o contactar por WhatsApp.
- ¿Qué pasa si el invitado cierra el navegador antes de enviar? → Los datos no se guardan; al volver, el formulario está en su estado previo (si ya había confirmado antes, esas confirmaciones previas se muestran).

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar un campo de búsqueda donde el invitado escribe su nombre y apellido completo y presiona "Buscar". Sin typeahead ni autocomplete. Match exacto tolerante a mayúsculas/acentos.
- **FR-002**: El sistema DEBE mostrar los miembros del grupo del invitado encontrado, cada uno con un checkbox para confirmar o desconfirmar asistencia.
- **FR-003**: El sistema DEBE mostrar, por cada invitado individual del grupo, un toggle (sí/no) para indicar si tiene restricciones alimentarias. Si marca "sí", se despliega un campo de texto libre para describir la restricción. No se usan opciones predefinidas.
- **FR-004**: El sistema DEBE persistir las confirmaciones y restricciones alimentarias de forma privada en el servidor.
- **FR-005**: El sistema DEBE mostrar un mensaje de éxito tras enviar el formulario correctamente, con la opción de agregar el evento al calendario.
- **FR-006**: El sistema DEBE ofrecer botones de contacto directo por WhatsApp a Martín (+598 99 318 813) y Mariana (+598 99 158 944).
- **FR-007**: El sistema DEBE mostrar un pop-up en la primera visita de la sesión invitando al usuario a confirmar asistencia, con navegación directa a la sección RSVP.
- ~~**FR-008**: _Removed — Transport coordination moved to a separate spec._~~
- **FR-009**: La lista de invitados y sus respuestas DEBE ser accesible exclusivamente por los novios (Martín y Mariana).
- **FR-010**: El diseño DEBE respetar fielmente la UI definida en Figma (colores, fuentes, márgenes, fondo) y ser responsivo para desktop y mobile. Cualquier componente nuevo que no esté en Figma (modal de confirmación, pop-up de bienvenida, mensajes de error/éxito, etc.) DEBE respetar el theme existente del proyecto (paleta de colores brand: darkGreen, eucalyptus, burgundy, linen, terracotta, navy; fuentes Dancing Script y Lato; border-radius y spacing consistentes).
- **FR-014**: El formulario RSVP DEBE integrarse inline en la página principal, reemplazando la sección Asistencia actual (QR code y layout anterior). No existe como página separada.
- **FR-011**: Si el invitado ya confirmó previamente, el sistema DEBE mostrar su estado previo al buscar su nombre (checkboxes pre-marcados, restricciones visibles) y permitir modificaciones. Al re-enviar, la nueva información sobrescribe la anterior.
- **FR-012**: La búsqueda DEBE usar match exacto sobre nombre+apellido (tolerante a mayúsculas y acentos). NO DEBE usar typeahead ni autocomplete para evitar exponer la lista de invitados.
- **FR-016**: Antes de enviar el formulario, el sistema DEBE mostrar un modal de confirmación con el resumen de todas las selecciones (quiénes asisten, restricciones alimentarias). El invitado debe confirmar explícitamente para proceder al envío.
- **FR-013**: El sistema DEBE generar un archivo de evento de calendario (.ics) o enlace de calendario con la fecha (25 de abril de 2026, 20:30 hs), lugar (Bodega Spinoglio) y nombre del evento.
- **FR-015**: Después del 25 de marzo de 2026, el sistema DEBE ocultar el formulario RSVP y mostrar un mensaje de plazo vencido junto con los botones de contacto por WhatsApp como única vía de confirmación.

### Key Entities

- **Invitado (Guest)**: Representa a cada persona invitada. Atributos: apellido, nombre, tiene restricción alimentaria (sí/no), descripción de restricción (texto libre, solo si tiene), confirmación de asistencia (sí/no).
- **Grupo (Group)**: Agrupación lógica de invitados relacionados (ej. pareja, familia). Un grupo contiene uno o más invitados. La búsqueda de un miembro muestra todo el grupo.
- **Lista de invitados (Guest List)**: Colección privada de todos los invitados y sus datos. Almacenada de forma simple en el servidor (ej. CSV o formato equivalente). Solo accesible por los novios.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Un invitado puede buscar su nombre, confirmar asistencia e indicar restricciones en menos de 2 minutos desde que accede a la sección.
- **SC-002**: El 100% de las confirmaciones enviadas se persisten correctamente y son visibles en la lista privada de los novios.
- **SC-003**: La sección RSVP se renderiza correctamente en dispositivos móviles (375px) y desktop (1200px+) respetando el diseño de Figma.
- **SC-004**: El pop-up de bienvenida aparece solo una vez por sesión y lleva al usuario directamente a la sección RSVP.
- **SC-005**: Los botones de WhatsApp abren correctamente la aplicación con el número pre-cargado en dispositivos móviles y desktop.
- **SC-006**: Ningún visitante no autorizado puede acceder a la lista completa de invitados.

## Assumptions

- La lista de invitados se pre-carga con los datos proporcionados por los novios antes del lanzamiento. Los invitados no se auto-registran.
- El almacenamiento de la lista puede ser un archivo simple en el servidor (CSV, JSON) dado el tamaño reducido esperado de invitados (~100-200).
- El pop-up de sesión usa almacenamiento del navegador (sessionStorage) para detectar la primera visita.
- La fecha límite de confirmación (25 de marzo de 2026) activa un bloqueo suave: después de esa fecha el formulario se oculta y solo quedan disponibles los botones de WhatsApp.
- No hay nombres+apellidos duplicados en la lista de invitados, por lo que el match exacto es suficiente como mecanismo de identificación.
- El mecanismo de acceso privado para los novios puede ser simple (ej. ruta protegida con contraseña básica, acceso directo al archivo del servidor) dado que el sitio es estático/semi-estático.

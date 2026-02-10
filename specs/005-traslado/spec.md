# Feature Specification: Traslado — La Van Comunitaria

**Feature Branch**: `005-traslado`  
**Created**: 2026-02-10  
**Status**: Draft  
**Input**: User description: "Sección de traslado para que invitados dejen sus datos de contacto y zona para ser conectados con otros invitados y organizar transporte compartido (no pago por la organización). Incluye auditoría de UI completa contra Figma v2."

## Clarifications

### Session 2026-02-10

- Q: ¿Los datos de traslado van a la misma Google Sheet que RSVP? → A: No, van a una Google Sheet nueva y separada.
- Q: ¿Los usuarios necesitan haber confirmado asistencia (RSVP) antes de enviar datos de traslado? → A: No se requiere. El formulario de traslado es independiente y cualquier visitante puede enviar sus datos.
- Q: ¿Los chips de zona son Montevideo, Costa de Oro y Otro? → A: Sí. Pese a que el diseño dice "Costa de Oro", también incluye ciudades de la costa (Ciudad de la Costa, Solymar, etc.).
- Q: ¿Qué sucede al seleccionar "Otro"? → A: Se muestra un campo de texto libre para que el usuario escriba su zona/barrio/ciudad.
- Q: ¿Hay fecha límite para enviar datos de traslado? → A: Se asume la misma que RSVP (25 de marzo de 2026), dado que la coordinación debe ocurrir antes del evento.
- Q: ¿Qué pasa con el formulario después de enviar exitosamente? → A: El formulario se resetea (campos vacíos) y la alerta de éxito se muestra temporalmente y luego se desvanece.
- Q: ¿Se necesita protección contra spam dado que el formulario no requiere autenticación? → A: Sí, un campo honeypot (input oculto que bots llenan pero humanos no). Si se llena, el envío se rechaza silenciosamente.
- Q: ¿Al cargar la página, hay algún chip de zona pre-seleccionado? → A: No, todos los chips empiezan deseleccionados. El dropdown aparece solo después de seleccionar un chip.
- Q: ¿La auditoría de UI (US3) debería ser un spec separado o ir junto con traslado? → A: Bundled — la auditoría se hace junto con la implementación de traslado en el mismo branch/spec.

## User Scenarios & Testing _(mandatory)_

### User Story 1 — Enviar datos de contacto para traslado compartido (Priority: P1)

Un invitado entra a la sección "Traslado: La Van Comunitaria" en la página principal. Lee la explicación de que es opcional y que el objetivo es conectar invitados de la misma zona para compartir el alquiler de una van. Selecciona su categoría de zona (Montevideo, Costa de Oro, u Otro) mediante chips. Al seleccionar una categoría, aparece un dropdown con las opciones correspondientes (barrios de Montevideo, ciudades de la costa, o un campo de texto libre para "Otro"). Ingresa su número de WhatsApp y su nombre completo. Presiona "Enviar Datos". Se muestra una alerta de éxito: "Recibimos tu info con éxito ;)" (desktop) / "¡Genial! Ya tenemos tu info ;)" (mobile). Los datos se persisten en una Google Sheet separada.

**Why this priority**: Es la única funcionalidad del formulario de traslado — sin esto no hay recolección de datos posible.

**Independent Test**: Seleccionar "Montevideo" → elegir un barrio → ingresar WhatsApp y nombre → enviar → ver alerta de éxito → verificar datos en Google Sheet.

**Acceptance Scenarios**:

1. **Given** la sección de traslado visible, **When** el invitado selecciona el chip "Montevideo", **Then** el chip se activa (fondo sólido eucalyptus, texto linen) y los demás quedan inactivos (fondo eucalyptus/20, texto darkGreen). Aparece un dropdown con barrios de Montevideo.
2. **Given** el chip "Costa de Oro" seleccionado, **When** el invitado abre el dropdown, **Then** se muestran ciudades de la costa (Ciudad de la Costa, Solymar, Atlántida, Pando, etc.).
3. **Given** el chip "Otro" seleccionado, **When** el formulario se actualiza, **Then** el dropdown se reemplaza por un campo de texto libre donde el invitado puede escribir su zona.
4. **Given** todos los campos completos (zona, WhatsApp, nombre), **When** el invitado presiona "Enviar Datos", **Then** se muestra la alerta de éxito inline y los datos se persisten en la Google Sheet de traslado.
5. **Given** algún campo obligatorio vacío, **When** el invitado presiona "Enviar Datos", **Then** se muestra un mensaje de error indicando qué campo falta.
6. **Given** un error del servidor al enviar, **When** el envío falla, **Then** se muestra un mensaje de error con los botones de WhatsApp de Martín y Mariana como fallback.

---

### User Story 2 — Contacto WhatsApp como fallback (Priority: P2)

Si el envío de datos falla por un error técnico, el invitado recibe un mensaje de error con la opción de contactar directamente a Martín o Mariana por WhatsApp para comunicar sus datos de traslado.

**Why this priority**: Garantiza que siempre haya una vía de comunicación disponible, incluso si el sistema falla.

**Independent Test**: Simular un error de servidor → verificar que se muestra el mensaje de error con los botones de WhatsApp.

**Acceptance Scenarios**:

1. **Given** un error al enviar el formulario de traslado, **When** el servidor responde con error, **Then** se muestra un mensaje de error claro con botones de WhatsApp para Martín (+598 99 318 813) y Mariana (+598 99 158 944).

---

### User Story 3 — Auditoría de UI contra Figma v2 (Priority: P1)

La web actual difiere del diseño Figma v2 en fondos, orden de secciones, y detalles de componentes. Se requiere una auditoría exhaustiva para alinear cada sección con el Figma v2. El orden correcto es: Hero → Detalles del Evento → Confirmación de Asistencia → Traslado → Gift List → Temaikenes y Fotos → Gracias/Footer. Cada sección tiene fondos, imágenes decorativas y espaciados específicos que deben coincidir.

**Why this priority**: El diseño Figma v2 es la fuente de verdad visual. Los cambios de fondo, estructura y orden de secciones afectan la coherencia visual de toda la página.

**Independent Test**: Comparar visualmente cada sección de la web con el Figma v2 en desktop (1200px) y mobile (375px). Documentar y corregir discrepancias.

**Acceptance Scenarios**:

1. **Given** la página completa renderizada, **When** se compara con el Figma v2 (desktop), **Then** el orden de secciones es: Hero → Detalles → Asistencia → Traslado → Gift List → Temaikenes y Fotos → Gracias.
2. **Given** cada sección individual, **When** se compara con su contraparte en Figma v2, **Then** los fondos (colores, imágenes, overlays), espaciados, tipografías y estructura de componentes coinciden.
3. **Given** la vista mobile (375px), **When** se compara con el Figma v2 mobile, **Then** los componentes se adaptan correctamente (chips con scroll horizontal snap, inputs apilados, etc.).
4. **Given** la barra de navegación (Nav), **When** se compara con el Figma v2, **Then** el orden de links es: Detalles → Asistencia → Traslado → Gift List → Temaikenes → Fotos. El link "Traslado" es nuevo y "Fotos" deja de estar oculto.

---

### Edge Cases

- ¿Qué pasa si el invitado envía datos de traslado más de una vez? → Se permite enviar múltiples veces; cada envío crea una nueva fila en la Google Sheet (no se sobrescribe, ya que no hay búsqueda por nombre previo). Los organizadores filtrarán duplicados manualmente.
- ¿Qué pasa si el número de WhatsApp tiene formato incorrecto? → Se valida que el campo no esté vacío y contenga solo dígitos y el prefijo + opcional. No se valida si el número es real.
- ¿Qué pasa si el invitado intenta enviar datos después del 25 de marzo? → Se oculta el formulario y se muestra un mensaje de plazo vencido con los botones de WhatsApp como alternativa.
- ¿Qué pasa si el invitado selecciona una zona pero no completa los demás campos? → Se muestra error de validación indicando los campos faltantes.
- ¿Qué pasa si en mobile los chips no caben todos en pantalla? → Se muestra scroll horizontal con efecto snap (imán) para que los chips se alineen correctamente al deslizar.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar una sección "Traslado: La Van Comunitaria" con subtítulo "Opcional" y un párrafo explicativo, posicionada entre la sección de Asistencia y Gift List.
- **FR-002**: El sistema DEBE mostrar tres chips de categoría de zona: "Montevideo", "Costa de Oro" y "Otro". Todos empiezan deseleccionados al cargar. Solo uno puede estar activo a la vez (selección exclusiva). El dropdown de punto de partida aparece solo después de seleccionar un chip.
- **FR-003**: Al seleccionar "Montevideo", el sistema DEBE mostrar un dropdown con barrios de Montevideo como opciones.
- **FR-004**: Al seleccionar "Costa de Oro", el sistema DEBE mostrar un dropdown con ciudades de la costa (Ciudad de la Costa, Solymar, Atlántida, Pando, etc.).
- **FR-005**: Al seleccionar "Otro", el sistema DEBE reemplazar el dropdown por un campo de texto libre para que el usuario escriba su zona.
- **FR-006**: El formulario DEBE incluir campos para número de WhatsApp y nombre completo, ambos obligatorios.
- **FR-007**: Al enviar exitosamente, el sistema DEBE resetear el formulario (vaciar todos los campos y deseleccionar chips) y mostrar una alerta de éxito temporal inline con estilo de alerta con borde eucalyptus, ícono check-circle, y texto de confirmación. La alerta se desvanece después de unos segundos.
- **FR-008**: Si el envío falla, el sistema DEBE mostrar un mensaje de error con botones de WhatsApp para Martín (+598 99 318 813) y Mariana (+598 99 158 944).
- **FR-009**: Los datos enviados DEBEN persistirse en una Google Sheet separada (distinta a la de RSVP) con columnas: zona, puntoDePartida, whatsapp, nombreCompleto, submittedAt.
- **FR-010**: El sistema DEBE validar que todos los campos obligatorios estén completos antes de enviar.
- **FR-011**: Después del 25 de marzo de 2026, el sistema DEBE ocultar el formulario de traslado y mostrar un mensaje de plazo vencido con los botones de WhatsApp.
- **FR-012**: El diseño DEBE respetar fielmente la UI definida en Figma v2 para la sección de traslado: fondo con imagen y overlay linen 85%, tipografías (Dancing Script para título, Lato para cuerpo), chips con estilo activo/inactivo, inputs con fondo #fffcf8 y borde darkGreen/20, y alerta de éxito con borde eucalyptus.
- **FR-013**: En mobile, los chips DEBEN tener scroll horizontal con efecto snap para alinearse correctamente.
- **FR-014**: La auditoría de UI DEBE verificar y corregir todas las secciones de la página para que coincidan con el Figma v2 en: orden de secciones, fondos, imágenes decorativas, espaciados y estructura de componentes, tanto en desktop (1200px) como en mobile (375px).
- **FR-015**: El formulario de traslado es independiente del RSVP — no requiere que el usuario haya confirmado asistencia previamente.
- **FR-016**: La barra de navegación (Nav) DEBE actualizarse para reflejar el orden del Figma v2: Detalles → Asistencia → Traslado → Gift List → Temaikenes → Fotos. El link "Traslado" apunta a la nueva sección (#traslado) y "Fotos" deja de estar oculto.
- **FR-017**: El formulario DEBE incluir un campo honeypot (input oculto visualmente) como protección básica contra spam. Si el campo honeypot tiene contenido al enviar, el envío se rechaza silenciosamente (sin mensaje de error visible).

### Key Entities

- **Registro de Traslado (TransportEntry)**: Representa un envío de datos de traslado. Atributos: categoría de zona (Montevideo/Costa de Oro/Otro), punto de partida (barrio, ciudad o texto libre), número de WhatsApp, nombre completo, fecha/hora de envío.
- **Zona**: Categoría principal de ubicación (Montevideo, Costa de Oro, Otro) con opciones secundarias dependientes (barrios, ciudades, texto libre).
- **Google Sheet de Traslado**: Hoja de cálculo separada de la de RSVP para almacenar los registros de traslado.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Un invitado puede seleccionar su zona, ingresar WhatsApp y nombre, y enviar datos de traslado en menos de 1 minuto.
- **SC-002**: El 100% de los envíos exitosos se persisten correctamente en la Google Sheet de traslado y son visibles para los organizadores.
- **SC-003**: La sección de traslado se renderiza correctamente en mobile (375px) y desktop (1200px+) respetando el diseño Figma v2.
- **SC-004**: Todas las secciones de la página coinciden visualmente con el Figma v2 en desktop y mobile tras la auditoría.
- **SC-005**: Los botones de WhatsApp funcionan correctamente como fallback en caso de error del sistema.
- **SC-006**: El formulario se oculta correctamente después de la fecha límite (25 de marzo de 2026).

## Assumptions

- Los barrios de Montevideo y ciudades de la costa se pre-cargan como datos estáticos en el código (no se consultan desde la API).
- La Google Sheet de traslado es accesible solo por los novios (mismo nivel de privacidad que la sheet de RSVP).
- El backend reutiliza el mismo patrón de Netlify Function → Google Apps Script que se usa para RSVP, con el mismo mecanismo de autenticación (RSVP_SECRET).
- No hay prevención de envíos duplicados — los organizadores filtran manualmente si es necesario.
- La fecha límite de traslado coincide con la de RSVP (25 de marzo de 2026).
- La auditoría de UI se limita a las secciones visibles en la página principal; no incluye páginas secundarias ni el admin.
- Los datos de traslado no necesitan búsqueda ni re-edición por parte del invitado (flujo de solo-escritura).

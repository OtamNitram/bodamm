/**
 * Apps Script extension for Traslado feature.
 *
 * Add this function to the existing Apps Script project (same one used for RSVP).
 * Update the doPost(e) handler to route action "traslado-submit" to handleTrasladoSubmit.
 *
 * Sheet setup: Create a new tab named "Traslado" with headers:
 *   zona | puntoDePartida | whatsapp | nombreCompleto | submittedAt
 */

var TRASLADO_SHEET_NAME = "Traslado";

/**
 * Handle traslado data submission.
 * Appends a new row to the "Traslado" sheet.
 *
 * @param {Object} data - { zona, puntoDePartida, whatsapp, nombreCompleto }
 * @returns {Object} - { success: true, submittedAt: string }
 */
function handleTrasladoSubmit(data) {
  var sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TRASLADO_SHEET_NAME);

  if (!sheet) {
    return {
      error: "sheet_not_found",
      message:
        'No se encontró la hoja "' +
        TRASLADO_SHEET_NAME +
        '". Creala en el Google Sheet.',
    };
  }

  if (!data.zona || !data.puntoDePartida || !data.whatsapp || !data.nombreCompleto) {
    return {
      error: "validation_error",
      message: "Todos los campos son obligatorios.",
    };
  }

  var submittedAt = new Date().toISOString();

  sheet.appendRow([
    data.zona,
    data.puntoDePartida,
    data.whatsapp,
    data.nombreCompleto,
    submittedAt,
  ]);

  return { success: true, submittedAt: submittedAt };
}

/**
 * EXISTING doPost — add this routing case inside your existing doPost(e) function:
 *
 *   if (payload.action === "traslado-submit") {
 *     result = handleTrasladoSubmit(payload);
 *   }
 */

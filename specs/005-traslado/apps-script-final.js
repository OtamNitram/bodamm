/**
 * Google Apps Script — RSVP + Traslado Web App
 *
 * Deploy as: Web App (Execute as: Me, Access: Anyone)
 *
 * Sheets:
 * - "RSVP" tab — Headers: groupId | firstName | lastName | attending | hasDietaryRestriction | dietaryDescription | submittedAt
 * - "Traslado" tab — Headers: zona | puntoDePartida | whatsapp | nombreCompleto | submittedAt
 *
 * Environment:
 * - Script Property "RSVP_SECRET" must be set via Project Settings → Script Properties
 */

var SHEET_NAME = "RSVP";
var TRASLADO_SHEET_NAME = "Traslado";
var SECRET_PROPERTY = "RSVP_SECRET";

function validateSecret(e) {
  var secret =
    PropertiesService.getScriptProperties().getProperty(SECRET_PROPERTY);
  var provided = e.parameter && e.parameter.secret ? e.parameter.secret : null;

  if (!provided && e.postData) {
    try {
      var body = JSON.parse(e.postData.contents);
      if (body.secret) return body.secret === secret;
    } catch (_) {}
  }

  return provided === secret;
}

function jsonResponse(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function normalizeForSearch(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// ─── Traslado handler ───────────────────────────────────────────────

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

  if (
    !data.zona ||
    !data.puntoDePartida ||
    !data.whatsapp ||
    !data.nombreCompleto
  ) {
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

// ─── GET handler — search guest ─────────────────────────────────────

function doGet(e) {
  if (!validateSecret(e)) {
    return jsonResponse({ error: "unauthorized" });
  }

  var action = e.parameter.action;

  if (action === "search") {
    var firstName = e.parameter.firstName || "";
    var lastName = e.parameter.lastName || "";

    if (!firstName || !lastName) {
      return jsonResponse({ error: "firstName and lastName are required" });
    }

    var sheet = getSheet();
    var data = sheet.getDataRange().getValues();
    var headers = data[0];

    var normalizedFirst = normalizeForSearch(firstName);
    var normalizedLast = normalizeForSearch(lastName);

    var matchedGroupId = null;
    for (var i = 1; i < data.length; i++) {
      var rowFirst = normalizeForSearch(String(data[i][1]));
      var rowLast = normalizeForSearch(String(data[i][2]));
      if (rowFirst === normalizedFirst && rowLast === normalizedLast) {
        matchedGroupId = String(data[i][0]);
        break;
      }
    }

    if (!matchedGroupId) {
      return jsonResponse({ found: false, group: null });
    }

    var members = [];

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === matchedGroupId) {
        var attending = data[i][3];
        var hasDiet = data[i][4];

        members.push({
          id: "m" + i,
          firstName: String(data[i][1]),
          lastName: String(data[i][2]),
          attending:
            attending === true || attending === "TRUE"
              ? true
              : attending === false || attending === "FALSE"
                ? false
                : null,
          hasDietaryRestriction: hasDiet === true || hasDiet === "TRUE",
          dietaryDescription: data[i][5] ? String(data[i][5]) : null,
        });
      }
    }

    return jsonResponse({
      found: true,
      group: {
        id: matchedGroupId,
        members: members,
      },
    });
  }

  return jsonResponse({ error: "unknown action" });
}

// ─── POST handler — submit RSVP or Traslado ────────────────────────

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
  } catch (_) {
    return jsonResponse({ error: "invalid JSON" });
  }

  if (!body.secret) {
    return jsonResponse({ error: "unauthorized" });
  }

  var secret =
    PropertiesService.getScriptProperties().getProperty(SECRET_PROPERTY);
  if (body.secret !== secret) {
    return jsonResponse({ error: "unauthorized" });
  }

  // Traslado
  if (body.action === "traslado-submit") {
    return jsonResponse(handleTrasladoSubmit(body));
  }

  // RSVP
  if (body.action === "submit") {
    var groupId = body.groupId;
    var members = body.members || [];
    var submittedAt = new Date().toISOString();

    if (!groupId || !members.length) {
      return jsonResponse({
        error: "validation_error",
        message: "groupId and members are required",
      });
    }

    var sheet = getSheet();
    var data = sheet.getDataRange().getValues();

    var memberMap = {};
    for (var m = 0; m < members.length; m++) {
      memberMap[members[m].id] = members[m];
    }

    var updated = 0;
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === groupId) {
        var memberId = "m" + i;
        var memberData = memberMap[memberId];

        if (memberData) {
          // Once attending is TRUE, it cannot be reverted to FALSE
          var currentAttending = data[i][3];
          var isCurrentlyAttending =
            currentAttending === true || currentAttending === "TRUE";
          var newAttending = isCurrentlyAttending || memberData.attending;
          sheet.getRange(i + 1, 4).setValue(newAttending ? "TRUE" : "FALSE");
          sheet
            .getRange(i + 1, 5)
            .setValue(memberData.hasDietaryRestriction ? "TRUE" : "FALSE");
          sheet
            .getRange(i + 1, 6)
            .setValue(memberData.dietaryDescription || "");
          sheet.getRange(i + 1, 7).setValue(submittedAt);
          updated++;
        }
      }
    }

    if (updated === 0) {
      return jsonResponse({
        error: "group_not_found",
        message: "Grupo no encontrado.",
      });
    }

    return jsonResponse({ success: true, submittedAt: submittedAt });
  }

  return jsonResponse({ error: "unknown action" });
}

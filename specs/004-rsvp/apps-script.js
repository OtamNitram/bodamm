/**
 * Google Apps Script — RSVP Web App
 *
 * Deploy as: Web App (Execute as: Me, Access: Anyone)
 * Sheet name: "RSVP"
 * Headers (row 1): groupId | firstName | lastName | attending | hasDietaryRestriction | dietaryDescription | submittedAt
 *
 * Environment:
 * - Script Property "RSVP_SECRET" must be set via Project Settings → Script Properties
 */

const SHEET_NAME = "RSVP";
const SECRET_PROPERTY = "RSVP_SECRET";

function validateSecret(e) {
  const secret =
    PropertiesService.getScriptProperties().getProperty(SECRET_PROPERTY);
  const provided =
    e.parameter && e.parameter.secret ? e.parameter.secret : null;

  if (!provided && e.postData) {
    try {
      const body = JSON.parse(e.postData.contents);
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

/**
 * GET handler — search guest by firstName + lastName
 * Params: action=search, firstName, lastName, secret
 */
function doGet(e) {
  if (!validateSecret(e)) {
    return jsonResponse({ error: "unauthorized" });
  }

  const action = e.parameter.action;

  if (action === "search") {
    const firstName = e.parameter.firstName || "";
    const lastName = e.parameter.lastName || "";

    if (!firstName || !lastName) {
      return jsonResponse({ error: "firstName and lastName are required" });
    }

    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data[0];

    const normalizedFirst = normalizeForSearch(firstName);
    const normalizedLast = normalizeForSearch(lastName);

    // Find matching guest
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

    // Collect all members of the group
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

/**
 * POST handler — submit RSVP data
 * Body: { action: "submit", secret, groupId, members }
 */
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

    // Build a lookup of member submissions by ID
    var memberMap = {};
    for (var m = 0; m < members.length; m++) {
      memberMap[members[m].id] = members[m];
    }

    // Update rows matching this group
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

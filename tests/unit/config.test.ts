import { describe, it, expect } from "vitest";
import { externalLinks } from "../../src/config/links";

describe("External Links Configuration", () => {
  it("should have valid HTTPS URLs for all external links", () => {
    // Spotify
    expect(externalLinks.spotify.playlistUrl).toMatch(/^https:\/\//);

    // Contact
    expect(externalLinks.contact.whatsappUrl).toMatch(/^https:\/\//);
    expect(externalLinks.contact.martinWhatsappUrl).toMatch(/^https:\/\//);
    expect(externalLinks.contact.marianaWhatsappUrl).toMatch(/^https:\/\//);

    // Maps (may be placeholders, but should be valid format)
    expect(externalLinks.maps.embedUrl).toMatch(/^https:\/\//);
    expect(externalLinks.maps.directionsUrl).toMatch(/^https:\/\//);

    // Photos (may be placeholders, but should be valid format)
    expect(externalLinks.photos.qrDestinationUrl).toMatch(/^https:\/\//);
    expect(externalLinks.photos.alternativeLinkUrl).toMatch(/^https:\/\//);
  });

  it("should have correct Spotify playlist URL", () => {
    expect(externalLinks.spotify.playlistUrl).toBe(
      "https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5",
    );
  });

  it("should have RSVP URLs", () => {
    expect(externalLinks.rsvp.pageUrl).toBe("/#asistencia");
    expect(externalLinks.rsvp.apiSearchUrl).toBe(
      "/.netlify/functions/rsvp-search",
    );
    expect(externalLinks.rsvp.apiSubmitUrl).toBe(
      "/.netlify/functions/rsvp-submit",
    );
  });

  it("should have all required link properties", () => {
    expect(externalLinks).toHaveProperty("spotify.playlistUrl");
    expect(externalLinks).toHaveProperty("contact.whatsappUrl");
    expect(externalLinks).toHaveProperty("contact.telegramUrl");
    expect(externalLinks).toHaveProperty("maps.embedUrl");
    expect(externalLinks).toHaveProperty("maps.directionsUrl");
    expect(externalLinks).toHaveProperty("photos.qrDestinationUrl");
    expect(externalLinks).toHaveProperty("photos.alternativeLinkUrl");
    expect(externalLinks).toHaveProperty("rsvp.pageUrl");
    expect(externalLinks).toHaveProperty("rsvp.apiSearchUrl");
    expect(externalLinks).toHaveProperty("rsvp.apiSubmitUrl");
    expect(externalLinks).toHaveProperty("contact.martinWhatsappUrl");
    expect(externalLinks).toHaveProperty("contact.marianaWhatsappUrl");
  });
});

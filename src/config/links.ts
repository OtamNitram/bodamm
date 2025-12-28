export interface ExternalLinks {
  spotify: {
    playlistUrl: string;
  };
  contact: {
    whatsappUrl: string;
    telegramUrl: string;
  };
  maps: {
    embedUrl: string;
    directionsUrl: string;
  };
  photos: {
    qrDestinationUrl: string;
    alternativeLinkUrl: string;
  };
  rsvp: {
    pageUrl: string;
  };
}

export const externalLinks: ExternalLinks = {
  spotify: {
    playlistUrl: "https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5",
  },
  contact: {
    whatsappUrl: "#whatsapp-mock", // Mock - will show alert
    telegramUrl: "#telegram-mock", // Mock - will show alert
  },
  maps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.9098383001774!2d-56.16353419282094!3d-34.74090144285013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a02c5556c45a9f%3A0x800c45f25ba49fa1!2sBodega%20Spinoglio!5e1!3m2!1sen!2suy!4v1766949030649!5m2!1sen!2suy",
    directionsUrl: "https://maps.app.goo.gl/xY8cXroUW537rZDYA",
  },
  photos: {
    qrDestinationUrl: "https://example.com/photos", // TODO: Replace with actual photo destination
    alternativeLinkUrl: "https://example.com/photos", // TODO: Replace with actual alternative link
  },
  rsvp: {
    pageUrl: "/rsvp",
  },
};

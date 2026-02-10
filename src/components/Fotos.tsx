import { externalLinks } from "../config/links";
import spotifyIcon from "../assets/icons/spotify.svg";
import { useScrollReveal } from "../hooks/useScrollReveal";

const SHOW_FOTOS = false;

export default function Fotos() {
  const temaikenesRef = useScrollReveal<HTMLDivElement>();
  const fotosRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative pt-24">
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        {/* Temaikenes */}
        <div
          id="temaikenes"
          ref={temaikenesRef}
          className="flex flex-col items-center gap-12 mb-24"
        >
          <h2 className="font-['Dancing_Script'] font-bold text-[36px] lg:text-[56px] text-brand-navy text-center leading-normal tracking-[0.02em]">
            Temaikenes
          </h2>

          {/* Spotify Section */}
          <div className="text-center w-full">
            <h3 className="text-[24px] lg:text-[28px] font-semibold text-brand-navy mb-4">
              ¿Qué canción no puede faltar?
            </h3>
            <p className="text-[18px] lg:text-[20px] text-brand-navy mb-8">
              Agregala a la playlist de Spotify y cuando suene en la fiesta DALO
              TODO 🕺🏻🕺🏻
            </p>
            <a
              href={externalLinks.spotify.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-darkGreen text-brand-linen px-4 py-2 rounded-xl text-[14px] font-semibold hover:bg-brand-eucalyptus transition-colors"
            >
              <span>Ir a Spotify</span>
              <img
                src={spotifyIcon.src}
                alt="Spotify"
                className="w-4 h-4 text-[#1bd75f]"
                style={{
                  filter:
                    "invert(67%) sepia(89%) saturate(401%) hue-rotate(88deg) brightness(97%) contrast(91%)",
                }}
              />
            </a>
          </div>

          {/* Photos Section - hidden until after the wedding */}
          {SHOW_FOTOS && (
            <div className="text-center w-full">
              <h3 className="text-[24px] lg:text-[28px] font-semibold text-brand-navy mb-4">
                ¿Sacaste fotos?
              </h3>
              <p className="text-[18px] lg:text-[20px] text-brand-navy mb-8">
                Obvio que sí. Y los novios las van a querer mirar mañana.
                <br />
                Escaneá el QR y subilas.
              </p>
              <div className="mb-4">
                <img
                  src="/qr-codes/photos-qr.png"
                  alt="QR Code - Subir Fotos"
                  className="w-[200px] h-[200px] mx-auto"
                />
              </div>
              <p className="text-[16px] lg:text-[18px] text-brand-navy">
                Si no funciona, hacé click en{" "}
                <a
                  href={externalLinks.photos.alternativeLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-darkGreen underline hover:text-brand-eucalyptus"
                >
                  este link
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Fotos - always visible placeholder with anchor */}
        <div
          ref={fotosRef}
          id="fotos"
          className="flex flex-col items-center gap-4 pb-24"
        >
          <h2 className="font-['Dancing_Script'] font-bold text-[36px] lg:text-[56px] text-brand-navy text-center leading-normal tracking-[0.02em]">
            Fotos
          </h2>
          <p className="text-[24px] lg:text-[28px] font-semibold text-brand-navy text-center max-w-[800px]">
            Vas a tener que esperar hasta abril para ver esta sección
          </p>
          <p className="text-[18px] lg:text-[20px] text-brand-navy text-center max-w-[800px]">
            Martín dice que sino se va a llenar de bots 👀
          </p>
        </div>
      </div>
    </section>
  );
}

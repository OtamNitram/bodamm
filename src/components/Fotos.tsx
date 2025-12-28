import { externalLinks } from "../config/links";

export default function Fotos() {
  return (
    <section
      id="fotos"
      className="relative py-24 bg-brand-linen overflow-hidden"
    >
      {/* Decorative Pattern */}
      <div className="absolute left-0 bottom-0 w-[538px] h-[1200px] opacity-20">
        <img
          src="https://www.figma.com/api/mcp/asset/6546075f-1d5f-4e5f-ba64-e39ab768bf33"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-12 relative z-10">
        <h2 className="font-['Dancing_Script'] font-normal text-[56px] text-brand-navy text-center mb-12 leading-normal">
          Fotos & Temaikenes
        </h2>

        <div className="flex flex-col gap-12 w-full">
          {/* Spotify Section */}
          <div className="text-center w-full">
            <h3 className="text-[28px] font-semibold text-brand-navy mb-4">
              ¿Qué canción no puede faltar?
            </h3>
            <p className="text-[20px] text-brand-navy mb-8">
              Agregala a la playlist de Spotify y cuando suene en la fiesta DALO
              TODO 🕺🏻🕺🏻
            </p>
            <a
              href={externalLinks.spotify.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-brand-darkGreen text-brand-linen px-4 py-2 rounded-xl text-[14px] font-semibold hover:bg-brand-eucalyptus transition-colors"
            >
              <span>Ir a Spotify</span>
              <span className="text-[#1bd75f]">♫</span>
            </a>
          </div>

          {/* Photos Section */}
          <div className="text-center w-full">
            <h3 className="text-[28px] font-semibold text-brand-navy mb-4">
              ¿Sacaste fotos?
            </h3>
            <p className="text-[20px] text-brand-navy mb-8">
              Obvio que sí. Y los novios las van a querer mirar mañana.
              <br />
              Escaneá el QR y subilas.
            </p>
            <div className="mb-4">
              <img
                src="https://www.figma.com/api/mcp/asset/7f80dd6e-d38b-430b-9d15-02e39cac58c1"
                alt="QR Code - Subir Fotos"
                className="w-[200px] h-[200px] mx-auto"
              />
            </div>
            <p className="text-[18px] text-brand-navy">
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
        </div>
      </div>
    </section>
  );
}

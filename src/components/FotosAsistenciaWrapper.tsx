import patternLeft from "../assets/images/pattern-left.png";
import Fotos from "./Fotos";
import Asistencia from "./Asistencia";

export default function FotosAsistenciaWrapper() {
  return (
    <div className="relative bg-brand-linen overflow-hidden">
      {/* Decorative Pattern - Left edge, spans both Fotos and Asistencia sections */}
      <div className="absolute bottom-0 left-0 w-[538px] h-[1200px] flex items-center justify-center pointer-events-none">
        <div className="rotate-[-90deg]">
          <div className="w-[1200px] h-[538px] opacity-10 relative overflow-hidden">
            <img
              src={patternLeft.src}
              alt=""
              className="absolute left-0 top-0 w-full h-[312%] max-w-none object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Content sections */}
      <Fotos />
      <Asistencia />
    </div>
  );
}

import giftlistBg from "../assets/images/giftlist-bg.jpg";
import iconGift from "../assets/images/icon-gift.svg";
import iconBank from "../assets/images/icon-bank.svg";

export default function GiftList() {
  return (
    <section id="gift-list" className="relative py-24 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src={giftlistBg.src}
          alt="Gift list background"
          loading="lazy"
          className="absolute w-full h-[204.53%] top-[-18.69%] left-0 object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(10,52,40,0.8)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-12 flex flex-col items-center gap-8 md:gap-12">
        <h2 className="font-['Dancing_Script'] font-normal text-[36px] md:text-[56px] text-brand-linen leading-normal text-center">
          Gift List
        </h2>

        <div className="text-center text-brand-linen text-[16px] md:text-[18px] leading-normal max-w-3xl px-2">
          <p className="mb-0">
            Lo que más nos importa es que vengas a{" "}
            <span className="font-bold">darlo todo en la pista</span> y a{" "}
            <span className="font-bold">
              tomarte hasta el agua de los floreros.
            </span>
          </p>
          <p>
            Pero si querés colaborar con nosotros, vamos a estar más que
            agradecidos.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">
            {/* My Chemical Romance */}
            <div className="bg-[rgba(10,52,40,0.85)] rounded-[20px] p-4 flex gap-4 md:gap-6 items-center h-auto md:h-[185px]">
              <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <img src={iconGift.src} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1 text-brand-linen">
                <h3 className="text-[20px] md:text-[28px] font-semibold mb-1 md:mb-2">
                  My Chemical Romance
                </h3>
                <p className="text-[14px] md:text-[18px]">ARS $ 420.500</p>
                <p className="text-[14px] md:text-[18px]">USD $ 300</p>
              </div>
            </div>

            {/* AC/DC + The Pretty Reckless */}
            <div className="bg-[rgba(10,52,40,0.85)] rounded-[20px] p-4 flex gap-4 md:gap-6 items-center h-auto md:h-[185px]">
              <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <img src={iconGift.src} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1 text-brand-linen">
                <h3 className="text-[20px] md:text-[28px] font-semibold mb-1 md:mb-2">
                  AC/DC + The Pretty Reckless
                </h3>
                <p className="text-[14px] md:text-[18px]">ARS $ 793.500</p>
                <p className="text-[14px] md:text-[18px]">USD $ 590</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Korn */}
            <div className="bg-[rgba(10,52,40,0.85)] rounded-[20px] p-4 flex gap-4 md:gap-6 items-center h-auto md:h-[185px]">
              <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <img src={iconGift.src} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1 text-brand-linen">
                <h3 className="text-[20px] md:text-[28px] font-semibold mb-1 md:mb-2">
                  Korn
                </h3>
                <p className="text-[14px] md:text-[18px]">ARS $ 517.500</p>
                <p className="text-[14px] md:text-[18px]">USD $ 390</p>
              </div>
            </div>

            {/* Cuentas */}
            <div className="bg-[rgba(249,242,232,0.8)] rounded-[20px] p-4 flex gap-4 md:gap-6 items-center h-auto md:h-[185px]">
              <div className="w-16 h-[53px] md:w-20 md:h-[66.47px] flex-shrink-0">
                <img src={iconBank.src} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1 text-brand-darkGreen">
                <h3 className="text-[20px] md:text-[28px] font-semibold mb-1 md:mb-2">
                  Cuentas
                </h3>
                <p className="text-[14px] md:text-[18px]">
                  <span className="font-bold">PayPal:</span>{" "}
                  mignonemarianam@gmail.com
                </p>
                <p className="text-[14px] md:text-[18px] font-bold">
                  Bco. Santander (UY): a definir
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GiftList() {
  return (
    <section id="gift-list" className="relative py-24 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://www.figma.com/api/mcp/asset/7b0cfb5d-5213-4a3d-8ac8-7daefcfd99e9"
          alt=""
          className="absolute w-full h-[204.53%] top-[-18.69%] left-0 object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(10,52,40,0.8)]" />
      </div>

      <div className="relative z-10 container mx-auto px-12 flex flex-col items-center gap-12">
        <h2 className="font-['Dancing_Script'] font-normal text-[56px] text-brand-linen leading-normal">
          Gift List
        </h2>

        <div className="text-center text-brand-linen text-[18px] leading-normal max-w-3xl">
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

        <div className="flex gap-6 w-full">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">
            {/* My Chemical Romance */}
            <div className="bg-[rgba(10,52,40,0.85)] rounded-[20px] p-4 flex gap-6 items-center h-[185px]">
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src="https://www.figma.com/api/mcp/asset/6268d682-ef89-4ca1-a7b7-9edc0b4cf903"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 text-brand-linen">
                <h3 className="text-[28px] font-semibold mb-2">
                  My Chemical Romance
                </h3>
                <p className="text-[18px]">ARS $ 420.500</p>
                <p className="text-[18px]">USD $ 300</p>
              </div>
            </div>

            {/* AC/DC + The Pretty Reckless */}
            <div className="bg-[rgba(10,52,40,0.85)] rounded-[20px] p-4 flex gap-6 items-center h-[185px]">
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src="https://www.figma.com/api/mcp/asset/6268d682-ef89-4ca1-a7b7-9edc0b4cf903"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 text-brand-linen">
                <h3 className="text-[28px] font-semibold mb-2">
                  AC/DC + The Pretty Reckless
                </h3>
                <p className="text-[18px]">ARS $ 793.500</p>
                <p className="text-[18px]">USD $ 590</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Korn */}
            <div className="bg-[rgba(10,52,40,0.85)] rounded-[20px] p-4 flex gap-6 items-center h-[185px]">
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src="https://www.figma.com/api/mcp/asset/6268d682-ef89-4ca1-a7b7-9edc0b4cf903"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 text-brand-linen">
                <h3 className="text-[28px] font-semibold mb-2">Korn</h3>
                <p className="text-[18px]">ARS $ 517.500</p>
                <p className="text-[18px]">USD $ 390</p>
              </div>
            </div>

            {/* Cuentas */}
            <div className="bg-[rgba(249,242,232,0.8)] rounded-[20px] p-4 flex gap-6 items-center h-[185px]">
              <div className="w-20 h-[66.47px] flex-shrink-0">
                <img
                  src="https://www.figma.com/api/mcp/asset/ca6aeacc-0a91-4816-b90b-1d13d26a221a"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 text-brand-darkGreen">
                <h3 className="text-[28px] font-semibold mb-2">Cuentas</h3>
                <p className="text-[18px]">
                  <span className="font-bold">PayPal:</span>{" "}
                  mignonemarianam@gmail.com
                </p>
                <p className="text-[18px] font-bold">
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

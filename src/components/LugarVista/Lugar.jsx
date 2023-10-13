import Header from "../header/Header";

export default function Lugar(props) {
  const container = {
    marginTop: "30px",
  };
  const {nombre,localizacion} = props
  const section = {
    width: "100%",
    maxWidth: "1024px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <>
      <Header></Header>

      <div
        style={container}
        className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
      >
        <section className="section px-6" style={section}>
          <h1>{nombre}</h1>
          <h1>{localizacion}</h1>
        </section>
      </div>
    </>
  );
}

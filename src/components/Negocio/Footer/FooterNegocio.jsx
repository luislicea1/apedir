import Contact from "../Contact/Contact";
import Logo from '../../../assets/LogoBlancoApp.png'

export default function FooterNegocio(props) {
  const sectionStyle = {
    width: "100%",
    maxWidth: "735px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#5E17EB",
    marginTop: '30px'

  };

  const imagen = {
    width: "100px",
    marginTop: '60px',
    marginBottom: "160px"
  }

  return (
   
    <section style={sectionStyle}>
        <Contact title = {props.title}></Contact>
        <a href="/">
            <img src={Logo} alt="" style={imagen}/>
        </a>
        
    </section>

  );
}

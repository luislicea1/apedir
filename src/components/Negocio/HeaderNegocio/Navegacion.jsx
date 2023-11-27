import React, { useEffect, useRef } from "react";
import { Link } from "react-scroll";

export default function Navegacion(props) {
 const listContainer = useRef(null);
 const lastViewedTitle = props.lastViewedTitle;
 
 useEffect(() => {
   const handleScroll = (e) => {
     e.preventDefault();
     let scrollAmount = 0;
     if (e.deltaY < 0) {
       scrollAmount = Math.max(-30, e.deltaY);
     } else {
       scrollAmount = Math.min(30, e.deltaY);
     }
     listContainer.current.scrollLeft += scrollAmount;
   };

   if (listContainer.current) {
     listContainer.current.addEventListener("wheel", handleScroll, {
       passive: false,
     });
   }

   return () => {
     if (listContainer.current) {
       listContainer.current.removeEventListener("wheel", handleScroll);
     }
   };
 }, []);

 const navegacion = {
   position: "sticky",
   height: "3rem",
   top: "4rem",
   zIndex: "40",
 };

 const flex = {
   display: "flex",
   gap: "30px",
   padding: "10px",
   width: "100%",
   flexDirection: "row",
   overflowX: "scroll",
   whiteSpace: "nowrap",
 };

 let links;
 if (props.links) {
   links = props.links;
 }
 return links !== null ? (
   <div style={navegacion}>
     <nav className="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
       <div className="flex z-40 w-full h-auto data-[menu-open=true]:border-none inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
         <div style={flex} ref={listContainer}>
           {links &&
             links.map((link, index) => (
               <li key={index}>
                <Link
                  activeClass="active"
                  to={link.category}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <a
                    href={`#${link.category}`}
                    style={{
                      color:
                        link.category === lastViewedTitle ? "white" : "black",
                      background:
                        link.category === lastViewedTitle
                          ? "black"
                          : "transparent",
                      borderRadius: "20px",
                      padding: "10px",
                    }}
                  >
                    {link.category}
                  </a>
                </Link>
               </li>
             ))}
         </div>
       </div>
     </nav>
   </div>
 ) : null;
}

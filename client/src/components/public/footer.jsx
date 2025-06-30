

// // export default Footer;
// import { Mail, Phone } from "lucide-react";
// import {
//     FaFacebookF,
//     FaInstagram,
//     FaTwitter,
//     FaYoutube,
//     FaLinkedinIn,
// } from "react-icons/fa";
// import logo from "@/assets/RD.png";

// export default function Footer() {
//     return (
//         <footer className="text-[#DCDCDC] bg-[#1E1E1E] py-10  sm:px-1">
//             <div className="  grid grid-cols-1  md:grid-cols-3  gap-10  text-left pl-4 mx-auto md:w-[80%] lg:px-10 ">
//                 {/* Logo & Address */}
//                 <div>
//                     <img
//                         src={logo}
//                         alt="Logo"
//                         className="w-100 md:w-60 sm:w-70 "
//                     />
//                     <h3 className="text-2xl font-bold mb-4">Find Us</h3>
//                     <p className="text-lg leading-relaxed">
//                         Best Wedding Photographers in Kolkata
//                         <br />
//                         Sector-4 , Salt Lake City, Kolkata-700091
//                         <br />
//                         Bidhannagar, Kolkata, West Bengal – 700006
//                         <br />
//                         <br />
//                         Delhi – 121, Floor-3rd, M G Road,
//                         <br />
//                         Powai Hill, Mumbai, Maharashtra – 4004774
//                     </p>
//                 </div>

//                 {/* Categories */}
//                 <div>
//                     <h3 className="text-2xl font-bold mb-4">Categories</h3>
//                     <ul className="space-y-2 text-lg leading-relaxed">
//                         {[
//                             "Bridal Makeup",
//                             "Bridal Style",
//                             "Latest Posts",
//                             "Mehandi Ideas",
//                             "Wedding Decors",
//                             "Weddings Dress & Jewellery",
//                             "Weddings Ideas",
//                             "Weddings Planning",
//                             "Weddings Song",
//                         ].map((item) => (
//                             <li
//                                 key={item}
//                                 className="hover:underline cursor-pointer">
//                                 › {item}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Contact Info */}
//                 <div>
//                     <h3 className="text-2xl font-bold mb-4">Opening Hours</h3>
//                     <p className="text-xl border border-white py-1 px-10 inline-block mb-6">
//                         Mon – Sun : Open 24 hours
//                     </p>
//                     <h3 className="text-2xl font-bold mt-5 mb-3">Contact Us</h3>
//                     <div className="flex items-center gap-3 text-xl mb-2">
//                         <Mail size={24} />
//                         <a
//                             href="mailto:thesparklingwedding@gmail.com"
//                             className="hover:underline">
//                             rahuldolai004@gmail.com
//                         </a>{" "}
//                     </div>
//                     <div className="flex items-center gap-3 text-xl">
//                         <Phone size={24} />
//                         <a href="tel:+9800974692" className="hover:underline">
//                             +91 980 097 4692
//                         </a>
//                     </div>
//                     <p className="mb-6 mt-6 text-2xl font-bold   "> Join Us</p>
//                     <p className="mt-6 font-bold text-2xl ">Follow Us</p>
//                     <div className="flex gap-6 mt-4">
//                         <FaFacebookF
//                             size={30}
//                             className="hover:text-pink-500 cursor-pointer"
//                         />
//                         <FaInstagram
//                             size={30}
//                             className="hover:text-pink-500 cursor-pointer"
//                         />
//                         <FaTwitter
//                             size={30}
//                             className="hover:text-pink-500 cursor-pointer"
//                         />
//                         <FaYoutube
//                             size={30}
//                             className="hover:text-pink-500 cursor-pointer"
//                         />
//                         <FaLinkedinIn
//                             size={30}
//                             className="hover:text-pink-500 cursor-pointer"
//                         />
//                     </div>{" "}
//                 </div>
//             </div>
//         </footer>
//     );
// }

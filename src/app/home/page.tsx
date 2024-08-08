// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import Main from "../components/main/main";
// import Image from 'next/image';
// import { motion, useScroll } from "framer-motion";
// import Loader from "../components/loader/loader";
// import { endpoint } from "../../../utils/endpoint";

// const Home: React.FC = () => {
//   const { scrollYProgress } = useScroll();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);
//   const checkboxRef = useRef<HTMLInputElement>(null);

//   const toggleCheckbox = () => {
//     if (checkboxRef.current) {
//       checkboxRef.current.checked = !checkboxRef.current.checked;
//     }
//   };

//   useEffect(() => {
//     const fakeDataFetch = () => {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 2000);
//     };

//     fakeDataFetch();
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("userData");
//     setTimeout(() => {
//       window.location.reload();
//     }, 400);
//   };

//   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//   const fullName = userData.fullName || "";

//   return isLoading ? (
//     <Loader />
//   ) : (
//     <div id="home" className="relative overflow-hidden">
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="relative z-10">
//         <input
//           type="checkbox"
//           className="hidden"
//           id="navi-toggle"
//           ref={checkboxRef}
//         />

//         <label htmlFor="navi-toggle" className="fixed top-8 left-8 cursor-pointer z-20">
//           <span className="block w-8 h-8 bg-gray-900"></span>
//         </label>

//         <div className="fixed inset-0 z-10 bg-black opacity-75 hidden" aria-hidden="true"></div>

//         <nav className="fixed top-0 left-0 w-64 bg-gray-900 h-full z-30 hidden">
//           <ul className="flex flex-col items-start p-8 space-y-4">
//             <li>
//               <div onClick={toggleCheckbox}>
//                 <a href="#" className="text-white text-xl">Home</a>
//               </div>
//             </li>
//             <li>
//               <div onClick={toggleCheckbox}>
//                 <a href="#about" className="text-white text-xl">About</a>
//               </div>
//             </li>
//             <li>
//               <div onClick={toggleCheckbox}>
//                 <a href="#events" className="text-white text-xl">Events</a>
//               </div>
//             </li>
//             <li>
//               <div onClick={toggleCheckbox}>
//                 <a href="#team" className="text-white text-xl">Team</a>
//               </div>
//             </li>
//             {fullName ? (
//               <li>
//                 <div>
//                   <a
//                     href=""
//                     onClick={logout}
//                     className="text-white text-xl"
//                   >
//                     Logout
//                   </a>
//                 </div>
//               </li>
//             ) : (
//               <li>
//                 <div>
//                   <a
//                     href=""
//                     onClick={() => router.push("/login")}
//                     className="text-white text-xl"
//                   >
//                     Login
//                   </a>
//                 </div>
//               </li>
//             )}
//           </ul>
//         </nav>

//         <div className="relative h-screen w-full">
//           <div className="absolute inset-0 bg-black opacity-75"></div>
//           <div className="relative z-10">
//             <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop>
//               <source src={`${endpoint}/public/video/loader1.mp4`} type="video/mp4" />
//               Your browser is not supported!
//             </video>
//           </div>
//         </div>

//         <header className="relative z-20 text-center py-20">
//           <div className="mb-8">
//             <Image className="mx-auto" src={`${endpoint}/public/img/zorphix-landing-logo.png`} alt="clg-logo" width={150} height={150} />
//           </div>

//           <div className="text-white">
//             <div className="mb-4">
//               <Image className="mx-auto" src={`${endpoint}/public/img/zorphix-landing-logo.png`} alt="new-logo" width={200} height={50} />
//               <Image className="mx-auto" src={`${endpoint}/public/img/zorphix-landing-logo.png`} alt="zorphix-logo" width={300} height={75} />
//             </div>
//             <h1 className="text-2xl mb-8">September 20th 2023</h1>
//             <a
//               href="https://drive.google.com/file/d/1dMm0oCW53daJt7EmHRQF6yqpZOane29A/view?usp=sharing"
//               className="inline-block bg-white text-black font-bold py-2 px-4 rounded transition duration-200 hover:bg-gray-200"
//               target="_blank"
//             >
//               CIT Bus Routes ↗
//             </a>
//           </div>
//         </header>

//         <Main />
//       </div>
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-blue-500"
//         style={{ scaleX: scrollYProgress }}
//         initial={{ scaleX: 0 }}
//       />
//     </div>
//   );
// };

// export default Home;

"use client";

import Main from '../components/main/main';
import React from 'react';

const home: React.FC = () => {
  return <div>
    <p>Home Section</p>
    <Main/>
  </div>;
};

export default home;




"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Environment } from "@react-three/drei";
import {Model} from "./Model";

import "./ImageAnimation.css";



gsap.registerPlugin(ScrollTrigger);

const ImageAnimation = () => {
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const nextSectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const modelRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {

      gsap.to(logoRef.current, {
        y: -20, // Move up
        duration: 2, // Time for one cycle
        repeat: -1, // Infinite loop
        yoyo: true, // Move up and down
        ease: "power1.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
          markers: true, // Debugging (remove later)
          pin: true,
        },
      });

      // Scale up the logo from the center
      tl.to(logoRef.current, {
        scale: 20,
        opacity:0,
        scrub: true,
        ease:"power2.inOut",
        duration: 2,
        
      });

      gsap.fromTo(
        leftContentRef.current,
        { x: "-100vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: nextSectionRef.current,
            start: "top 98%",
            end:"top 40%",
            scrub: true,
            toggleActions: "play reverse none none",
          },
        }
      );

      gsap.fromTo(
        rightContentRef.current,
        { x: "100vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: nextSectionRef.current,
            start: "top 98%",
            end:"top 40%",
            scrub: true,
            toggleActions: "play reverse none none",
          },
        }
      );

    }, containerRef);

   /*  ScrollTrigger.create({
        trigger: textRef.current,
        start: "center 90%", // Adjust based on when you want the effect
        onEnter: () => gsap.set(logoRef.current, { visibility: "hidden" }), // Instantly hide
        onLeaveBack: () => gsap.set(logoRef.current, { visibility: "visible" }), // Show again when scrolling up
      }); */





    return () => ctx.revert(); // Cleanup animation
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const xMove = (clientX / window.innerWidth - 0.5) * 2; // Normalize to [-1, 1]
    const yMove = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x: xMove, y: yMove });
  };



  return (
    <>
     {/* <Spline
        style={{inset: 0, position: 'absolute', width: '100%', height: '100%'}} 
        scene="https://prod.spline.design/wCc9D7FpuHZv9XIY/scene.splinecode"
       
    /> */}
       
   
    <div ref={containerRef} className="hero-container">
      {/* <img ref={logoRef} className="logo-container" src="/img/zo-silver.png"/> */}
      

      <Canvas camera={{ position: [0, 0, 10] }} ref={logoRef} className="logo-container">
          <ambientLight intensity={5} />
          <directionalLight position={[2, 10, 10]} intensity={5} />
          <directionalLight position={[-2, -10, 10]} intensity={10} />
          
           
          <Stage>
            <LogoModel/>
{/*             <Model ref={modelRef} scale={2.5} position={[Math.PI/2, 0, 0]}/>
 */}
          </Stage>
          
          <OrbitControls enableZoom={false} enablePan={true} enableRotate={true}/>
          
          
    </Canvas>
  
      
    </div>
    
    <div ref={nextSectionRef} className="next-section">
        <div ref={leftContentRef} className="left-content">
          <h2>Left Content</h2>
          <p>This content slides in from the left.</p>
        </div>
        <div ref={rightContentRef} className="right-content">
          <h2>Right Content</h2>
          <p>This content slides in from the right.</p>
          <p>This content slides in from the right.</p>

        </div>
      </div>
    

  </>

  );
};


const LogoModel = () =>  {
  const { scene } = useGLTF("/z2.glb"); 


  return (
    <mesh scale={0.1} position={[0, 0, 0]} rotation={[Math.PI /2, 0, 0]}>
      <primitive object={scene}/>
    </mesh>
  );
};

export default ImageAnimation;



    

      {/* Hero Content */}
      {/* <div ref={textRef} className="hero-content">
        <h1>Welcome to Our Website</h1>
        <p>Your journey begins here.</p>
      </div> */}



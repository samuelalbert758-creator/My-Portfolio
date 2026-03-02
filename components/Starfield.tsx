"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Starfield() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );
    camera.position.z = 1000;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Stars
    const starCount = 6000;
    const starsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    //canvas
    const size = 16;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "white";
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    context.fill();

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = Math.random() * 2000;
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    // Points material — simple white circles
    const circleTexture = new THREE.CanvasTexture(canvas);
    const starsMaterial = new THREE.PointsMaterial({
      map: circleTexture,
      // color: 0xffffff,
      size: 2,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true, // makes distant stars appear smaller
    });

    const baseSize = 0.5;
    const twinkleAmount = 0.5;
    const maxSize = 0.5;

    starsMaterial.size = Math.min(
      baseSize + Math.sin(Date.now() * 0.002) * twinkleAmount,
      maxSize,
    );

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation
    const starSpeed = 1; // reduce this to slow stars
    const animate = () => {
      requestAnimationFrame(animate);

      const posArray = stars.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < starCount; i++) {
        posArray[i * 3 + 2] -= starSpeed;
        if (posArray[i * 3 + 2] < 0) {
          posArray[i * 3 + 2] = 2000;
        }
      }

      stars.geometry.attributes.position.needsUpdate = true;

      // Parallax
      camera.position.x += (mouse.x * 50 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 50 - camera.position.y) * 0.02;

      // Twinkle effect
      starsMaterial.size = 2 + Math.sin(Date.now() * 0.002) * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
    />
  );
}

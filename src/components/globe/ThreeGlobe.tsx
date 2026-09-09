"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface ThreeGlobeProps {
  className?: string;
  markerLat?: number;
  markerLon?: number;
  markerLabel?: string;
}

export function ThreeGlobe({
  className = "",
  markerLat = -26.1076,
  markerLon = 28.0567,
  markerLabel = "Sandton, Johannesburg, South Africa",
}: ThreeGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let globe: THREE.Mesh;
    let marker: THREE.Mesh;
    let markerPulse: THREE.Mesh;
    let running = true;
    let rotY = 0.7;
    let animationId: number;
    let io: IntersectionObserver | null = null;

    let handleResize: () => void;

    const init = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 2.8;

      const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
      const globeMaterial = new THREE.MeshBasicMaterial({
        color: 0x050507,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      globe = new THREE.Mesh(globeGeometry, globeMaterial);
      scene.add(globe);

      const wireGeometry = new THREE.SphereGeometry(1.01, 64, 64);
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x378add,
        transparent: true,
        opacity: 0.012,
        wireframe: true,
        side: THREE.DoubleSide,
      });
      const wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
      scene.add(wireframe);

      const dotsGeometry = new THREE.BufferGeometry();
      const dotCount = 2400;
      const positions = new Float32Array(dotCount * 3);
      const alphas = new Float32Array(dotCount);
      const sizes = new Float32Array(dotCount);

      for (let i = 0; i < dotCount; i++) {
        const lat = (Math.floor(i / 80) / 29 - 0.5) * Math.PI;
        const lon = (i % 80) / 80 * Math.PI * 2;
        const r = 1.02;
        positions[i * 3] = r * Math.cos(lat) * Math.cos(lon);
        positions[i * 3 + 1] = r * Math.sin(lat);
        positions[i * 3 + 2] = r * Math.cos(lat) * Math.sin(lon);
        alphas[i] = 0.2 + Math.random() * 0.5;
        sizes[i] = 0.8 + Math.random() * 1.2;
      }

      dotsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      dotsGeometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
      dotsGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const dotsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.022,
        transparent: true,
        opacity: 1,
        vertexColors: false,
        sizeAttenuation: true,
      });

      const dots = new THREE.Points(dotsGeometry, dotsMaterial);
      scene.add(dots);

      const latRad = (markerLat * Math.PI) / 180;
      const lonRad = (markerLon * Math.PI) / 180;
      const markerRadius = 1.05;
      const markerX = markerRadius * Math.cos(latRad) * Math.cos(lonRad);
      const markerY = markerRadius * Math.sin(latRad);
      const markerZ = markerRadius * Math.cos(latRad) * Math.sin(lonRad);

      const markerGeometry = new THREE.SphereGeometry(0.035, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0x22c55e,
        transparent: true,
        opacity: 1,
      });
      marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(markerX, markerY, markerZ);
      scene.add(marker);

      const pulseGeometry = new THREE.SphereGeometry(0.035, 16, 16);
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: 0x22c55e,
        transparent: true,
        opacity: 0.5,
        side: THREE.BackSide,
      });
      markerPulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      markerPulse.position.set(markerX, markerY, markerZ);
      scene.add(markerPulse);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const dirLight = new THREE.DirectionalLight(0x378add, 0.3);
      dirLight.position.set(2, 2, 3);
      scene.add(dirLight);

      const animate = () => {
        if (!running) return;
        if (!isReducedMotion) animationId = requestAnimationFrame(animate);

        if (!isReducedMotion) rotY += 0.001;
        globe.rotation.y = rotY;
        wireframe.rotation.y = rotY;
        dots.rotation.y = rotY;
        marker.position.set(markerX * Math.cos(rotY) + markerZ * Math.sin(rotY), markerY, markerZ * Math.cos(rotY) - markerX * Math.sin(rotY));
        markerPulse.position.copy(marker.position);

        const pulseScale = 1 + Math.sin(performance.now() / 400) * 0.3;
        markerPulse.scale.setScalar(pulseScale);
        (markerPulse.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(performance.now() / 400) * 0.2;

        renderer.render(scene, camera);
      };

      handleResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        renderer.setPixelRatio(dpr);
      };

      window.addEventListener("resize", handleResize);

      io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (running) return;
            running = true;
            animate();
          } else {
            running = false;
            if (animationId) cancelAnimationFrame(animationId);
          }
        },
        { threshold: 0.1 }
      );
      io.observe(container);

      animate();
      setIsLoaded(true);
    };

    try {
      init();
    } catch {
      setIsLoaded(false);
    }

    return () => {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      if (io) io.disconnect();
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      }
      if (scene) {
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material?.dispose();
            }
          }
          if (obj instanceof THREE.Points) {
            obj.geometry?.dispose();
            obj.material?.dispose();
          }
        });
      }
    };
  }, [isReducedMotion, markerLat, markerLon, markerLabel]);

  return (
    <div
      ref={containerRef}
      className={`three-globe relative w-full h-full ${className}`}
      aria-hidden="true"
      aria-label={`Interactive globe showing ${markerLabel}`}
      style={{ minHeight: "200px" }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white/40 font-display text-label-sm">
          Sandton, Johannesburg
        </div>
      )}
    </div>
  );
}

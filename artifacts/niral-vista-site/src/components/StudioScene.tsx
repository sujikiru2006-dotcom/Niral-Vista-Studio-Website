import { useEffect, useRef } from 'react';
import type * as ThreeTypes from 'three';

export default function StudioScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let canceled = false;
    let cleanup: (() => void) | undefined;
    void import('three').then((THREE) => {
    if (canceled) return;
    let renderer: ThreeTypes.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: window.devicePixelRatio < 2, powerPreference: 'low-power' });
    } catch {
      canvas.dataset.fallback = 'true';
      return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.set(0, 0, 7.4);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    const group = new THREE.Group();
    scene.add(group);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xd5b66f, metalness: .7, roughness: .23, clearcoat: 1, clearcoatRoughness: .18,
      emissive: new THREE.Color(0x5d421b), emissiveIntensity: .25,
      wireframe: false, transparent: true, opacity: .94,
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.22, 4), material);
    group.add(core);
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.255, 2), new THREE.MeshBasicMaterial({ color: 0xf0d995, wireframe: true, transparent: true, opacity: .19 }));
    group.add(wire);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xe5c77e, transparent: true, opacity: .58, side: THREE.DoubleSide });
    const rings = [
      { mesh: new THREE.Mesh(new THREE.TorusGeometry(1.65, .006, 8, 160), ringMaterial), rotation: [1.02, .12, -.42] },
      { mesh: new THREE.Mesh(new THREE.TorusGeometry(1.83, .004, 8, 180), new THREE.MeshBasicMaterial({ color: 0x9f8552, transparent: true, opacity: .42 })), rotation: [.34, .82, .9] },
      { mesh: new THREE.Mesh(new THREE.TorusGeometry(1.48, .003, 8, 150), new THREE.MeshBasicMaterial({ color: 0xffe3a0, transparent: true, opacity: .28 })), rotation: [1.4, .9, .25] },
    ];
    rings.forEach(({ mesh, rotation }) => {
      mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
      group.add(mesh);
    });
    const points = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      const r = 1.55 + Math.random() * 1.05;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      points[i * 3] = r * Math.sin(p) * Math.cos(t);
      points[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      points[i * 3 + 2] = r * Math.cos(p);
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(points, 3));
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xf6d68e, size: .018, transparent: true, opacity: .72, sizeAttenuation: true }));
    group.add(stars);
    scene.add(new THREE.HemisphereLight(0xfce9bd, 0x302a25, 1.4));
    const key = new THREE.PointLight(0xffd47c, 23, 9);
    key.position.set(2.4, 2.1, 3.5);
    scene.add(key);
    const fill = new THREE.PointLight(0x9b7b43, 12, 8);
    fill.position.set(-3, -1, 1.8);
    scene.add(fill);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 520 ? 8.7 : 7.4;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    let frame = 0;
    let raf = 0;
    let visible = true;
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibility.observe(canvas);
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      frame += .006;
      group.rotation.y = frame * .45;
      group.rotation.x = Math.sin(frame * .55) * .08;
      core.rotation.y = frame * .12;
      wire.rotation.y = -frame * .1;
      stars.rotation.y = -frame * .08;
      renderer.render(scene, camera);
    };
    animate();
    cleanup = () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      visibility.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((item) => item.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
    };
    });
    return () => {
      canceled = true;
      cleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="studio-canvas" aria-hidden="true" />;
}

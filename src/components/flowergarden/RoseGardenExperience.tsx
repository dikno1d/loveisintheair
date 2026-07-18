'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import gsap from 'gsap';
import type { ScenePhase } from './rose-garden-state';
import { GARDEN_MESSAGES, ROSE_COLORS } from './rose-garden-state';

const ROSE_MODEL_URL = 'https://happy358.github.io/Images/Model/red_rose3.obj';

interface Props {
  phase: ScenePhase;
  onBloomDone: () => void;
  onScatterDone: () => void;
  onGardenReady: () => void;
  onGardenRoseClick: (msg: string) => void;
  onReady?: () => void;
}

export default function RoseGardenExperience({ phase, onBloomDone, onScatterDone, onGardenReady, onGardenRoseClick, onReady }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rafRef = useRef<number>(0);
  const clockRef = useRef(new THREE.Clock());
  const bloomComposerRef = useRef<any>(null);
  const readyFired = useRef(false);

  const roseModelRef = useRef<THREE.Group | null>(null);
  const roseGroupRef = useRef<THREE.Group | null>(null);

  const gardenRosesRef = useRef<THREE.Mesh[]>([]);
  const gardenButterfliesRef = useRef<THREE.Group[]>([]);
  const gardenFirefliesRef = useRef<THREE.Points | null>(null);
  const gardenPetalsRef = useRef<THREE.Points | null>(null);
  const gardenTreesRef = useRef<THREE.Group[]>([]);
  const gardenLanternsRef = useRef<THREE.Group[]>([]);
  const gardenPathsRef = useRef<THREE.Mesh[]>([]);
  const gardenBenchRefs = useRef<THREE.Group[]>([]);
  const gardenPondRef = useRef<THREE.Mesh | null>(null);
  const grassRef = useRef<THREE.InstancedMesh | null>(null);
  const grassOrigRef = useRef<Float32Array | null>(null);

  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientRef = useRef<THREE.AmbientLight | null>(null);
  const bloomLightRef = useRef<THREE.PointLight | null>(null);

  const roseClickTargetsRef = useRef<THREE.Object3D[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const bloomTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const scatterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const gardenTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const gardenRoseMsgIdx = useRef(0);
  const windRef = useRef({ strength: 0, gust: 0 });

  const gardenPositions = useRef<{ x: number; z: number; color: number[]; scale: number; rotY: number }[]>([]);

  const initScene = useCallback(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0a14);
    scene.fog = new THREE.FogExp2(0x0d0a14, 0.018);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 3, 12);
    camera.lookAt(0, 1.5, 0);
    cameraRef.current = camera;

    const ambient = new THREE.AmbientLight(0xffeedd, 0.35);
    scene.add(ambient);
    ambientRef.current = ambient;

    const sunLight = new THREE.DirectionalLight(0xffeedd, 0.7);
    sunLight.position.set(5, 8, 5);
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    const warmLight = new THREE.PointLight(0xff9966, 0.5, 15);
    warmLight.position.set(-3, 3, 2);
    scene.add(warmLight);

    const roseSpot = new THREE.SpotLight(0xffe0cc, 2, 12, Math.PI / 5, 0.5);
    roseSpot.position.set(0, 6, 3);
    roseSpot.target.position.set(0, 1.5, 0);
    scene.add(roseSpot);
    scene.add(roseSpot.target);

    const bloomLight = new THREE.PointLight(0xffcc66, 0, 5);
    bloomLight.position.set(0, 2, 0);
    scene.add(bloomLight);
    bloomLightRef.current = bloomLight;

    const groundMat = new THREE.MeshStandardMaterial({ color: 0x1a3318, roughness: 0.95, metalness: 0 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    scene.add(ground);

    // === GRASS ===
    const grassCount = 3000;
    const grassGeo = new THREE.PlaneGeometry(0.04, 0.4, 1, 4);
    grassGeo.translate(0, 0.2, 0);
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x2d6a1e, roughness: 0.8, side: THREE.DoubleSide });
    const grass = new THREE.InstancedMesh(grassGeo, grassMat, grassCount);
    const dummy = new THREE.Object3D();
    const origPositions = new Float32Array(grassCount * 3);
    for (let i = 0; i < grassCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 20;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const s = 0.6 + Math.random() * 0.8;
      dummy.position.set(x, 0, z);
      dummy.scale.set(1, s, 1);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.updateMatrix();
      grass.setMatrixAt(i, dummy.matrix);
      origPositions[i * 3] = x;
      origPositions[i * 3 + 1] = s;
      origPositions[i * 3 + 2] = z;
    }
    grass.instanceMatrix.needsUpdate = true;
    scene.add(grass);
    grassRef.current = grass;
    grassOrigRef.current = origPositions;

    // === ROSE GROUP (for the OBJ model) ===
    const roseGroup = new THREE.Group();
    roseGroup.position.set(0, 0, 0);
    roseGroup.scale.setScalar(0);
    scene.add(roseGroup);
    roseGroupRef.current = roseGroup;

    // Load OBJ rose model
    const loader = new OBJLoader();
    loader.load(
      ROSE_MODEL_URL,
      (obj) => {
        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            let mat: THREE.MeshStandardMaterial;

            if (child.name === 'rose') {
              mat = new THREE.MeshStandardMaterial({
                color: 0xcc1133,
                roughness: 0.6,
                metalness: 0.05,
                side: THREE.DoubleSide,
              });
            } else if (child.name === 'calyx') {
              mat = new THREE.MeshStandardMaterial({
                color: 0x001a14,
                roughness: 0.8,
                side: THREE.DoubleSide,
              });
            } else if (child.name === 'leaf1' || child.name === 'leaf2') {
              mat = new THREE.MeshStandardMaterial({
                color: 0x00331b,
                roughness: 0.7,
                side: THREE.DoubleSide,
              });
            } else {
              mat = new THREE.MeshStandardMaterial({
                color: 0xcc1133,
                roughness: 0.6,
                metalness: 0.05,
                side: THREE.DoubleSide,
              });
            }
            mesh.material = mat;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        obj.rotation.set(0, Math.PI / 1.7, 0);
        obj.scale.setScalar(0.8);
        roseGroup.add(obj);
        roseModelRef.current = obj;

        if (!readyFired.current) {
          readyFired.current = true;
          onReady?.();
        }
      },
      undefined,
      () => {
        // On error, create a fallback procedural rose
        createFallbackRose(roseGroup);
        if (!readyFired.current) {
          readyFired.current = true;
          onReady?.();
        }
      }
    );

    // === GARDEN ROSES ===
    const rings = [
      { count: 12, radius: 3.5 },
      { count: 20, radius: 5.5 },
      { count: 28, radius: 7.5 },
      { count: 36, radius: 9.5 },
    ];
    const positions: typeof gardenPositions.current = [];
    rings.forEach((ring) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
        const r = ring.radius + (Math.random() * 0.8 - 0.4);
        const color = ROSE_COLORS[Math.floor(Math.random() * ROSE_COLORS.length)];
        positions.push({
          x: Math.cos(angle) * r,
          z: Math.sin(angle) * r,
          color,
          scale: 0.25 + Math.random() * 0.2,
          rotY: Math.random() * Math.PI * 2,
        });
      }
    });
    gardenPositions.current = positions;

    const gardenRoseMatBase = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.05, side: THREE.DoubleSide });
    positions.forEach((gp) => {
      const color = new THREE.Color(gp.color[0], gp.color[1], gp.color[2]);
      const mat = gardenRoseMatBase.clone();
      mat.color = color;

      // Create a small procedural rose bud for garden roses
      const budGroup = new THREE.Group();

      // Bud (sphere with petals look)
      const budGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const bud = new THREE.Mesh(budGeo, mat);
      bud.position.y = 0.35;
      budGroup.add(bud);

      // Stem
      const stemGeo = new THREE.CylinderGeometry(0.008, 0.012, 0.4, 4);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x2d5a1e, roughness: 0.8 });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.y = 0.12;
      budGroup.add(stemMesh);

      budGroup.position.set(gp.x, 0, gp.z);
      budGroup.rotation.y = gp.rotY;
      budGroup.scale.setScalar(0);
      budGroup.userData.isGardenRose = true;
      budGroup.userData.targetScale = gp.scale;
      scene.add(budGroup);
      gardenRosesRef.current.push(budGroup as any);
      roseClickTargetsRef.current.push(budGroup);
    });

    // === CHERRY TREES ===
    const treeTrunkGeo = new THREE.CylinderGeometry(0.08, 0.12, 2, 6);
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3020, roughness: 0.9 });
    const treeFoliageMat = new THREE.MeshStandardMaterial({ color: 0xffb7c5, roughness: 0.6, transparent: true, opacity: 0.85 });
    [
      { x: -5, z: -3 }, { x: 5, z: -4 }, { x: -4, z: 4 }, { x: 6, z: 3 },
      { x: -7, z: 0 }, { x: 7, z: -1 }, { x: 0, z: -6 }, { x: -2, z: 6 },
    ].forEach((pos) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
      trunk.position.y = 1;
      tree.add(trunk);
      const foliage = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 8), treeFoliageMat);
      foliage.position.y = 2.2;
      foliage.scale.set(1, 0.7, 1);
      tree.add(foliage);
      tree.position.set(pos.x, 0, pos.z);
      tree.scale.setScalar(0);
      scene.add(tree);
      gardenTreesRef.current.push(tree);
    });

    // === LANTERNS ===
    const lanternPostMat = new THREE.MeshStandardMaterial({ color: 0x3a3020, roughness: 0.85 });
    const lanternLightMat = new THREE.MeshStandardMaterial({ color: 0xffcc66, emissive: 0xffcc66, emissiveIntensity: 0.5 });
    [
      { x: -2.5, z: -2 }, { x: 2.5, z: -2.5 }, { x: -3, z: 2 }, { x: 3, z: 1.5 },
      { x: 0, z: -4 }, { x: -1, z: 4 },
    ].forEach((pos) => {
      const lantern = new THREE.Group();
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 1.2, 6), lanternPostMat);
      post.position.y = 0.6;
      lantern.add(post);
      const light = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), lanternLightMat);
      light.position.y = 1.25;
      lantern.add(light);
      const pl = new THREE.PointLight(0xffcc66, 0.3, 4);
      pl.position.y = 1.25;
      lantern.add(pl);
      lantern.position.set(pos.x, 0, pos.z);
      lantern.scale.setScalar(0);
      scene.add(lantern);
      gardenLanternsRef.current.push(lantern);
    });

    // === PATHS ===
    const pathMat = new THREE.MeshStandardMaterial({ color: 0x888078, roughness: 0.92 });
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const pathGeo = new THREE.BoxGeometry(0.3, 0.02, 8);
      const pathMesh = new THREE.Mesh(pathGeo, pathMat);
      pathMesh.position.set(Math.cos(angle) * 4, 0.005, Math.sin(angle) * 4);
      pathMesh.rotation.y = angle;
      pathMesh.scale.setScalar(0);
      scene.add(pathMesh);
      gardenPathsRef.current.push(pathMesh);
    }

    // === BENCHES ===
    const benchMat = new THREE.MeshStandardMaterial({ color: 0x5a4030, roughness: 0.88 });
    [
      { x: -3.5, z: 0, ry: Math.PI / 2 },
      { x: 3.5, z: 0, ry: -Math.PI / 2 },
      { x: 0, z: 3.5, ry: 0 },
    ].forEach((pos) => {
      const bench = new THREE.Group();
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.04, 0.25), benchMat);
      seat.position.y = 0.35;
      bench.add(seat);
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.25, 0.03), benchMat);
      back.position.set(0, 0.5, -0.12);
      bench.add(back);
      [0.3, -0.3].forEach((lx) => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.35, 0.2), benchMat);
        leg.position.set(lx, 0.175, 0);
        bench.add(leg);
      });
      bench.position.set(pos.x, 0, pos.z);
      bench.rotation.y = pos.ry;
      bench.scale.setScalar(0);
      scene.add(bench);
      gardenBenchRefs.current.push(bench);
    });

    // === POND ===
    const pondGeo = new THREE.CircleGeometry(1.2, 32);
    const pondMat = new THREE.MeshStandardMaterial({ color: 0x1a3355, roughness: 0.1, metalness: 0.6, transparent: true, opacity: 0.8 });
    const pond = new THREE.Mesh(pondGeo, pondMat);
    pond.rotation.x = -Math.PI / 2;
    pond.position.set(0, 0.01, -5);
    pond.scale.setScalar(0);
    scene.add(pond);
    gardenPondRef.current = pond;

    // === BUTTERFLIES ===
    for (let i = 0; i < 8; i++) {
      const bfGroup = new THREE.Group();
      const wingMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x9b72cf : 0xe8a0bf,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const wingGeo = new THREE.PlaneGeometry(0.04, 0.06);
      const wingL = new THREE.Mesh(wingGeo, wingMat);
      wingL.position.x = -0.025;
      bfGroup.add(wingL);
      const wingR = new THREE.Mesh(wingGeo, wingMat);
      wingR.position.x = 0.025;
      bfGroup.add(wingR);
      bfGroup.position.set(
        (Math.random() - 0.5) * 10,
        1.5 + Math.random() * 2,
        (Math.random() - 0.5) * 10
      );
      bfGroup.userData.phase = Math.random() * Math.PI * 2;
      bfGroup.userData.speed = 0.3 + Math.random() * 0.5;
      bfGroup.userData.radius = 2 + Math.random() * 3;
      bfGroup.userData.center = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        1.5 + Math.random() * 1.5,
        (Math.random() - 0.5) * 6
      );
      bfGroup.visible = false;
      scene.add(bfGroup);
      gardenButterfliesRef.current.push(bfGroup);
    }

    // === FIREFLIES ===
    const ffCount = 80;
    const ffPositions = new Float32Array(ffCount * 3);
    for (let i = 0; i < ffCount; i++) {
      ffPositions[i * 3] = (Math.random() - 0.5) * 14;
      ffPositions[i * 3 + 1] = 0.3 + Math.random() * 2;
      ffPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const ffGeo = new THREE.BufferGeometry();
    ffGeo.setAttribute('position', new THREE.BufferAttribute(ffPositions, 3));
    const ffMat = new THREE.PointsMaterial({
      color: 0xffee88,
      size: 0.05,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(ffGeo, ffMat));
    gardenFirefliesRef.current = scene.children[scene.children.length - 1] as THREE.Points;

    // === CHERRY PETALS ===
    const cpCount = 120;
    const cpPositions = new Float32Array(cpCount * 3);
    for (let i = 0; i < cpCount; i++) {
      cpPositions[i * 3] = (Math.random() - 0.5) * 16;
      cpPositions[i * 3 + 1] = Math.random() * 4;
      cpPositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    const cpGeo = new THREE.BufferGeometry();
    cpGeo.setAttribute('position', new THREE.BufferAttribute(cpPositions, 3));
    const cpMat = new THREE.PointsMaterial({
      color: 0xffb7c5,
      size: 0.03,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(cpGeo, cpMat));
    gardenPetalsRef.current = scene.children[scene.children.length - 1] as THREE.Points;

    // Post-processing (bloom)
    import('postprocessing').then(({ EffectComposer, BloomEffect, RenderPass }) => {
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new BloomEffect({
        intensity: 0.5,
        luminanceThreshold: 0.5,
        luminanceSmoothing: 0.9,
      });
      composer.addPass(bloom as any);
      bloomComposerRef.current = composer;
    });
  }, [onReady]);

  // Fallback procedural rose if OBJ fails to load
  function createFallbackRose(group: THREE.Group) {
    const petalGeo = new THREE.SphereGeometry(0.3, 8, 8);
    const mat = new THREE.MeshStandardMaterial({ color: 0xcc1133, roughness: 0.5, side: THREE.DoubleSide });
    for (let i = 0; i < 18; i++) {
      const petal = new THREE.Mesh(petalGeo, mat);
      const angle = (i / 18) * Math.PI * 2;
      const layer = Math.floor(i / 6);
      const dist = 0.05 + layer * 0.08;
      petal.position.set(Math.cos(angle) * dist, 1.5 + layer * 0.03, Math.sin(angle) * dist);
      petal.scale.set(1, 0.4, 0.6);
      petal.rotation.set(-0.5 + layer * 0.3, angle, 0);
      group.add(petal);
    }
    // Stem
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.5, 0),
      new THREE.Vector3(0.02, 0.2, 0.01),
      new THREE.Vector3(-0.01, 0.8, -0.01),
      new THREE.Vector3(0, 1.4, 0),
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 16, 0.025, 8, false);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x2d5a1e, roughness: 0.8 });
    group.add(new THREE.Mesh(stemGeo, stemMat));
  }

  // Touch/click interaction for garden roses
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const getHit = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current!);
      return raycasterRef.current.intersectObjects(roseClickTargetsRef.current, true);
    };

    const handleClick = (e: MouseEvent) => {
      if (phase !== 'garden') return;
      const hits = getHit(e.clientX, e.clientY);
      if (hits.length > 0) {
        const msg = GARDEN_MESSAGES[gardenRoseMsgIdx.current % GARDEN_MESSAGES.length];
        gardenRoseMsgIdx.current++;
        onGardenRoseClick(msg);
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (phase !== 'garden') return;
      const touch = e.touches[0];
      if (!touch) return;
      const hits = getHit(touch.clientX, touch.clientY);
      if (hits.length > 0) {
        const msg = GARDEN_MESSAGES[gardenRoseMsgIdx.current % GARDEN_MESSAGES.length];
        gardenRoseMsgIdx.current++;
        onGardenRoseClick(msg);
      }
    };

    mount.addEventListener('click', handleClick);
    mount.addEventListener('touchstart', handleTouch, { passive: true });
    return () => {
      mount.removeEventListener('click', handleClick);
      mount.removeEventListener('touchstart', handleTouch);
    };
  }, [phase, onGardenRoseClick]);

  // Phase animations
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current) return;
    const camera = cameraRef.current;

    if (phase === 'bloom') {
      if (bloomTimelineRef.current) bloomTimelineRef.current.kill();
      const tl = gsap.timeline({ onComplete: () => { gsap.delayedCall(1.2, onBloomDone); } });
      bloomTimelineRef.current = tl;

      // OBJ rose grows in
      if (roseGroupRef.current) {
        tl.to(roseGroupRef.current.scale, { x: 1, y: 1, z: 1, duration: 2.5, ease: 'elastic.out(1, 0.5)' }, 0);
        tl.to(roseGroupRef.current.rotation, { y: Math.PI / 1.7 + 0.5, duration: 3, ease: 'power2.out' }, 0);
      }

      if (bloomLightRef.current) {
        tl.to(bloomLightRef.current, { intensity: 3, distance: 6, duration: 2.5, ease: 'power2.out' }, 0.5);
      }

      tl.to(camera.position, { x: 0, y: 3, z: 6, duration: 2.5, ease: 'power2.inOut' }, 0);
      tl.to(camera.rotation, { x: -0.05, duration: 2.5, ease: 'power2.inOut' }, 0);
    }

    if (phase === 'scatter') {
      if (scatterTimelineRef.current) scatterTimelineRef.current.kill();
      const tl = gsap.timeline({ onComplete: () => { gsap.delayedCall(0.8, onScatterDone); } });
      scatterTimelineRef.current = tl;

      // Rose model flies up and fades
      if (roseGroupRef.current) {
        tl.to(roseGroupRef.current.position, { y: 5, duration: 2.5, ease: 'power1.out' }, 0);
        tl.to(roseGroupRef.current.rotation, { x: -1, z: 0.5, duration: 2.5, ease: 'power1.out' }, 0);
        tl.to(roseGroupRef.current.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 2, ease: 'power2.in' }, 0.5);
      }

      if (bloomLightRef.current) tl.to(bloomLightRef.current, { intensity: 0, duration: 1.5 }, 0);

      tl.to(camera.position, { x: 0, y: 6, z: 10, duration: 3, ease: 'power2.inOut' }, 1.5);
      tl.to(camera.rotation, { x: -0.5, duration: 3, ease: 'power2.inOut' }, 1.5);
    }

    if (phase === 'transform') {
      if (gardenTimelineRef.current) gardenTimelineRef.current.kill();
      const tl = gsap.timeline({
        onComplete: () => { onGardenReady(); },
      });
      gardenTimelineRef.current = tl;

      // Hide rose model
      if (roseGroupRef.current) {
        tl.to(roseGroupRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power2.in' }, 0);
      }

      tl.to(camera.position, { x: 0, y: 8, z: 14, duration: 4, ease: 'power2.inOut' }, 0.5);
      tl.to(camera.rotation, { x: -0.45, duration: 4, ease: 'power2.inOut' }, 0.5);

      // Garden roses bloom
      gardenRosesRef.current.forEach((rose, i) => {
        const delay = 2 + i * 0.02;
        const ts = rose.userData.targetScale || 0.3;
        tl.to(rose.scale, { x: ts, y: ts, z: ts, duration: 0.6, ease: 'back.out(1.7)' }, delay);
      });

      // Trees
      gardenTreesRef.current.forEach((tree, i) => {
        tl.to(tree.scale, { x: 1, y: 1, z: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }, 3 + i * 0.2);
      });

      // Lanterns
      gardenLanternsRef.current.forEach((lantern, i) => {
        tl.to(lantern.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: 'back.out(2)' }, 3.5 + i * 0.15);
      });

      // Paths
      gardenPathsRef.current.forEach((path, i) => {
        tl.to(path.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'power2.out' }, 3.2 + i * 0.1);
      });

      // Benches
      gardenBenchRefs.current.forEach((bench, i) => {
        tl.to(bench.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: 'back.out(1.5)' }, 3.8 + i * 0.15);
      });

      // Pond
      if (gardenPondRef.current) {
        tl.to(gardenPondRef.current.scale, { x: 1, y: 1, z: 1, duration: 1, ease: 'power2.out' }, 3);
      }

      // Butterflies
      gardenButterfliesRef.current.forEach((bf) => { bf.visible = true; });

      // Fireflies
      if (gardenFirefliesRef.current) {
        tl.to((gardenFirefliesRef.current.material as THREE.PointsMaterial), { opacity: 0.8, duration: 2 }, 4);
      }
      if (gardenPetalsRef.current) {
        tl.to((gardenPetalsRef.current.material as THREE.PointsMaterial), { opacity: 0.5, duration: 2 }, 4);
      }

      if (bloomComposerRef.current) {
        tl.to(bloomComposerRef.current, { intensity: 0.8, duration: 3 }, 3);
      }

      tl.to(windRef.current, { strength: 1, duration: 3, ease: 'power2.out' }, 2);
    }
  }, [phase, onBloomDone, onScatterDone, onGardenReady]);

  // Init
  useEffect(() => {
    initScene();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mountRef.current && rendererRef.current.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [initScene]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const elapsed = clockRef.current.getElapsedTime();

      // Wind
      windRef.current.gust += (Math.sin(elapsed * 0.7) * 0.5 + 0.5 - windRef.current.gust) * 0.01;
      const windForce = windRef.current.strength * (0.3 + windRef.current.gust * 0.7);
      const windX = Math.sin(elapsed * 0.3) * windForce;

      // Grass
      if (grassRef.current && grassOrigRef.current) {
        const d = new THREE.Object3D();
        const orig = grassOrigRef.current;
        for (let i = 0; i < grassRef.current.count; i++) {
          const ox = orig[i * 3];
          const oy = orig[i * 3 + 1];
          const oz = orig[i * 3 + 2];
          const sway = Math.sin(elapsed * 1.5 + ox * 2 + oz * 1.5) * 0.15 * windForce;
          const sway2 = Math.cos(elapsed * 0.8 + oz * 3) * 0.08 * windForce;
          d.position.set(ox + sway * 0.3, 0, oz + sway2 * 0.3);
          d.scale.set(1, oy, 1);
          d.rotation.set(sway2 * 0.3, Math.atan2(windX, 1) + Math.sin(elapsed + i) * 0.05, sway * 0.3);
          d.updateMatrix();
          grassRef.current.setMatrixAt(i, d.matrix);
        }
        grassRef.current.instanceMatrix.needsUpdate = true;
      }

      // Dynamic lighting
      if (sunLightRef.current && ambientRef.current && sceneRef.current) {
        const cycle = (Math.sin(elapsed * 0.08) + 1) * 0.5;
        sunLightRef.current.color.lerpColors(new THREE.Color(0x1a0e2e), new THREE.Color(0xff9944), cycle);
        sunLightRef.current.intensity = 0.3 + cycle * 0.5;
        sunLightRef.current.position.y = 3 + cycle * 6;
        ambientRef.current.color.lerpColors(new THREE.Color(0x110a1a), new THREE.Color(0xffeedd), cycle);
        ambientRef.current.intensity = 0.15 + cycle * 0.2;
        const fogColor = new THREE.Color().lerpColors(new THREE.Color(0x0d0a14), new THREE.Color(0x1a0e1e), cycle);
        (sceneRef.current.fog as THREE.FogExp2).color.copy(fogColor);
        sceneRef.current.background = fogColor;
      }

      // Rose model gentle rotation
      if (roseModelRef.current && phase !== 'scatter' && phase !== 'transform') {
        roseModelRef.current.rotation.y += 0.003;
      }

      // Bloom light pulse
      if (bloomLightRef.current && (phase === 'bloom' || phase === 'note')) {
        bloomLightRef.current.intensity = 2 + Math.sin(elapsed * 2) * 0.5;
      }

      // Butterflies
      gardenButterfliesRef.current.forEach((bf) => {
        if (!bf.visible) return;
        const t = elapsed * bf.userData.speed + bf.userData.phase;
        bf.position.x = bf.userData.center.x + Math.cos(t) * bf.userData.radius + windX * 2;
        bf.position.z = bf.userData.center.z + Math.sin(t * 0.7) * bf.userData.radius;
        bf.position.y = bf.userData.center.y + Math.sin(t * 1.3) * 0.3;
        bf.children.forEach((child, ci) => {
          if (ci > 0) return;
          child.rotation.y = Math.sin(elapsed * 8 + bf.userData.phase) * 0.6;
          if (bf.children[1]) bf.children[1].rotation.y = -child.rotation.y;
        });
      });

      // Fireflies
      if (gardenFirefliesRef.current && gardenFirefliesRef.current.visible) {
        const posAttr = gardenFirefliesRef.current.geometry.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          let y = posAttr.getY(i);
          y += Math.sin(elapsed * 0.5 + i) * 0.002;
          if (y > 3) y = 0.3;
          if (y < 0.3) y = 3;
          posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;
        (gardenFirefliesRef.current.material as THREE.PointsMaterial).opacity = 0.4 + Math.sin(elapsed * 1.5) * 0.3;
      }

      // Cherry petals
      if (gardenPetalsRef.current && gardenPetalsRef.current.visible) {
        const posAttr = gardenPetalsRef.current.geometry.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          let x = posAttr.getX(i);
          let y = posAttr.getY(i);
          let z = posAttr.getZ(i);
          x += Math.sin(elapsed * 0.3 + i * 0.1) * 0.003 + windX * 0.02;
          y -= 0.003;
          z += Math.cos(elapsed * 0.2 + i * 0.15) * 0.002;
          if (y < 0) y = 3.5 + Math.random();
          if (Math.abs(x) > 8) x = (Math.random() - 0.5) * 8;
          if (Math.abs(z) > 8) z = (Math.random() - 0.5) * 8;
          posAttr.setXYZ(i, x, y, z);
        }
        posAttr.needsUpdate = true;
      }

      // Pond shimmer
      if (gardenPondRef.current && gardenPondRef.current.scale.x > 0.5) {
        (gardenPondRef.current.material as THREE.MeshStandardMaterial).opacity = 0.6 + Math.sin(elapsed * 0.8) * 0.15;
      }

      // Camera orbit in garden
      if (phase === 'garden' && cameraRef.current) {
        const cam = cameraRef.current;
        const orbitAngle = elapsed * 0.05;
        cam.position.x += (Math.sin(orbitAngle) * 14 - cam.position.x) * 0.01;
        cam.position.z += (Math.cos(orbitAngle) * 14 - cam.position.z) * 0.01;
        cam.lookAt(0, 1, 0);
      }

      // Render
      if (bloomComposerRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
        bloomComposerRef.current.render();
      } else if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        touchAction: 'none',
      }}
    />
  );
}

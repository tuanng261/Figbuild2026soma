import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

/**
 * CONFIGURATION: Set your 3D model path here
 *
 * Place your .glb or .gltf file in the /public/models/ folder
 * Then reference it like: '/models/your-model.glb'
 */
const MODEL_PATH = "/models/human-body.glb";

/**
 * Map mesh names from your 3D model to body region IDs.
 * After loading your model, check the browser console to see all mesh names,
 * then update this mapping to match.
 */
const MESH_TO_REGION_MAP: Record<string, string> = {
  right_trap: "left-trap",
  left_bicep: "right-bicep",
  "right-knee": "right-knee",
  left_inner_ankle: "left-inner-ankle",
  right_inner_ankle: "left-outer-ankle",
  right_temple: "left-temple",
  // Add more mappings as needed for your model
  abdomen: "abdomen",
  lower_abdomen: "abdomen",
  stomach: "abdomen",
  head: "head",
  chest: "chest",
  lower_back: "lower-back",
};

interface PainSignal {
  id: string;
  region: string;
  level: "low" | "medium" | "high" | "critical";
  type: string;
  location: string;
}

interface BodyMap3DProps {
  activeSignals: PainSignal[];
  onRegionClick: (regionId: string) => void;
  modelPath?: string;
  resetTrigger?: number;
}

// Pain colors - VERY distinct colors for each severity
const PAIN_COLORS = {
  low: 0xfde047, // Yellow-300 - bright yellow
  medium: 0xfb923c, // Orange-400 - bright orange
  high: 0xef4444, // Red-500 - red
  critical: 0x991b1b, // Red-800 - dark red (much darker)
};

// Brighter outline colors for each severity
const OUTLINE_COLORS = {
  low: 0xfef08a, // Yellow-200 - very bright yellow
  medium: 0xfdba74, // Orange-300 - bright orange
  high: 0xfca5a5, // Red-300 - light red
  critical: 0xef4444, // Red-500 - red
};

const HOVER_COLOR = 0x8b5cf6; // Violet-500 - distinct hover
const BASE_COLOR = 0xd6d3d1; // Stone-300 - lighter grey base model
const SCENE_BACKGROUND = 0x0a0a0a; // Near black background

export function BodyMap3D({
  activeSignals,
  onRegionClick,
  resetTrigger,
  modelPath = MODEL_PATH,
}: BodyMap3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(
    null,
  );

  const propsRef = useRef({ onRegionClick, activeSignals });
  useEffect(() => {
    propsRef.current = { onRegionClick, activeSignals };
  }, [onRegionClick, activeSignals]);

  const meshMapRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const materialMapRef = useRef<
    Map<string, THREE.MeshPhongMaterial>
  >(new Map());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(
    null,
  );
  const controlsRef = useRef<OrbitControls | null>(null);

  // Initial camera position
  const INITIAL_CAMERA_POSITION = { x: 0, y: 1, z: 3 };
  const INITIAL_TARGET = { x: 0, y: 0.8, z: 0 };

  // Reset camera when resetTrigger changes
  useEffect(() => {
    if (
      resetTrigger !== undefined &&
      cameraRef.current &&
      controlsRef.current
    ) {
      cameraRef.current.position.set(
        INITIAL_CAMERA_POSITION.x,
        INITIAL_CAMERA_POSITION.y,
        INITIAL_CAMERA_POSITION.z,
      );
      controlsRef.current.target.set(
        INITIAL_TARGET.x,
        INITIAL_TARGET.y,
        INITIAL_TARGET.z,
      );
      controlsRef.current.autoRotate = true;
      controlsRef.current.update();
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SCENE_BACKGROUND);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000,
    );
    camera.position.set(
      INITIAL_CAMERA_POSITION.x,
      INITIAL_CAMERA_POSITION.y,
      INITIAL_CAMERA_POSITION.z,
    );
    cameraRef.current = camera;

    // Renderer - no tone mapping to preserve color accuracy
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2),
    );
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Post-processing for outline effect
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const outlinePass = new OutlinePass(
      new THREE.Vector2(width, height),
      scene,
      camera,
    );
    outlinePass.edgeStrength = 4;
    outlinePass.edgeGlow = 1;
    outlinePass.edgeThickness = 2;
    outlinePass.pulsePeriod = 2;
    outlinePass.visibleEdgeColor.set(0xffffff);
    outlinePass.hiddenEdgeColor.set(0x444444);
    composer.addPass(outlinePass);

    // Lighting - high ambient to preserve colors, minimal directional
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.4);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight.position.set(-2, 1, -2);
    scene.add(fillLight);

    // Controls
    const controls = new OrbitControls(
      camera,
      renderer.domElement,
    );
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 1.5;
    controls.maxDistance = 8;
    controls.target.set(
      INITIAL_TARGET.x,
      INITIAL_TARGET.y,
      INITIAL_TARGET.z,
    );
    controlsRef.current = controls;

    let autoRotateTimeout: ReturnType<
      typeof setTimeout
    > | null = null;
    controls.addEventListener("start", () => {
      controls.autoRotate = false;
      if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
    });
    controls.addEventListener("end", () => {
      autoRotateTimeout = setTimeout(() => {
        controls.autoRotate = true;
      }, 3000);
    });

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredMesh: THREE.Mesh | null = null;

    // Load the 3D model
    const loader = new GLTFLoader();

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y += size.y * scale * 0.5;

        // Collect all mesh names for debugging
        const meshNames: string[] = [];

        // Process meshes
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            meshNames.push(child.name);

            // Try to map this mesh to a body region
            const regionId = findRegionId(child.name);

            // Check if there's an active signal for this region
            const signal = propsRef.current.activeSignals.find(
              (s) => s.region === regionId,
            );

            // Use MeshPhongMaterial for better color accuracy with lighting
            const material = new THREE.MeshPhongMaterial({
              color: signal
                ? PAIN_COLORS[signal.level]
                : BASE_COLOR,
              shininess: 30,
              transparent: true,
              opacity: 1,
              emissive: 0x000000,
              emissiveIntensity: 0,
              side: THREE.FrontSide,
              flatShading: false,
            });

            child.material = material;
            child.castShadow = true;
            child.receiveShadow = true;

            if (regionId) {
              child.userData.regionId = regionId;
              meshMapRef.current.set(regionId, child);
              materialMapRef.current.set(regionId, material);

              if (signal) {
                console.log(
                  `Applied pain color to ${regionId} (${signal.level})`,
                );
              }
            }
          }
        });

        scene.add(model);
        setIsLoading(false);

        // Log mesh names to help with mapping
        console.log("=== MODEL LOADED ===");
        console.log("All mesh names in model:", meshNames);
        console.log(
          "Mapped regions:",
          Array.from(meshMapRef.current.keys()),
        );
        console.log(
          "Active signals regions:",
          propsRef.current.activeSignals.map((s) => s.region),
        );
        console.log(
          "Update MESH_TO_REGION_MAP in BodyMap3D.tsx to match your model's mesh names",
        );
      },
      (progress) => {
        const percent =
          progress.total > 0
            ? (progress.loaded / progress.total) * 100
            : 0;
        console.log(`Loading: ${percent.toFixed(0)}%`);
      },
      (error) => {
        console.error("Error loading model:", error);
        setLoadError(`Could not load model from: ${modelPath}`);
        setIsLoading(false);
      },
    );

    function findRegionId(meshName: string): string | null {
      // Direct match
      if (MESH_TO_REGION_MAP[meshName]) {
        return MESH_TO_REGION_MAP[meshName];
      }

      // Case-insensitive partial match
      const lowerName = meshName.toLowerCase();
      for (const [key, value] of Object.entries(
        MESH_TO_REGION_MAP,
      )) {
        if (
          lowerName.includes(key.toLowerCase()) ||
          key.toLowerCase().includes(lowerName)
        ) {
          return value;
        }
      }

      return null;
    }

    // Mouse interaction
    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        scene.children,
        true,
      );

      let newHovered: THREE.Mesh | null = null;
      for (const intersect of intersects) {
        if (
          intersect.object instanceof THREE.Mesh &&
          intersect.object.userData.regionId
        ) {
          newHovered = intersect.object;
          break;
        }
      }

      if (hoveredMesh !== newHovered) {
        hoveredMesh = newHovered;
        renderer.domElement.style.cursor = newHovered
          ? "pointer"
          : "grab";
      }
    };

    const onClick = () => {
      if (hoveredMesh?.userData.regionId) {
        propsRef.current.onRegionClick(
          hoveredMesh.userData.regionId,
        );
      }
    };

    renderer.domElement.addEventListener(
      "pointermove",
      onPointerMove,
    );
    renderer.domElement.addEventListener("click", onClick);

    // Handle resize
    const handleResize = () => {
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
      outlinePass.resolution.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let frameId: number;
    const clock = new THREE.Clock();
    let hasLoggedOnce = false;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const { activeSignals } = propsRef.current;

      // Debug log once
      if (!hasLoggedOnce && materialMapRef.current.size > 0) {
        hasLoggedOnce = true;
        console.log("=== PAIN MATCHING DEBUG ===");
        console.log(
          "Mapped region IDs:",
          Array.from(materialMapRef.current.keys()),
        );
        console.log(
          "Active signal regions:",
          activeSignals.map((s) => `${s.region} (${s.level})`),
        );
        console.log("PAIN_COLORS:", PAIN_COLORS);
        activeSignals.forEach((signal) => {
          const hasMatch = materialMapRef.current.has(
            signal.region,
          );
          const colorHex =
            PAIN_COLORS[
              signal.level as keyof typeof PAIN_COLORS
            ];
          console.log(
            `Signal "${signal.region}" level=${signal.level} color=0x${colorHex.toString(16)}: ${hasMatch ? "✓ MATCHED" : "✗ NO MATCH"}`,
          );
        });
      }

      // Collect meshes that should have outline (pain areas)
      const outlineMeshes: THREE.Object3D[] = [];

      // Update materials based on state
      materialMapRef.current.forEach((material, regionId) => {
        const signal = activeSignals.find(
          (s) => s.region === regionId,
        );
        const isHovered =
          hoveredMesh?.userData.regionId === regionId;
        const hasPain = !!signal;

        // Add to outline if has pain
        if (hasPain && meshMapRef.current.has(regionId)) {
          const mesh = meshMapRef.current.get(regionId);
          if (mesh) outlineMeshes.push(mesh);
        }

        // Pain takes priority - always show pain color if there's an active signal
        let targetColor = BASE_COLOR;
        if (hasPain) {
          // Pain is always visible - use the correct color for this severity level
          targetColor =
            PAIN_COLORS[
              signal.level as keyof typeof PAIN_COLORS
            ];
        } else if (isHovered) {
          // Only show hover if no pain
          targetColor = HOVER_COLOR;
        }

        // Set color directly for pain, lerp for others
        if (hasPain) {
          material.color.setHex(targetColor);
          // Add emissive glow matching the pain color
          material.emissive.setHex(targetColor);
          const pulseIntensity =
            0.3 + Math.sin(clock.elapsedTime * 2) * 0.1;
          material.emissiveIntensity = pulseIntensity;
        } else {
          const currentColor = new THREE.Color(
            material.color.getHex(),
          );
          const target = new THREE.Color(targetColor);
          currentColor.lerp(target, 0.15);
          material.color.set(currentColor);
          material.emissive.setHex(0x000000);
          material.emissiveIntensity = 0;
        }
      });

      // Update outline pass with pain meshes
      outlinePass.selectedObjects = outlineMeshes;

      // Re-enable outline with white color (neutral)
      if (outlineMeshes.length > 0) {
        outlinePass.selectedObjects = outlineMeshes;
        const pulseIntensity =
          0.7 + Math.sin(clock.elapsedTime * 2) * 0.3;
        outlinePass.edgeStrength = 3 * pulseIntensity;
        outlinePass.edgeGlow = 0.5 * pulseIntensity;
        outlinePass.visibleEdgeColor.set(0xffffff);
      } else {
        outlinePass.selectedObjects = [];
      }

      controls.update();
      composer.render();
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener(
        "pointermove",
        onPointerMove,
      );
      renderer.domElement.removeEventListener("click", onClick);
      if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
      cancelAnimationFrame(frameId);
      controls.dispose();
      renderer.dispose();
      meshMapRef.current.clear();
      materialMapRef.current.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelPath]);

  if (loadError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-amber-900/30 border border-amber-700 rounded-2xl p-6 max-w-sm">
          <div className="text-amber-400 text-lg font-medium mb-3">
            No Model Found
          </div>
          <p className="text-amber-500 text-sm mb-4">
            {loadError}
          </p>
          <div className="bg-stone-900 rounded-xl p-4 text-left space-y-2">
            <p className="text-xs font-medium text-stone-300">
              To add your 3D model:
            </p>
            <ol className="text-xs text-stone-400 space-y-1.5 list-decimal list-inside">
              <li>
                Get a{" "}
                <code className="bg-stone-800 px-1 rounded">
                  .glb
                </code>{" "}
                or{" "}
                <code className="bg-stone-800 px-1 rounded">
                  .gltf
                </code>{" "}
                human body model
              </li>
              <li>
                Place it in{" "}
                <code className="bg-stone-800 px-1 rounded">
                  /public/models/
                </code>
              </li>
              <li>
                Name it{" "}
                <code className="bg-stone-800 px-1 rounded">
                  human-body.glb
                </code>
              </li>
              <li>Refresh the page</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex-1">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mb-3" />
            <span className="text-sm text-stone-400">
              Loading 3D Model...
            </span>
          </div>
        </div>
      )}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing absolute inset-0"
      />
    </div>
  );
}
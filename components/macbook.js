import { useRef, useEffect } from "react";
import useWindowWidth from "hooks/useWindowWidth";

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  GridHelper,
  DirectionalLight,
  TextureLoader,
  MeshPhongMaterial,
  AmbientLight,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap, { Power1 } from "gsap";

export default function Macbook() {
  const element = useRef(null);
  const width = useWindowWidth();

  useEffect(() => {
    let renderer;

    const load = async () => {
      const isWide = window.innerWidth > 1050;

      const height = element.current.offsetHeight;
      const width = element.current.offsetWidth * (isWide ? 1.4 : 1);

      const scene = new Scene();
      scene.position.y = -0.5;

      const camera = new PerspectiveCamera(
        isWide ? 35 : 44,
        width / height,
        0.1,
        1000
      );
      camera.position.y = 3;
      camera.position.z = 3;

      if (!isWide) {
        scene.position.y = -2.1;
        camera.position.y = 2.5;
        camera.position.z = 4.5;
      }

      renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      element.current.innerHTML = ``;
      element.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.screenSpacePanning = true;

      const gridHelper = new GridHelper(200, 600, "silver", "silver");
      gridHelper.material.opacity = 0.2;
      gridHelper.material.depthWrite = false;
      gridHelper.material.transparent = true;
      scene.add(gridHelper);

      const light1 = new DirectionalLight(0xffffff, 1.5);
      light1.position.set(0, 7, 0);
      scene.add(light1);

      const light2 = new AmbientLight(0xffffff, 0.4);
      scene.add(light2);

      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync("/model/scene.gltf");
      const macbook = gltf.scene;

      const textureLoader = new TextureLoader();
      const texture = await textureLoader.loadAsync(
        `/model/textures/desk3d.png`
      );
      const display = macbook.getObjectByName("abgVijaHVNRUvcc");
      display.material = new MeshPhongMaterial({
        map: texture,
      });

      macbook.scale.set(5, 5, 5);
      macbook.position.y = 0.1;
      macbook.position.x = 5;
      scene.add(macbook);

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();

      await gsap.to(macbook.position, {
        x: 0,
        duration: 0.8,
        ease: Power1.easeOut,
      });
    };
    load();

    return () => {
      renderer.forceContextLoss();
    };
  }, [width]);
  return (
    <>
      <div ref={element} className="w-full h-full"></div>
    </>
  );
}

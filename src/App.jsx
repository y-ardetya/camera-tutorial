import { ScrollControls, useScroll } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  SheetProvider,
  useCurrentSheet,
  PerspectiveCamera,
} from "@theatre/r3f";
import { getProject, val } from "@theatre/core";
//* result state in json format
import flyThrough from "./state.json";

const App = () => {
  //* development state
  // const sheet = getProject("Fly through").sheet("Scene");
  //* production state
  const sheet = getProject("Fly through", { state: flyThrough }).sheet("Scene");
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={5} damping={0.5}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
    </Canvas>
  );
};

const Scene = () => {
  //* useCurrentSheet, useScroll, useFrame used to update the animation
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame((state, delta) => {
    //* The length of the sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    //* Update the position of the sequence
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  const bgColor = "#84a4f4";

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 0, 25]} />
      <ambientLight intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={1} />
      //* Model
      //* Perspective Camera is derived from theatre r3f
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={75}
        near={0.1}
        far={70}
      />
    </>
  );
};

export default App;

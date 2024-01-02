import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import './App.css';
import Elements from './Elements.js';


const Structure = (props) => {

    const cameraPosition = [0, 0, 15]; // カメラの位置


    return (
        <div>
            <Canvas
                camera={{ position: cameraPosition }}
                style={{ height: '120vh', width: '120vw' }}
            >
                <color attach="background" args={['#EEE']} />

                <ambientLight color='#ffffff' intensity={1} />
                <OrbitControls args={[cameraPosition]} />
                <group
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 8, 0]}
                >
                    <Elements {...props}
                    />
                </group>
            </Canvas>
        </div>
    )
}

export default Structure;
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material
  }
}

export function BlackHoneyArm(props: any) {
    const group = useRef<THREE.Group>(null)
    const { nodes, materials, animations } = useGLTF('/black-honey.glb') as unknown as GLTFResult
    const { actions } = useAnimations(animations, group)

    // Create Refs for the main component groups we want to animate
    const baseRef = useRef<THREE.Group>(null)
    const lowerArmRef = useRef<THREE.Group>(null)
    const upperArmRef = useRef<THREE.Group>(null)
    const gripperRef = useRef<THREE.Group>(null)

    useEffect(() => {
        // 1. Create the GSAP Scroll Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-track", // Make sure you have this div in your App.jsx!
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5, // 1.5 seconds of smoothing
            }
        })

        // 2. The Exploded View Animation Logic

        // Pull the base up and slightly rotate it
        if (baseRef.current) {
            tl.to(baseRef.current.position, { y: 1 }, 0)
        }

        // Push the lower arm out on the Z axis
        if (lowerArmRef.current) {
            tl.to(lowerArmRef.current.position, { z: 1.5, y: 1.5 }, 0)
        }

        // Push the upper arm further out on the Z axis
        if (upperArmRef.current) {
            tl.to(upperArmRef.current.position, { z: 2.5, y: 2 }, 0)
        }

        // Explode the gripper out and slightly apart
        if (gripperRef.current) {
            tl.to(gripperRef.current.position, { z: 3.5, y: 2.5 }, 0)
        }

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={1.207}>
                    <group name="root">
                        <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>

                            {/* THE BASE GROUP */}
                            <group ref={baseRef} name="Robot_Base_Assembly">
                                {/* We map over all nodes that belong to the base material */}
                                {Object.keys(nodes).filter(key => nodes[key].material === materials.robot_base).map((key) => (
                                    <mesh
                                        key={key}
                                        geometry={nodes[key].geometry}
                                        material={materials.robot_base}
                                        position={nodes[key].position}
                                        rotation={nodes[key].rotation}
                                    />
                                ))}
                            </group>

                            {/* THE MAIN ARM GROUP */}
                            {/* We map over all nodes that belong to the main arm material */}
                            <group ref={lowerArmRef} name="Robot_Arm_Assembly">
                                {Object.keys(nodes).filter(key => nodes[key].material === materials.robo_arm).map((key) => (
                                    <mesh
                                        key={key}
                                        geometry={nodes[key].geometry}
                                        material={materials.robo_arm}
                                        position={nodes[key].position}
                                        rotation={nodes[key].rotation}
                                    />
                                ))}
                            </group>

                        </group>
                    </group>
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/black-honey.glb')

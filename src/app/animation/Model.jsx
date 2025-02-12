import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/z2.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={materials.Material}
        position={[-0.088, 0.001, 0.089]}
        scale={2.594}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve001.geometry}
        material={materials.Material}
        position={[-0.088, 0.001, 0.089]}
        scale={2.594}
      />
    </group>
  )
}

useGLTF.preload('/z2.glb')

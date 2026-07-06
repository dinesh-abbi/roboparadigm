import React from 'react';

export interface ModelProps {
  scrollYProgress?: any;
  groupScale?: number;
  globalProgress?: number;
  scrollProgress?: number;
  clickedMesh?: string | null;
  onMeshClick?: (meshName: string) => void;
  onJointPositions?: (positions: Record<string, { x: number; y: number }>) => void;
  debugFullModel?: boolean;
  logoDebugRot?: { x: number; y: number; z: number } | null;
  section?: number | null;
  highlightedJoint?: string | null;
  explodeMode?: 'scatter' | 'axis';
  highlightColor?: string;
  highlightedSubsystem?: string | null;
}

export declare function Model(props: ModelProps): React.JSX.Element;

export declare const SUBSYSTEM_GROUPS: Record<string, {
  meshes: string[];
  color: string;
  label: string;
  sublabel: string;
}>;

export declare const JOINT_DEFS: Array<{
  name: string;
  label: string;
  dof: string;
  spec: string;
  color: string;
}>;

"use client";

import dynamic from "next/dynamic";
import { type ComponentType } from "react";

interface ExperimentLoaderProps {
  componentPath?: string;
}

export default function ExperimentLoader({
  componentPath,
}: ExperimentLoaderProps) {
  if (!componentPath) {
    return null;
  }

  let ExperimentComponent: ComponentType | null = null;

  try {
    ExperimentComponent = dynamic(
      () => import(`@/components/lab/${componentPath}`),
      {
        ssr: false,
        loading: () => (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500 dark:text-gray-400">加载中...</div>
          </div>
        ),
      }
    );
  } catch (error) {
    console.error("Failed to load experiment component:", error);
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 dark:text-red-400">
          组件加载失败
        </div>
      </div>
    );
  }

  if (!ExperimentComponent) {
    return null;
  }

  return <ExperimentComponent />;
}


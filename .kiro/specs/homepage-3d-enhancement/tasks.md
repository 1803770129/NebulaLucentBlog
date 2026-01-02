# Implementation Plan: Homepage 3D Enhancement

## Overview

将首页美化并添加3D元素，使用React Three Fiber创建交互式粒子背景，优化卡片样式为毛玻璃效果。

## Tasks

- [x] 1. 安装依赖并配置项目
  - 安装 three, @react-three/fiber@9, @react-three/drei
  - 安装 @types/three 开发依赖
  - 更新 next.config.ts 添加 transpilePackages 配置
  - _Requirements: 1.1, 1.4_

- [x] 2. 创建3D场景组件
  - [x] 2.1 创建 Scene3D 容器组件
    - 使用 dynamic import 避免 SSR 问题
    - 设置 Canvas 基础配置
    - 添加 WebGL 支持检测和降级处理
    - _Requirements: 1.1, 1.4_
  
  - [x] 2.2 创建 ParticleField 粒子场组件
    - 实现粒子系统渲染
    - 添加粒子动画效果
    - 实现鼠标交互响应
    - _Requirements: 1.1, 1.2_
  
  - [x] 2.3 创建 FloatingGeometry 漂浮几何体组件
    - 实现多种几何体类型
    - 添加旋转和漂浮动画
    - _Requirements: 1.1_

- [x] 3. 创建UI增强组件
  - [x] 3.1 创建 GlassCard 毛玻璃卡片组件
    - 实现毛玻璃效果样式
    - 添加3D悬停变换效果
    - 实现入场动画
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [ ]* 3.2 编写 GlassCard 动画延迟属性测试
    - **Property 2: Card Animation Delay Ordering**
    - **Validates: Requirements 3.3**

- [x] 4. 更新全局样式
  - 添加毛玻璃效果CSS类
  - 添加3D变换相关样式
  - 优化深色模式样式
  - _Requirements: 3.2, 4.1, 4.2_

- [x] 5. 重构首页
  - [x] 5.1 集成3D背景到首页
    - 添加 Scene3D 组件
    - 配置粒子场和漂浮几何体
    - _Requirements: 1.1, 2.3_
  
  - [x] 5.2 更新 Hero 区域
    - 优化标题动画效果
    - 增强渐变样式
    - _Requirements: 2.1, 2.2_
  
  - [x] 5.3 替换卡片为 GlassCard
    - 使用新的毛玻璃卡片组件
    - 配置交错入场动画
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 6. Checkpoint - 验证功能
  - 确保所有组件正确渲染
  - 验证3D效果和交互
  - 检查深色模式兼容性
  - 确保无控制台错误

- [ ]* 7. 编写测试
  - [ ]* 7.1 编写组件渲染测试
    - 测试 Scene3D 组件渲染
    - 测试 GlassCard 组件渲染
    - _Requirements: 1.1, 3.1_
  
  - [ ]* 7.2 编写深色模式属性测试
    - **Property 1: Dark Mode Class Consistency**
    - **Validates: Requirements 4.2**

## Notes

- 标记 `*` 的任务为可选任务，可跳过以加快MVP开发
- 每个任务都引用了具体的需求以便追溯
- 3D组件需要使用动态导入避免SSR问题
- 属性测试验证通用正确性属性

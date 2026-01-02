import fs from "fs";
import path from "path";

/**
 * 读取实验组件的源代码
 */
export function getExperimentCode(componentPath: string): string | null {
  try {
    const componentFilePath = path.join(
      process.cwd(),
      "components",
      "lab",
      `${componentPath}.tsx`
    );

    if (!fs.existsSync(componentFilePath)) {
      return null;
    }

    const code = fs.readFileSync(componentFilePath, "utf-8");
    return code;
  } catch (error) {
    console.error(`Error reading component code for ${componentPath}:`, error);
    return null;
  }
}


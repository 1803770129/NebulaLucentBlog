import Link from "next/link";
import { getExperimentById, getAllExperiments } from "@/src/lib/experiments";
import {
  getCategoryName,
  getStatusName,
  getDifficultyName,
} from "@/src/lib/experiments";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale/zh-CN";
import { notFound } from "next/navigation";
import ExperimentLoader from "@/components/lab/ExperimentLoader";
import CodeDisplay from "@/components/lab/CodeDisplay";
import { getExperimentCode } from "@/src/lib/experimentCode";

export async function generateStaticParams() {
  const experiments = getAllExperiments();
  return experiments.map((experiment) => ({
    id: experiment.id,
  }));
}

export default async function ExperimentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experiment = getExperimentById(id);

  if (!experiment) {
    notFound();
  }

  // 获取组件源代码
  let componentCode: string | null = null;
  if (experiment.componentPath) {
    // 优先使用提供的代码源，否则从文件读取
    componentCode =
      experiment.codeSource || getExperimentCode(experiment.componentPath);
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "in-progress":
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      experimental:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return colors[status] || colors.experimental;
  };

  // 获取难度颜色
  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty)
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    const colors: Record<string, string> = {
      beginner:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      intermediate:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      advanced:
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return colors[difficulty] || colors.beginner;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/lab"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-8 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回实验室
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
            {experiment.thumbnail && (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-lg">
                <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 overflow-hidden">
                  <img
                    src={experiment.thumbnail}
                    alt={experiment.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {experiment.title}
                </h1>
                {experiment.featured && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ 精选
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {experiment.description}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                    experiment.status
                  )}`}
                >
                  {getStatusName(experiment.status)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getCategoryName(experiment.category)}
                </span>
                {experiment.difficulty && (
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(
                      experiment.difficulty
                    )}`}
                  >
                    {getDifficultyName(experiment.difficulty)}
                  </span>
                )}
                <time className="text-sm text-gray-500 dark:text-gray-500">
                  {format(new Date(experiment.date), "yyyy年MM月", {
                    locale: zhCN,
                  })}
                </time>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Live Demo */}
              {experiment.componentPath && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    在线演示
                  </h2>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <ExperimentLoader componentPath={experiment.componentPath} />
                  </div>
                </div>
              )}

              {/* Description */}
              {experiment.longDescription && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    实验介绍
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                      {experiment.longDescription}
                    </p>
                  </div>
                </div>
              )}

              {/* Code Display */}
              {componentCode && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    源代码
                  </h2>
                  <CodeDisplay
                    code={componentCode}
                    language="tsx"
                    filename={
                      experiment.componentPath
                        ? `${experiment.componentPath}.tsx`
                        : undefined
                    }
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                  标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {experiment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                  技术栈
                </h3>
                <div className="flex flex-wrap gap-2">
                  {experiment.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experiment Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                  实验信息
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">
                      状态
                    </dt>
                    <dd className="mt-1">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          experiment.status
                        )}`}
                      >
                        {getStatusName(experiment.status)}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">
                      分类
                    </dt>
                    <dd className="mt-1 text-sm text-gray-800 dark:text-white">
                      {getCategoryName(experiment.category)}
                    </dd>
                  </div>
                  {experiment.difficulty && (
                    <div>
                      <dt className="text-sm text-gray-500 dark:text-gray-400">
                        难度
                      </dt>
                      <dd className="mt-1">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                            experiment.difficulty
                          )}`}
                        >
                          {getDifficultyName(experiment.difficulty)}
                        </span>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">
                      创建日期
                    </dt>
                    <dd className="mt-1 text-sm text-gray-800 dark:text-white">
                      {format(new Date(experiment.date), "yyyy年MM月dd日", {
                        locale: zhCN,
                      })}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


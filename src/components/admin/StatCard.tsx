"use client";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  color?: "blue" | "green" | "yellow" | "purple";
}

export default function StatCard({
  title,
  value,
  icon,
  change,
  color = "blue",
}: StatCardProps) {
  const gradientClasses = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-emerald-500 to-teal-600",
    yellow: "from-amber-500 to-orange-600",
    purple: "from-purple-500 to-pink-600",
  };

  const bgClasses = {
    blue: "bg-blue-50",
    green: "bg-emerald-50",
    yellow: "bg-amber-50",
    purple: "bg-purple-50",
  };

  const textClasses = {
    blue: "text-blue-600",
    green: "text-emerald-600",
    yellow: "text-amber-600",
    purple: "text-purple-600",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-slate-300/60 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-2 tracking-tight">{value}</p>
          {change && (
            <div
              className={`inline-flex items-center gap-1 mt-3 text-sm font-medium px-2 py-1 rounded-full ${
                change.positive ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
              }`}
            >
              {change.positive ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {change.value}
            </div>
          )}
        </div>
        <div className={`${bgClasses[color]} p-4 rounded-2xl ${textClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

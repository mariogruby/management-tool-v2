import type React from "react";

function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`animate-pulse rounded-xl bg-muted ${className ?? ""}`} style={style} />;
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-xl border bg-card p-4">
          <Bone className="w-10 h-10 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Bone className="h-7 w-12" />
            <Bone className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function GlobalProgressSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Bone className="h-4 w-36" />
        <Bone className="h-8 w-12" />
      </div>
      <Bone className="h-2 w-full" />
      <div className="flex justify-between">
        <Bone className="h-3 w-40" />
        <Bone className="h-3 w-24" />
      </div>
    </div>
  );
}

function WeeklyActivitySkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Bone className="h-4 w-36" />
        <Bone className="h-3 w-28" />
      </div>
      <div className="flex items-end gap-2" style={{ height: 80 }}>
        {[40, 70, 30, 100, 55, 80, 20].map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1 justify-end" style={{ height: 80 }}>
            <Bone className="w-full" style={{ height: `${h * 0.48}px` }} />
            <Bone className="h-2.5 w-4" />
            <Bone className="h-2 w-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingTasksSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Bone className="h-6 w-36" />
        <Bone className="h-4 w-20" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border bg-card p-3">
            <Bone className="w-4 h-4 shrink-0" />
            <div className="flex-1 flex flex-col gap-1.5">
              <Bone className="h-3.5 w-3/4" />
              <Bone className="h-3 w-1/2" />
            </div>
            <Bone className="h-5 w-14 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivitySkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Bone className="h-6 w-36" />
      <div className="flex flex-col divide-y rounded-xl border bg-card overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3">
            <Bone className="w-6 h-6 shrink-0 rounded-full" />
            <div className="flex-1 flex flex-col gap-1.5">
              <Bone className="h-3.5 w-5/6" />
              <Bone className="h-3 w-1/3" />
            </div>
            <Bone className="h-3 w-12 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AssignedToMeSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Bone className="h-6 w-32" />
        <Bone className="h-5 w-16" />
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, g) => (
          <div key={g} className="flex flex-col gap-1.5">
            <Bone className="h-3 w-24" />
            <div className="flex flex-col gap-1.5">
              {Array.from({ length: 2 }).map((_, t) => (
                <div key={t} className="flex items-center gap-3 rounded-xl border bg-card px-3 py-2.5">
                  <Bone className="w-4 h-4 shrink-0" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <Bone className="h-3.5 w-2/3" />
                    <Bone className="h-3 w-1/3" />
                  </div>
                  <Bone className="h-5 w-16 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoardsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Bone className="h-6 w-24" />
        <Bone className="h-9 w-32" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Bone key={i} className="h-24" />
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-3 sm:p-6 flex flex-col gap-6">
      {/* Greeting */}
      <div className="flex flex-col gap-2">
        <Bone className="h-8 w-64" />
        <Bone className="h-4 w-48" />
      </div>

      <StatsSkeleton />
      <GlobalProgressSkeleton />
      <WeeklyActivitySkeleton />
      <UpcomingTasksSkeleton />
      <RecentActivitySkeleton />
      <AssignedToMeSkeleton />
      <BoardsSkeleton />
    </div>
  );
}

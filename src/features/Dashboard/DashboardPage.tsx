
import {
  Images,
  Image,
  Users,
  Mail,
  CalendarDays,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Activity,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    title: "Total Events",
    value: "10",
    description: "Events created",
    icon: CalendarDays,
    iconStyle: "bg-blue-500/10 text-blue-400",
    trend: "+2 this month",
  },
  {
    title: "Albums",
    value: "10",
    description: "Event albums",
    icon: Images,
    iconStyle: "bg-orange-500/10 text-orange-400",
    trend: "+3 this month",
  },
  {
    title: "Images",
    value: "105+",
    description: "Images in albums",
    icon: Image,
    iconStyle: "bg-yellow-500/10 text-yellow-400",
    trend: "+18 this week",
  },
  {
    title: "Members",
    value: "59",
    description: "Community members",
    icon: Users,
    iconStyle: "bg-green-500/10 text-green-400",
    trend: "+7 this month",
  },
];

const activities = [
  {
    title: "New member joined",
    description: "Rahul Kumar joined GDG Ranchi",
    time: "12 min ago",
    icon: Users,
    style: "bg-green-500/10 text-green-400",
  },
  {
    title: "New album created",
    description: "DevFest Ranchi 2025",
    time: "1 hour ago",
    icon: Images,
    style: "bg-orange-500/10 text-orange-400",
  },
  {
    title: "Images uploaded",
    description: "18 new images added to an album",
    time: "3 hours ago",
    icon: Image,
    style: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "Email campaign completed",
    description: "Event announcement sent successfully",
    time: "Yesterday",
    icon: Mail,
    style: "bg-purple-500/10 text-purple-400",
  },
];

const DashboardPage = () => {
  return (
    <div className="min-h-full w-full mx-[2vw] my-[4vh] text-white">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#34A853]">
            Overview
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Good morning, Abhishek</h1>

          <p className="mt-2 text-sm text-white/40">
            Here's what's happening with GDG Ranchi today.
          </p>
        </div>

        <button
          type="button"
          className="group flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          <Plus size={16} />
          Create Event
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconStyle}`}
                >
                  <Icon size={19} strokeWidth={1.8} />
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-white/20 transition group-hover:text-white/50"
                />
              </div>

              <div className="mt-5">
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>

                <p className="mt-1 text-sm font-medium text-white/70">{stat.title}</p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-white/30">{stat.description}</span>

                  <span className="text-[10px] font-medium text-[#34A853]">{stat.trend}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/30">Activity</p>

              <h2 className="mt-1 text-lg font-semibold">Recent activity</h2>
            </div>

            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-medium text-white/40 transition hover:text-white"
            >
              View all
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="mt-6 divide-y divide-white/[0.06]">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.style}`}
                  >
                    <Icon size={17} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white/80">{activity.title}</p>

                    <p className="mt-1 truncate text-xs text-white/35">{activity.description}</p>
                  </div>

                  <div className="hidden items-center gap-1.5 text-[10px] text-white/25 sm:flex">
                    <Clock3 size={12} />
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-white/30">Community</p>

            <h2 className="mt-1 text-lg font-semibold">Quick overview</h2>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                  <Users size={17} />
                </div>

                <div>
                  <p className="text-sm font-medium">Active members</p>

                  <p className="mt-0.5 text-[11px] text-white/30">Community members</p>
                </div>
              </div>

              <span className="text-lg font-bold">59</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                  <CalendarDays size={17} />
                </div>

                <div>
                  <p className="text-sm font-medium">Upcoming events</p>

                  <p className="mt-0.5 text-[11px] text-white/30">Scheduled events</p>
                </div>
              </div>

              <span className="text-lg font-bold">3</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Image size={17} />
                </div>

                <div>
                  <p className="text-sm font-medium">Media library</p>

                  <p className="mt-0.5 text-[11px] text-white/30">Total uploaded images</p>
                </div>
              </div>

              <span className="text-lg font-bold">105+</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] py-3 text-xs font-medium text-white/50 transition hover:bg-white/[0.05] hover:text-white"
          >
            <Activity size={14} />
            View community analytics
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <button
          type="button"
          className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-left transition hover:border-white/[0.14] hover:bg-white/[0.04]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <CalendarDays size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold">Create Event</p>

            <p className="mt-1 text-[11px] text-white/30">Add a new community event</p>
          </div>

          <ArrowRight
            size={16}
            className="text-white/20 transition group-hover:translate-x-1 group-hover:text-white/60"
          />
        </button>

        <button
          type="button"
          className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-left transition hover:border-white/[0.14] hover:bg-white/[0.04]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
            <Images size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold">Create Album</p>

            <p className="mt-1 text-[11px] text-white/30">Organize event memories</p>
          </div>

          <ArrowRight
            size={16}
            className="text-white/20 transition group-hover:translate-x-1 group-hover:text-white/60"
          />
        </button>

        <button
          type="button"
          className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-left transition hover:border-white/[0.14] hover:bg-white/[0.04]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <Mail size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold">Send Email</p>

            <p className="mt-1 text-[11px] text-white/30">Reach the community</p>
          </div>

          <ArrowRight
            size={16}
            className="text-white/20 transition group-hover:translate-x-1 group-hover:text-white/60"
          />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] py-5 text-[11px] text-white/20">
        <span>GDG Ranchi Admin</span>

        <div className="flex items-center gap-2">
          <CheckCircle2 size={12} className="text-green-500/60" />
          All systems operational
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

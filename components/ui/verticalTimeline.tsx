export default function VerticalTimeline() {
  const events = [
    { date: "2020- Present", title: "Freelance Digital Artist", description: "Self Employed" },
    { date: "Mar 2024", title: "Beta Launch", description: "First public version." },
  ];

  return (
    <div className="p-5 max-w-2xl mx-auto">
      {/* Container with line anchored to the left */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:-translate-x-1 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {events.map((event, index) => (
          <div key={index} className="relative flex items-center gap-6 group is-active">
            {/* Dot (Centered on the line) */}
            <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-secondary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 z-10">
               <span className="w-3 h-3 bg-accent rounded-full"></span>
            </div>
            {/* Content (Takes up remaining space on the right) */}
            <div className="flex flex-col w-full p-4 rounded-md border border-slate-200 bg-white shadow">
              <time className="font-bold text-slate-500">{event.date}</time>
              <div className="text-slate-900 font-semibold">{event.title}</div>
              <div className="text-slate-500">{event.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

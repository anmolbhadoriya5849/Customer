import { Info } from "lucide-react";

export function AboutEvent({ description }: { description?: string | null }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
          <Info className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">About the Event</h2>
      </div>
      
      {description ? (
        <div
          className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
            prose-strong:text-white prose-strong:font-bold
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:text-gray-300 prose-li:marker:text-indigo-400"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <div className="flex items-center gap-3 bg-gray-800/30 rounded-xl p-4 border border-white/5">
          <Info className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <p className="text-gray-500 italic">No description provided by the organizer.</p>
        </div>
      )}
    </section>
  );
}
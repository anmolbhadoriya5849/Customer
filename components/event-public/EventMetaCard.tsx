type EventMeta = {
    id?: string;
    name?: string;
    date?: string;
    time?: string;
};

export function EventMetaCard({ event }: { event: EventMeta }) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Event ID: {event.id}</p>
            <p className="text-gray-400 text-sm">Event Name: {event.name}</p>
            <p className="text-gray-400 text-sm">Event Date: {event.date}</p>
            <p className="text-gray-400 text-sm">Event Time: {event.time}</p>
        </div>
    );
}

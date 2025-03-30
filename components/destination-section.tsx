import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import BusScheduleTable from "@/components/bus-schedule-table";
import BUS_DATA from "@/data/bus-data";

export default function DestinationSection({selectedPlace, searchQuery}: {
    selectedPlace: string,
    searchQuery: string
}) {
    return <div
        key={selectedPlace}
        id={selectedPlace}
        className="destination-card"
    >
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex-1">{selectedPlace}</span>
                    <div className="text-gray-700 font-medium text-xs bg-gray-50 rounded-full px-2 py-1">
                        {BUS_DATA[selectedPlace].length} buses
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <BusScheduleTable schedules={BUS_DATA[selectedPlace]} searchQuery={searchQuery}/>
            </CardContent>
        </Card>
    </div>
}
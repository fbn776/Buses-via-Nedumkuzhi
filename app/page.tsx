"use client"
import "./app.css"
import {useState} from "react"
import {Search} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import DestinationSection from "@/components/destination-section";
import {PLACES} from "@/data/bus-data";
import PlaceSearch from "@/components/place-search";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [destination, setDestination] = useState(PLACES[0]);


    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-primary mb-2">Bus Timings via Nedumkuzhi</h1>
                    <p className="ribbon text-muted-foreground mx-auto text-xs sm:text-sm md:text-lg">Find your bus schedule easily</p>
                </header>

                <Card>
                <CardHeader className="pb-3">
                        <CardTitle className="text-xl">Select Destination</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PlaceSearch options={PLACES} value={destination} onValueChange={setDestination}/>
                    </CardContent>
                </Card>

                <Card className="mt-8 mb-8">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-xl">Search Bus Schedules</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                            <input
                                placeholder="Search by bus operator, or time..."
                                className="pl-10 py-2 w-full pr-4 rounded-md border"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 items-center">
                            <span className="text-sm font-medium text-muted-foreground">Quick filters:</span>
                            <button
                                className="bg-gray-100 px-2 text-muted-foreground rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground text-sm"
                                onClick={() => setSearchQuery("KSRTC")}
                            >
                                KSRTC
                            </button>
                            <button
                                className="bg-gray-100 px-2 text-muted-foreground rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground text-sm"
                                onClick={() => setSearchQuery("Morning")}
                            >
                                Morning
                            </button>
                            <button
                                className="bg-gray-100 px-2 text-muted-foreground rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground text-sm"
                                onClick={() => setSearchQuery("Evening")}
                            >
                                Evening
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <div>
                    <DestinationSection selectedPlace={destination} searchQuery={searchQuery}/>
                </div>
            </div>

            <p className="w-fit mx-auto bg-white shadow text-xs px-4 py-1 mb-3 rounded border text-center text-black/70">
                Made with ❤️ by <a className="text-blue-500/70" href="https://github.com/fbn776">fbn776</a>
            </p>
        </main>
    )
}


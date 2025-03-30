"use client"

import {useMemo, useState} from "react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {Bus, ChevronDown, Clock} from "lucide-react"

interface BusSchedule {
    sl: number
    bus: string
    time: string
}

interface BusScheduleTableProps {
    schedules: BusSchedule[]
    searchQuery: string
}

export default function BusScheduleTable({schedules, searchQuery}: BusScheduleTableProps) {
    const [sortBy, setSortBy] = useState<"time" | "bus">("time")

    const filteredAndSortedSchedules = useMemo(() => {
        let filtered = schedules
        if (searchQuery) {
            const query = searchQuery.toLowerCase()

            // Special case for "morning" and "evening" filters
            if (query === "morning") {
                filtered = schedules.filter((schedule) => {
                    const hour = Number.parseInt(schedule.time.split(":")[0])
                    const isPM = schedule.time.includes("PM")
                    return (!isPM && hour >= 4) || (isPM && hour < 12)
                })
            } else if (query === "evening") {
                filtered = schedules.filter((schedule) => {
                    const hour = Number.parseInt(schedule.time.split(":")[0])
                    const isPM = schedule.time.includes("PM")
                    return (isPM && hour >= 4) || hour === 12
                })
            } else {
                filtered = schedules.filter(
                    (schedule) => schedule.bus.toLowerCase().includes(query) || schedule.time.toLowerCase().includes(query),
                )
            }
        }

        // Sort the filtered schedules
        return [...filtered].sort((a, b) => {
            if (sortBy === "time") {
                // Convert time strings to comparable values
                const timeToMinutes = (timeStr: string) => {
                    const [time, period] = timeStr.split(" ")
                    let [hours, minutes] = time.split(":").map(Number)
                    if (period === "PM" && hours !== 12) hours += 12
                    if (period === "AM" && hours === 12) hours = 0
                    return hours * 60 + minutes
                }

                return timeToMinutes(a.time) - timeToMinutes(b.time)
            } else {
                // Sort by bus operator
                return a.bus.localeCompare(b.bus)
            }
        })
    }, [schedules, searchQuery, sortBy])

    // Check if we have any results after filtering
    const hasResults = filteredAndSortedSchedules.length > 0

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-muted-foreground">
                    {hasResults ? `Showing ${filteredAndSortedSchedules.length} results` : "No results found"}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-auto">
                            Sort by <ChevronDown className="ml-2 h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSortBy("time")}>
                            <Clock className="mr-2 h-4 w-4"/>
                            Departure Time
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("bus")}>
                            <Bus className="mr-2 h-4 w-4"/>
                            Bus Operator
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {hasResults ? (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Bus Operator</TableHead>
                                <TableHead>Departure Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAndSortedSchedules.map((schedule) => (
                                <TableRow key={schedule.sl} className="group hover:bg-muted/50">
                                    <TableCell className="font-medium">{schedule.sl}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Bus className="mr-2 h-4 w-4 text-muted-foreground"/>
                                            <span>{schedule.bus}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Clock className="mr-2 h-4 w-4 text-muted-foreground"/>
                                            <span>{schedule.time}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-8 border rounded-md bg-muted/10">
                    <p className="text-muted-foreground">No bus schedules match your search criteria.</p>
                    <Button variant="link" onClick={() => window.location.reload()} className="mt-2">
                        Reset filters
                    </Button>
                </div>
            )}
        </div>
    )
}


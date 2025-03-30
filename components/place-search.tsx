import {Check, ChevronsUpDown} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import useMediaQuery from "@/lib/hooks/use-media-query";
import {useCallback, useState} from "react";
import {Drawer, DrawerContent, DrawerTrigger,} from "@/components/ui/drawer"


interface SearchableSelectProps {
    options: string[]
    value: string
    onValueChange: (value: string) => void
    placeholder?: string
}

export default function SearchableSelect({options, value, onValueChange, placeholder = "Search..."}: SearchableSelectProps) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const OptionsList = useCallback(
        () => (
            <Command>
                <CommandInput placeholder={placeholder}/>
                <CommandList>
                    <CommandEmpty>No result found.</CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem
                                key={option}
                                value={option}
                                onSelect={(currentValue) => {
                                    onValueChange(currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check className={cn("mr-2 h-4 w-4", value === option ? "opacity-100" : "opacity-0")}/>
                                {option}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        ),
        [options, value, onValueChange, placeholder],
    )

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                        <div className="max-w-[100%] text-ellipsis whitespace-nowrap overflow-hidden">{value ? value : placeholder}</div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                    <OptionsList/>
                </PopoverContent>
            </Popover>
        )
    }

    // Use Drawer for mobile
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between">
                    <div className="max-w-[100%] text-ellipsis whitespace-nowrap overflow-hidden">{value ? value : placeholder}</div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <OptionsList/>
                </div>
            </DrawerContent>
        </Drawer>
    )
}


import {Loader} from 'lucide-react';


export default function Loading() {
    return <div className="size-full flex justify-center items-center">
        <Loader size="64px" className="animate-spin"/>
    </div>
}


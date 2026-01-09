import { LoaderCircleIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const TrafficChartSkeleton = () => {
  return (
    <Card className="col-span-full h-[400px]">
      <div className="size-full flex flex-col px-3">
        <div className="relative grow flex">
          <div className="absolute inset-0 flex flex-col justify-between">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="w-full border-t border-border/50" />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <LoaderCircleIcon className="animate-spin text-muted-foreground" />
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 pt-3">
          <div className="flex items-center gap-1.5">
            <div className="size-2 bg-chart-1 rounded-[2px] shrink-0" />
            <span className="text-xs">Visitors</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="size-2 bg-chart-2 rounded-[2px] shrink-0" />
            <span className="text-xs">Views</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrafficChartSkeleton;

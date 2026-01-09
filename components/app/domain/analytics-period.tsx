"use client";

import { formatISO, startOfDay, subDays, subHours, subMonths } from "date-fns";
import { parseAsString, useQueryStates } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  defaultValue: {
    from: string;
    to: string;
    period: string;
  };
};

const periods = [
  {
    value: "today",
    label: "Today",
    range: {
      from: startOfDay(new Date()),
      to: new Date(),
    },
  },
  {
    value: "24h",
    label: "Last 24 hours",
    range: {
      from: subHours(new Date(), 24),
      to: new Date(),
    },
  },
  {
    value: "7d",
    label: "Last 7 days",
    range: {
      from: startOfDay(subDays(new Date(), 6)),
      to: new Date(),
    },
  },
  {
    value: "30d",
    label: "Last 30 days",
    range: {
      from: startOfDay(subDays(new Date(), 29)),
      to: new Date(),
    },
  },
  {
    value: "6m",
    label: "Last 6 months",
    range: {
      from: startOfDay(subMonths(new Date(), 5)),
      to: new Date(),
    },
  },
  {
    value: "12m",
    label: "Last 12 months",
    range: {
      from: startOfDay(subMonths(new Date(), 11)),
      to: new Date(),
    },
  },
];

export function AnalyticsPeriod({ defaultValue }: Props) {
  const [params, setParams] = useQueryStates({
    from: parseAsString.withDefault(defaultValue.from),
    to: parseAsString.withDefault(defaultValue.to),
    period: parseAsString.withDefault(defaultValue.period),
  });

  const handleChangePeriod = (
    range: { from: Date | null; to: Date | null } | undefined,
    period?: string,
  ) => {
    if (!range) return;

    const newRange = {
      from: range.from
        ? formatISO(range.from, { representation: "date" })
        : params.from,
      to: range.to
        ? formatISO(range.to, { representation: "date" })
        : params.to,
      period,
    };

    setParams(newRange);
  };

  return (
    <Select
      defaultValue={params.period ?? undefined}
      onValueChange={(value) =>
        handleChangePeriod(periods.find((p) => p.value === value)?.range, value)
      }
    >
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Select a period" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {periods.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

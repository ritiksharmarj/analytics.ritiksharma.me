"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  formatISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { parseAsString, useQueryStates } from "nuqs";

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
    value: "yesterday",
    label: "Yesterday",
    range: {
      from: startOfDay(subDays(new Date(), 1)),
      to: endOfDay(subDays(new Date(), 1)),
    },
  },
  {
    value: "this_week",
    label: "This week",
    range: {
      from: startOfWeek(new Date()),
      to: new Date(),
    },
  },
  {
    value: "last_week",
    label: "Last week",
    range: {
      from: startOfWeek(subWeeks(new Date(), 1)),
      to: endOfWeek(subWeeks(new Date(), 1)),
    },
  },
  {
    value: "this_month",
    label: "This month",
    range: {
      from: startOfMonth(new Date()),
      to: new Date(),
    },
  },
  {
    value: "last_month",
    label: "Last month",
    range: {
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1)),
    },
  },
  {
    value: "3m",
    label: "Last 3 months",
    range: {
      from: startOfDay(subMonths(new Date(), 3)),
      to: new Date(),
    },
  },
  {
    value: "6m",
    label: "Last 6 months",
    range: {
      from: startOfDay(subMonths(new Date(), 6)),
      to: new Date(),
    },
  },
  {
    value: "all",
    label: "All time",
    range: {
      from: new Date("2020-01-01"),
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

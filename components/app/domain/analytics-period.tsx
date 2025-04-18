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
  formatISO,
  startOfMonth,
  startOfYear,
  subMonths,
  subWeeks,
} from "date-fns";
import { parseAsString, useQueryStates } from "nuqs";

type Props = {
  defaultValue: {
    from: string;
    to: string;
  };
};

const periods = [
  {
    value: "4w",
    label: "Last 4 weeks",
    range: {
      from: subWeeks(new Date(), 4),
      to: new Date(),
    },
  },
  {
    value: "3m",
    label: "Last 3 months",
    range: {
      from: subMonths(new Date(), 3),
      to: new Date(),
    },
  },
  {
    value: "6m",
    label: "Last 6 months",
    range: {
      from: subMonths(new Date(), 6),
      to: new Date(),
    },
  },
  {
    value: "12m",
    label: "Last 12 months",
    range: {
      from: subMonths(new Date(), 12),
      to: new Date(),
    },
  },
  {
    value: "mtd",
    label: "Month to date",
    range: {
      from: startOfMonth(new Date()),
      to: new Date(),
    },
  },
  {
    value: "ytd",
    label: "Year to date",
    range: {
      from: startOfYear(new Date()),
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
  const [params, setParams] = useQueryStates(
    {
      from: parseAsString.withDefault(defaultValue.from),
      to: parseAsString.withDefault(defaultValue.to),
      period: parseAsString,
    },
    {
      shallow: false,
    },
  );

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
    // execute(newRange);
  };

  return (
    <Select
      defaultValue={params.period ?? undefined}
      onValueChange={(value) =>
        handleChangePeriod(periods.find((p) => p.value === value)?.range, value)
      }
    >
      <SelectTrigger className="w-[180px]">
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

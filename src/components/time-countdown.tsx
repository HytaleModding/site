"use client";

import { useEffect, useState, ViewTransition } from "react";
import Counter from "@/components/ui/counter";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function getTimeLeft(targetDate: Date) {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function TimeCountdown({
  targetDate,
  enabled,
  options,
}: {
  targetDate: Date;
  enabled?: {
    days: boolean;
    hours: boolean;
    minutes: boolean;
    seconds: boolean;
  };
  options?: Omit<React.ComponentProps<typeof Counter>, "value" | "places">;
}) {
  const [days, setDays] = useState(() => getTimeLeft(targetDate).days);
  const [hours, setHours] = useState(() => getTimeLeft(targetDate).hours);
  const [minutes, setMinutes] = useState(() => getTimeLeft(targetDate).minutes);
  const [seconds, setSeconds] = useState(() => getTimeLeft(targetDate).seconds);

  useEffect(() => {
    const update = () => {
      const { days, hours, minutes, seconds } = getTimeLeft(targetDate);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const visible = {
    days: enabled?.days ?? true,
    hours: enabled?.hours ?? true,
    minutes: enabled?.minutes ?? true,
    seconds: enabled?.seconds ?? true,
  };

  const units = [
    { key: "days", value: days, visible: visible.days },
    { key: "hours", value: hours, visible: visible.hours },
    { key: "minutes", value: minutes, visible: visible.minutes },
    { key: "seconds", value: seconds, visible: visible.seconds },
  ].filter((unit) => unit.visible);

  return (
    <div className="text-primary inline-flex items-center gap-1">
      {units.map((unit, index) => (
        <span key={unit.key} className="inline-flex items-center gap-1">
          {index > 0 && (
            <span className="text-2xl leading-none font-extrabold">:</span>
          )}
          <Tooltip>
            <TooltipTrigger>
              <ViewTransition name={`countdown-${unit.key}`}>
                <Counter
                  value={unit.value}
                  places={[10, 1]}
                  fontSize={28}
                  padding={0}
                  horizontalPadding={0}
                  gap={1}
                  textColor="currentColor"
                  fontWeight={800}
                  topGradientStyle={{}}
                  bottomGradientStyle={{}}
                  {...options}
                />
              </ViewTransition>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {unit.key.charAt(0).toUpperCase() + unit.key.slice(1)}
            </TooltipContent>
          </Tooltip>
        </span>
      ))}
    </div>
  );
}

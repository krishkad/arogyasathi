'use client';

import { useEffect, useState } from 'react';

type TimestampProps = {
  date: Date;
  format?: Intl.DateTimeFormatOptions;
};

export default function Timestamp({ date, format }: TimestampProps) {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    const timeString = date.toLocaleTimeString([], format || {
      hour: '2-digit',
      minute: '2-digit',
    });
    setFormattedTime(timeString);
  }, [date, format]);

  return (
    <p className="text-xs opacity-70 mt-1">
      {formattedTime}
    </p>
  );
}

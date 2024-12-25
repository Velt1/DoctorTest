import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface DateTimeSelectorProps {
  selectedDate?: Date;
  selectedTime?: string;
  onDateChange?: (date: Date | undefined) => void;
  onTimeChange?: (time: string) => void;
  availableTimes?: string[];
}

const DEFAULT_AVAILABLE_TIMES = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const DateTimeSelector = ({
  selectedDate = new Date(),
  selectedTime = "9:00 AM",
  onDateChange = () => {},
  onTimeChange = () => {},
  availableTimes = DEFAULT_AVAILABLE_TIMES,
}: DateTimeSelectorProps) => {
  return (
    <Card className="p-6 bg-white w-full max-w-[500px]">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Select Time</h3>
          <Select value={selectedTime} onValueChange={onTimeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {availableTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-gray-500">
          <p>Selected appointment:</p>
          <p className="font-medium text-black">
            {selectedDate?.toLocaleDateString()} at {selectedTime}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DateTimeSelector;

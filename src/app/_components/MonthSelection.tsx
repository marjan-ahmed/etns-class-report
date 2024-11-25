"use client"
import React, { useState, useEffect } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from 'lucide-react';
import { addMonths } from 'date-fns';
import moment from 'moment';


interface MonthSelectionProps {
    selectedMonth: Date | null;
    onMonthChange: (value: Date | null) => void;
}

const MonthSelection: React.FC<MonthSelectionProps> = ({ selectedMonth, onMonthChange }) => {
    const today = new Date();
    const nextMonths = addMonths(today, 0);
    const [month, setMonth] = useState<Date | null>(selectedMonth || nextMonths);

    useEffect(() => {
        if (selectedMonth) {
            setMonth(selectedMonth);
        }
    }, [selectedMonth]);

    const handleMonthChange = (value: Date) => {
        setMonth(value);
        onMonthChange(value);
    };

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant='outline' className='flex gap-2 items-center text-slate-500'>
                        <CalendarDays />
                        {moment(month).format('MMM yyyy')}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        month={month}
                        onMonthChange={handleMonthChange}
                        className="flex flex-1 jusify-center"
                    />
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default MonthSelection;
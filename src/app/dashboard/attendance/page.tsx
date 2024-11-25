"use client"
import React, { useState } from 'react';
import GradeSelect from '@/app/_components/GradeSelect';
import MonthSelection from '@/app/_components/MonthSelection';
import { Button } from '@/components/ui/button';

export default function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>("9-E"); // Initialize with default grade

  const onSearchHandler = () => {
    console.log(selectedMonth, selectedGrade); // Log the selected values
  }

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      {/* Search Option */}
      <div className='flex gap-4 my-5 p-5 rounded-lg border shadow-sm'>
        <div className='flex gap-2 items-center'>
          <label>Select Month:</label>
          <MonthSelection selectedMonth={selectedMonth} onMonthChange={(value) => setSelectedMonth(value)} />
        </div>

        <div className='flex gap-2 items-center'>
          <label>Select Grade:</label>
          {/* Pass the setSelectedGrade function to GradeSelect */}
          <GradeSelect selectedGrade={setSelectedGrade} defaultGrade={selectedGrade} />
        </div>
        <Button onClick={onSearchHandler}>Search</Button>
      </div>

      {/* Student Attendance Grid */}
    </div>
  );
}
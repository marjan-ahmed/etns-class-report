"use client"
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import MonthSelection from '../_components/MonthSelection';
import GradeSelect from '../_components/GradeSelect';

function Dashboard() {
  const { setTheme } = useTheme()
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>("9-E"); // Default grade


  useEffect(() => {
    setTheme('system')
  })
  return (
    <div className='p-10'>
      <div className='flex flex-wrap justify-between items-center'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>

        <div className='flex items-center gap-4'>
          <MonthSelection selectedMonth={selectedMonth} onMonthChange={setSelectedMonth}/>
          <GradeSelect selectedGrade={setSelectedGrade} defaultGrade={selectedGrade}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
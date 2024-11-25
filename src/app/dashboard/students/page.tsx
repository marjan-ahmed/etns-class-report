import React from 'react'; // This import is correct.
import AddNewStudent from '@/app/dashboard/students/_components/AddNewStudent';
import StudentList from '@/app/dashboard/students/_components/StudentList';

const Students= () => {
  return (
    <div className='p-14'>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <AddNewStudent />
      <div className='mt-15'></div>
      <StudentList />
     
    </div>
  );
};

export default Students;
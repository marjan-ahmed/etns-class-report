"use client"
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/app/config/firebase';
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Search, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Student {
  id: string;
  fullName: string;
  grade: string;
  contactNumber: string;
  address: string;
}

interface StudentListProps {
  studentList?: Student[];
}

const StudentList: React.FC<StudentListProps> = ({ studentList }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const studentsCollection = collection(db, 'addStudents');

  useEffect(() => {
    const deleteStudents = async () => {
      try {
        const data = await getDocs(studentsCollection);
        const studentsList = data.docs.map((doc) => ({
          ...(doc.data() as Student),
          id: doc.id,
        }));
        setStudents(studentsList);
      } catch (error) {
        console.error('Error fetching students: ', error);
      }
    };

    deleteStudents();
  }, []);

  const deleteStudents = async (studentId: string) => {
    try {
      console.log("Deleting student with ID:", studentId);
      await deleteDoc(doc(db, 'addStudents', studentId));
      console.log("Student deleted successfully");
      setStudents(students.filter(student => student.id !== studentId));
      toast.success("Record deleted successfully");
    } catch (error) {
      console.error('Error deleting student: ', error);
      toast.error('Failed to delete record');
    }
  };

  const customBtns = (params: any) => {
    const studentName = params.data.fullName; // Get the student's name

    return (
      <AlertDialog>
        <AlertDialogTrigger><Button variant="destructive"><Trash /></Button></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the student record and remove their data from our servers. 
              <span style={{fontWeight: 'bold'}}> {studentName} </span>
              will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteStudents(params.data.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const colDefs: ColDef<Student>[] = [
    { field: "id", headerName: "ID", filter: true },
    { field: "fullName", headerName: "Full Name", filter: true },
    { field: "grade", headerName: "Grade", filter: true },
    { field: "contactNumber", headerName: "Contact Number", filter: true },
    { field: "address", headerName: "Address", filter: true },
    {
      headerName: "Actions",
      cellRenderer: customBtns,
    }
  ];

  const [rowData, setRowData] = useState<Student[]>([]);
  const pagination: boolean = true;
  const paginationPageSize: number = 10;
  const paginationPageSizeSelector: number[] = [25, 50, 100];
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (studentList) {
      setRowData(studentList);
    } else {
      setRowData(students);
    }
  }, [studentList, students]);

  return (
    <div className="my-7">
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
          <Search />
          <input
            type='text'
            placeholder='Search on Anything...'
            className='outline-none w-full'
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default StudentList;
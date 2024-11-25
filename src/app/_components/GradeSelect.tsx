'use client'
import React, { useState, useEffect } from 'react';

interface GradeSelectProps {
    selectedGrade: (grade: string) => void;
    defaultGrade?: string; // Optional prop if you want to pass a default value
}

const GradeSelect: React.FC<GradeSelectProps> = ({ selectedGrade, defaultGrade = "9-E" }) => {
    const [grade, setGrade] = useState<string>(defaultGrade);


    // Whenever the grade state changes, call the parent component's selectedGrade callback
    useEffect(() => {
        selectedGrade(grade);
    }, [grade, selectedGrade]); // Run when grade changes

    return (
        <div>
            <select
                className="p-3 border rounded-lg"
                value={grade}
                onChange={(e) => setGrade(e.target.value)} 
            >
                <option value="9-E">9-E</option>
                <option value="9-F">9-F</option>
            </select>
        </div>
    );
};

export default GradeSelect;
"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { db } from "@/app/config/firebase";
import { addDoc, collection } from "firebase/firestore";

const AddNewStudent = () => {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("9-E");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEffect, setResetEffect] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted"); // Debugging
    try {
      const addStudents = collection(db, "addStudents");
      console.log("Collection reference: ", addStudents); // Debugging
      await addDoc(addStudents, { fullName, grade, contactNumber, address });
      console.log("Document added successfully"); // Debugging
      setFullName("");
      setGrade("9-E");
      setContactNumber("");
      setAddress("");
      setLoading(false);
      setOpen(false);
      toast.success("Student added successfully");
    } catch (err) {
      console.error("Error adding document: ", err);
      setLoading(false);
      toast.error("Failed to add student");
    }
  };

  return (
    <div>
      <Button className="flex ml-auto" onClick={() => setOpen(true)}>
        + Add New Student
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                <form onSubmit={handleSubmit}>
                <div className="py-2">
                  <label>Full Name</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex. Henry Kelvin"
                    className={resetEffect ? "highlight" : ""}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Select Grade and Section</label>
                  <select
                    className={`p-3 border rounded-lg ${
                      resetEffect ? "highlight" : ""
                    }`}
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  >
                    <option value={"9-E"}>9-E</option>
                    <option value={"9-F"}>9-F</option>
                  </select>
                </div>
                <div className="py-2">
                  <label>Contact Number</label>
                  <Input
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Ex. 03067203802"
                    className={resetEffect ? "highlight" : ""}
                  />
                </div>
                <div className="py-2">
                  <label>Address</label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ex. D 32, D-Block, Raja street"
                    className={resetEffect ? "highlight" : ""}
                  />
                </div>
                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button type="button" onClick={() => setOpen(false)} variant="ghost">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
                  </Button>
                </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
      </Dialog>

      <style jsx>{`
        .highlight {
          animation: highlight-animation 1s ease;
        }

        @keyframes highlight-animation {
          0% {
            background-color: #fffbcc;
          }
          50% {
            background-color: #fff;
          }
          100% {
            background-color: #fff;
          }
        }
      `}</style>
    </div>
  );
};

export default AddNewStudent;
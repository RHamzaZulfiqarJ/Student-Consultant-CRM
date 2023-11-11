import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { getEmployees } from "../../redux/action/user";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateTranscript = ({ open, setOpen, scroll }) => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.user);

  const initialState = {
    staff: "",
    designation: "",
    phone: "",
    month: "",
    TSalary: "",
    lateArrivals: "",
    halfDays: "",
    dayOffs: "",
    NSalary: "",
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July ",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  ////////////////////////////////////////// STATES /////////////////////////////////////
  const [transcriptData, setTranscriptData] = useState(initialState);

  ////////////////////////////////////////// USE EFFECTS /////////////////////////////////
  useEffect(() => {
    dispatch(getEmployees());
  }, [open]);

  ////////////////////////////////////////// FUNCTIONS ///////////////////////////////////

  const handleChange = (field, value) => {
    setTranscriptData({ ...transcriptData, [field]: value });
  };

  const handleClose = () => {
    setTranscriptData(initialState);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Salary Slip</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 pb-0 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Slip Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Employee Name </td>
                <td className="pb-4">
                  <CFormSelect
                    value={transcriptData.staff}
                    onChange={(e) => handleChange("staff", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value={""}>Select an Option</option>
                    {employees.map((employee, key) => (
                      <option key={key} value={employee.username}>
                        {employee.username}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Designation </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("designation", e.target.value)}
                    value={transcriptData.designation}
                    name="designation"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Phone Number </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("phone", e.target.value)}
                    value={transcriptData.phone}
                    name="phone"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Salary Month </td>
                <td className="pb-4">
                  <CFormSelect
                    value={transcriptData.month}
                    onChange={(e) => handleChange("month", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value={""}>Select an Option</option>
                    {months.map((employee, key) => (
                      <option key={key} value={employee}>
                        {employee}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Total Salary </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("TSalary", e.target.value)}
                    value={transcriptData.TSalary}
                    name="TSalary"
                    size="small"
                    type="number"
                    fullWidth
                    InputProps={{
                      startAdornment: <div style={{ marginRight: 8, opacity: 0.5 }}>Rs.</div>,
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Late Arrivals </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("lateArrivals", e.target.value)}
                    value={transcriptData.lateArrivals}
                    name="lateArrivals"
                    size="small"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: <div style={{ marginRight: 8, opacity: 0.5 }}>X&nbsp;200</div>,
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Half Days </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("halfDays", e.target.value)}
                    value={transcriptData.halfDays}
                    name="halfDays"
                    size="small"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: <div style={{ marginRight: 8, opacity: 0.5 }}>X&nbsp;200</div>,
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Day Offs </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("dayOffs", e.target.value)}
                    value={transcriptData.dayOffs}
                    name="dayOffs"
                    size="small"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: <div style={{ marginRight: 8, opacity: 0.5 }}>X&nbsp;200</div>,
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Net Salary </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("NSalary", e.target.value)}
                    value={transcriptData.NSalary = transcriptData.TSalary - (transcriptData.lateArrivals * 200) - (transcriptData.halfDays * 200) - (transcriptData.dayOffs * 200)}
                    name="NSalary"
                    size="small"
                    type="number"
                    fullWidth
                    InputProps={{
                      startAdornment: <div style={{ marginRight: 8, opacity: 0.5 }}>Rs.</div>,
                    }}
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions className="mb-4 mr-7">
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 font-primary py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] transition-all">
            Cancel
          </button>
          <button
            variant="contained"
            className="bg-primary-red px-4 py-2 font-primary rounded-lg text-white mt-4 hover:bg-red-400">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTranscript;
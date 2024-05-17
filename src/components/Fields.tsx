import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTable } from "../redux/slice/CurrentTableSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import backend from "../backend";

interface AllData {
  [key: string]: string;
}

interface Props {
  currentRow: any,
  currentTable :CurrentTable[],
  setOpen :any
}

interface CurrentTable {
  column_name: string;
  data_type: string;
}

const Fields:React.FC<Props> = ({ currentRow , currentTable , setOpen }) => {
  console.log('====================================');
  console.log({currentrow :currentRow});
  console.log('====================================');
  const state: any = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [allData, setAllData] = useState<AllData>({});
  const dataType :any = {
    text: "text",
    numeric: "number",
    date: "date",
  };
  const handleInputChange = (colName: any, value: any) => {
    console.log("====================================");
    console.log(allData);
    console.log("====================================");
    setAllData((prevInputs) => ({
      ...prevInputs,
      [colName + state.currentTable.tableName]: value,
    }));
  };

  const handleAddData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //     currentTable.map((item)=>{
    //         if(!allData[item.column_name]) return alert('Add All Fields')
    //   })
    const newRow = currentTable.slice(0, -1).map((datas :any) => {
      return {
        colName: datas.column_name,
        value: allData[datas.column_name + state.currentTable.tableName],
      };
    });
    console.log("====================================");
    console.log(newRow);
    console.log("====================================");
    if (currentRow) {
      try {
        const response = await axios.put(`${backend}update`, {
          tableName: state.currentTable.tableName,
          newRow: newRow,
        });
        console.log("Response:", response.data);
        currentTable.map((datas :any) => {
          setAllData((prevInputs) => ({
            ...prevInputs,
            [datas.column_name + state.currentTable.tableName]: "",
          }));
        });
        setOpen(false)
        dispatch(fetchCurrentTable([state.currentTable.tableName, 'showtable']) );
        // dispatch(closeModal())

      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    } else {
      try {
        const response = await axios.post(`${backend}row`, {
          tableName: state.currentTable.tableName,
          newRow: newRow,
        });
        console.log("Response:", response.data);
        currentTable.map((datas :any) => {
          setAllData((prevInputs) => ({
            ...prevInputs,
            [datas.column_name + state.currentTable.tableName]: "",
          }));
        });
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const rowCallback = useCallback(() => {
    if (currentRow) {

      // const x = dispatch(fetchCurrentTable([state.currentTable.tableName, 'showtable']))

      // console.log('====================================');
      // console.log(x);
      // console.log('====================================');


      currentTable.slice(0, -1).map((item: any) => {
        item.data_type !== "date"
          ? setAllData((prevInputs) => ({
              ...prevInputs,
              [item.column_name + state.currentTable.tableName]:
                currentRow[item.column_name],
            }))
          : setAllData((prevInputs) => ({
              ...prevInputs,
              [item.column_name + state.currentTable.tableName]: formatDate(
                currentRow[item.column_name]
              ),
            }));
      });
    }
  }, []);

  useEffect(() => {
    rowCallback();

  }, []);

  
  if (state.currentTable.isLoading) {
    return (
      <div className=" max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md flex-1 overflow-y-scroll ">
        Loading....
      </div>
    );
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md flex-1 overflow-y-scroll">
        {!currentTable ? (
          <div>Error</div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">
              {!currentRow ? " Add Field" : "Edit Field"}
            </h2>
            <form action="" onSubmit={handleAddData}>
              <div className=" flex gap-6 flex-col">
                {currentTable.slice(1, -1)?.map((item :any) => (
                  <>
                    <div className=" flex gap-3">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Field Name
                        </label>
                        <input
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          value={item.column_name}
                          // onChange={handleFieldChange}
                          // onKeyDown={handleKeyPress}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Field Type
                        </label>
                        <input
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          value={item.data_type}
                          // onChange={handleFieldChange}
                          // onKeyDown={handleKeyPress}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Field Value
                        </label>
                        <input
                          required
                          key={item.column_name + state.currentTable.tableName}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          value={
                            allData?.[
                              item.column_name + state.currentTable.tableName
                            ]
                          }
                          onChange={(e) =>
                            handleInputChange(
                              item.column_name,
                              e.target.value,
                            )
                          }
                          type={dataType?.[item?.data_type]}
                          // onKeyDown={handleKeyPress}
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Fields;

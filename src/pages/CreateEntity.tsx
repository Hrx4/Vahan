import { ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTable } from "../redux/slice/TableListSlice";

const CreateEntity = () => {
  interface entityList {
    entity: String;
    type: String;
  }
  const [entityList, setEntityList] = useState<entityList[]>([]);

  const [fieldValue, setFieldValue] = useState("");
  const [tableName, setTableName] = useState("");
  const [fieldType, setFieldType] = useState<"NUMERIC" | "STRING" | "DATE">(
    "STRING"
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
  };
  const handleTableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableName(e.target.value);
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldType(e.target.value as "NUMERIC" | "STRING" | "DATE");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handleAddField = () => {
    if (fieldValue === "") return alert("Add Field Name");
    setEntityList([...entityList, { entity: fieldValue, type: fieldType }]);
    setFieldType("STRING");
    setFieldValue("");
  };

  const handleSubmitTable = async () => {
    if (tableName === "") return alert("Please add table name");
    try {
      const response = await axios.post("http://localhost:8080/", {
        tableName: tableName,
        entityList: entityList,
      });
      console.log("Response:", response.data);
      setEntityList([])
      setTableName('')
      alert('Table Added')
      dispatch(fetchTable())

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-14 mt-8 h-[550px] p-5   mb-40 flex">
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md flex-1 overflow-y-scroll">
          <div className=" flex gap-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Field Name
              </label>
              <input
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={fieldValue}
                onChange={handleFieldChange}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Field Type
              </label>
              <select
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={fieldType}
                onChange={handleTypeChange}
              >
                <option value="STRING">STRING</option>
                <option value="NUMERIC">NUMERIC</option>
                <option value="DATE">DATE</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleAddField}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md flex-1 overflow-y-scroll">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Table Name
            </label>
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={tableName}
              onChange={handleTableNameChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <h2 className="text-lg font-semibold mb-4">Fields</h2>
          {entityList.length ? (
            <>
              <table className=" border border-black">
                <thead>
                  <th className=" p-3 border border-black">Field Name</th>
                  <th className=" p-3 border border-black">Field Type</th>
                </thead>
                <tbody>
                  {entityList.map((item) => (
                    <tr>
                      <td className="border p-3 border-black">{item.entity}</td>
                      <td className="border p-3 border-black">{item.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleSubmitTable}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            </>
          ) : (
            <h2>Add Some Field</h2>
          )}
        </div>

        <div></div>
      </div>
    </>
  );
};

export default CreateEntity;

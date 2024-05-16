
import { useState } from "react";
import CreateEntity from "./CreateEntity";
import AddEntry from "./AddEntry";

const MainPage = () => {
  const [view, setView] = useState("createentity");

  return (
    <>
      <div className=" w-full min-h-[650px] flex">
        <div className="  w-52 h-dvh font-bold text-lg flex flex-col items-center p-2 gap-7 border border-black">
          <div
            className=" hover:border hover:border-yellow-500 p-2 cursor-pointer"
            onClick={() => setView("createentity")}
          >
            Create Entity
          </div>
          <div
            className=" hover:border hover:border-yellow-500 p-2 cursor-pointer"
            onClick={() => setView("addentry")}
          >
            Add Entry
          </div>
          <div
            className=" hover:border hover:border-yellow-500 p-2 cursor-pointer"
            onClick={() => setView("showtable")}
          >
            Show Table
          </div>
        </div>
        {view === "createentity" ? <CreateEntity /> : null}
        {view === "addentry" ? <AddEntry showTable={null} /> : null}
        {view === "showtable" ? <AddEntry showTable={"showtable"} /> : null}
      </div>
    </>
  );
};

export default MainPage;

import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdUpdate } from "react-icons/md";
function Bar() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  async function getdata() {
    const dataa = await axios.get("http://localhost:3001/todos");
    console.log(dataa.data);
    setData(dataa.data);
  }
  async function updatedata() {
    const up = await axios.put(
      `http://localhost:3001/todos/update/${updateId}`,
      { _id: updateId, task: data1 }
    );
    console.log(up);
  }
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-5">
        <form className="flex flex-row gap-5">
          <input
            type="text"
            value={data1}
            name=""
            id=""
            className="border-2 border-slate-500 p-2 shadow-xl"
            onChange={(e) => {
              e.preventDefault();
              setData1(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-slate-500 p-2 rounded-xl shadow-xl"
            disabled={update}
            onClick={async (e) => {
              e.preventDefault();
              await axios.post("http://localhost:3001/todos", { task: data1 });
              setData1("");
              getdata();
              console.log("posted");
            }}
          >
            Add
          </button>
          {update ? (
            <button
              className="bg-slate-500 p-2 rounded-xl shadow-xl"
              onClick={() => {
                updatedata();
                setUpdate(false);
                setUpdateId(null);
                setData1("");
                getdata();
                console.log("update cliked");
              }}
            >
              <MdUpdate />
            </button>
          ) : (
            " "
          )}
        </form>
        <ul className="flex flex-col gap-1">
          {data.map((d, i) => {
            return (
              <li
                className="p-2 bg-green-500 rounded-xl text-center flex flex-row gap-5 justify-center items-center"
                key={i}
              >
                <p className="">{d.task}</p>
                <div className="flex ml-auto">
                  <button
                    className="p-2"
                    onClick={async () => {
                      const da = await axios.delete(
                        `http://localhost:3001/todos/delete/${d._id}`
                      );
                      getdata();
                      console.log("clicked", d._id, da);
                    }}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className="p-2"
                    onClick={() => {
                      setData1(d.task);
                      setUpdate(true);
                      setUpdateId(d._id);
                    }}
                  >
                    <CiEdit />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Bar;

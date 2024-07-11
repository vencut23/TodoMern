import { useState ,useEffect} from "react";
import axios from 'axios';
import { MdDelete } from "react-icons/md";

function Bar() {
    const [data,setData] = useState([]);
    const [data1,setData1] = useState("");
    async function getdata(){
        const dataa= await axios.get("http://localhost:3001/todos");
        console.log(dataa.data);
        setData(dataa.data);
    }
    useEffect(() => {
        getdata();
    }, []);
  return (
    <>
    <div className="flex flex-col gap-5">
      <form className="flex flex-row gap-5" onSubmit={async (e)=>{e.preventDefault(); await axios.post("http://localhost:3001/todos",{task:data1}); setData1(''); getdata(); console.log('posted')}}>
           <input type="text" value={data1} name="" id="" className="border-2 border-slate-500 p-2 shadow-xl" onChange={(e)=>{ e.preventDefault(); setData1(e.target.value); }} />
           <button type="submit" className="bg-slate-500 p-2 rounded-xl shadow-xl">Add</button>
      </form>
      <ul className="flex flex-col gap-1">
        {
           data.map((d,i)=>{
            return(
                <li className="p-2 bg-green-500 rounded-xl text-center flex flex-roe gap-5" key={i}>
                    <p>{d.task}</p>
                    <button onClick={async ()=>{const da=await axios.delete(`http://localhost:3001/todos/delete/${d._id}`,); getdata(); console.log('clicked',d._id,da);} }>
                    <MdDelete/>
                    </button>
                </li>
            )
           })
        }
      </ul>
      </div>
    </>
  )
}

export default Bar
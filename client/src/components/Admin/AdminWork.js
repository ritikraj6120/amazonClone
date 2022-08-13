import { useParams } from "react-router-dom"
import AddItem from './AddItem'
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";
const AdminWork = () => {
    let {work}=useParams();
  return (
    <>
      {
        work === "additem" ? <AddItem/> : (work==="edititem"?<UpdateItem/>:<DeleteItem/>)
      }
    </>
  )
}

export default AdminWork
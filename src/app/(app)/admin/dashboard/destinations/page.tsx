
import { getDestinations } from "@/lib/actions";  
import AdminDestinationsPage from "../../../../../components/admin/admin-destination";

export default async function AdminDestinations() {  
  const data = await getDestinations()
  // console.log('Destinations :', data);
  

  return (  
    <div className="space-y-6">  
      <AdminDestinationsPage destinations={data}/>
    </div>  
  );  
}  
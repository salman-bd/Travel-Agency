
import { getDestinations } from "@/lib/actions";  
import AdminDestinations from "./admin-destination";

export default async function Page() {  
  const data = await getDestinations()
  console.log('Destinations :', data);
  

  return (  
    <div className="space-y-6">  
      <AdminDestinations destinations={data}/>
    </div>  
  );  
}  
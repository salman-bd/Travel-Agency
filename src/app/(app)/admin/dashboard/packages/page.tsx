
import { getPackages } from "@/lib/actions";  
import AdminPackages from "./admin-packages";

export default async function Page() {  
  const data = await getPackages()
  console.log('Packages :', data);
  

  return (  
    <div className="space-y-6">  
      <AdminPackages packages={data}/>
    </div>  
  );  
}  
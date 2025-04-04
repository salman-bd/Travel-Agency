
import { getDestinations } from "@/lib/actions";  
import AdminDestinationsPage from "@/components/admin/admin-destination";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDestinations() {  
  const user = await getCurrentUser()
  const userRole = user?.role
  if (!user || userRole !== "ADMIN") {
    redirect("/admin/signin")
  }
  const data = await getDestinations()
  // console.log('Destinations :', data);
  

  return (  
    <div className="space-y-6">  
      <AdminDestinationsPage destinations={data}/>
    </div>  
  );  
}  
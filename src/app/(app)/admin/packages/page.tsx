
import { getPackages } from "@/lib/actions";  
import AdminPackages from "@/components/admin/admin-packages";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {  
  const user = await getCurrentUser()
  const userRole = user?.role
  if (!user || userRole !== "ADMIN") {
    redirect("/admin/signin")
  }
  const data = await getPackages()
  // console.log('Packages :', data);
  

  return (  
    <div className="space-y-6">  
      <AdminPackages packages={data}/>
    </div>  
  );  
}  
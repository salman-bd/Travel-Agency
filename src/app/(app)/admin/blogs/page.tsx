import { getBlogs } from "@/lib/actions"
import AdminBlogsPage from "@/components/admin/admin-blog";

export default async function AdminBlogs() {
  const blogs = await getBlogs()
  // console.log('Blogs: ', blogs);
  

  return (
    <div className="">
      <AdminBlogsPage blogs={blogs}/>
    </div>
  )
}


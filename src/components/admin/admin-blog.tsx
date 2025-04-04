'use client'; // Add this line to specify that this is a Client Component  

import Link from "next/link";  
import { Button } from "@/components/ui/button";  
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";  
import { Badge } from "@/components/ui/badge";  
import { Edit, Trash2, Plus } from "lucide-react";  
import { deleteBlog } from "@/lib/actions";  
import { BlogPost } from "@/types/admin";  

interface AdminBlogsProps {  
  blogs: BlogPost[];  
}  

export default function AdminBlogsPage({ blogs }: AdminBlogsProps) {  
  const handleDeleteBlog = async (blogId: string) => {  
    const confirmed = confirm("Are you sure you want to delete this blog?");  
    if (confirmed) {  
      await deleteBlog(blogId); // Call the deleteBlog action here  
      // Optionally, you can add logic to re-fetch the blogs or update the state  
    }  
  };  

  return (  
    <div className="space-y-6">  
      <div className="flex items-center justify-between">  
        <h1 className="text-2xl font-bold">Blogs</h1>  
        <Link href="/admin/blogs/new">  
          <Button>  
            <Plus className="mr-2 h-4 w-4" /> Add New Blog  
          </Button>  
        </Link>  
      </div>  
      <div className="rounded-md border">  
        <Table>  
          <TableHeader>  
            <TableRow>  
              <TableHead>Title</TableHead>  
              <TableHead>Author</TableHead>  
              <TableHead>Category</TableHead>  
              <TableHead>Status</TableHead>  
              <TableHead>Date</TableHead>  
              <TableHead className="text-right">Actions</TableHead>  
            </TableRow>  
          </TableHeader>  
          <TableBody>  
            {blogs.length === 0 ? (  
              <TableRow>  
                <TableCell colSpan={6} className="text-center">  
                  No blogs found  
                </TableCell>  
              </TableRow>  
            ) : (  
              blogs.map((blog) => (  
                <TableRow key={blog.id}>  
                  <TableCell className="font-medium">{blog.title}</TableCell>  
                  <TableCell>{blog.author.name}</TableCell>  
                  <TableCell>{blog.category}</TableCell>  
                  <TableCell>  
                    <Badge variant={blog.published ? "default" : "outline"}>  
                      {blog.published ? "Published" : "Draft"}  
                    </Badge>  
                  </TableCell>  
                  <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>  
                  <TableCell className="text-right">  
                    <div className="flex justify-end gap-2">  
                      <Link href={`/admin/blogs/${blog.id}`}>  
                        <Button variant="ghost" size="icon" className="cursor-pointer">  
                          <Edit className="h-4 w-4" />  
                          <span className="sr-only">Edit</span>  
                        </Button>  
                      </Link>  
                      <Button  
                        variant="ghost"  
                        size="icon"  
                        type="button" // Set type to button to prevent form submission  
                        onClick={() => handleDeleteBlog(blog.id)}  
                      >  
                        <Trash2 className="h-4 w-4 text-destructive" />  
                        <span className="sr-only">Delete</span>  
                      </Button>  
                    </div>  
                  </TableCell>  
                </TableRow>  
              ))  
            )}  
          </TableBody>  
        </Table>  
      </div>  
    </div>  
  );  
}  
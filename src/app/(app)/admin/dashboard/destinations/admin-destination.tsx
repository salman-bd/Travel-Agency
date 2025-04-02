'use client';

import { useState, useEffect } from 'react';  
import Link from "next/link";  
import Image from "next/image";  
import { Button } from "@/components/ui/button";  
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";  
import { Badge } from "@/components/ui/badge";  
import { Edit, Trash2, Plus } from "lucide-react";  
import { deleteDestination } from "@/lib/actions";  
import { Destination } from '@/types/destination';

interface AdminDestinationProps {
  destinations: Destination[]
}
export default function AdminDestinationsPage({ destinations }: AdminDestinationProps) {  
 
  // Function to handle delete  
  const handleDelete = async (id: string) => {  
    await deleteDestination(id);   
  };  

  return (  
    <div className="space-y-6">  
      <div className="flex items-center justify-between">  
        <h1 className="text-2xl font-bold">Destinations</h1>  
        <Link href="/admin/dashboard/destinations/new">  
          <Button>  
            <Plus className="mr-2 h-4 w-4" /> Add New Destination  
          </Button>  
        </Link>  
      </div>  

      <div className="rounded-md border">  
        <Table>  
          <TableHeader>  
            <TableRow>  
              <TableHead>Image</TableHead>  
              <TableHead>Name</TableHead>  
              <TableHead>Country</TableHead>  
              <TableHead>Category</TableHead>  
              <TableHead>Price</TableHead>  
              <TableHead>Featured</TableHead>  
              <TableHead className="text-right">Actions</TableHead>  
            </TableRow>  
          </TableHeader>  
          <TableBody>  
            {destinations.length === 0 ? (  
              <TableRow>  
                <TableCell colSpan={7} className="text-center">  
                  No destinations found  
                </TableCell>  
              </TableRow>  
            ) : (  
              destinations.map((destination) => (  
                <TableRow key={destination.id}>  
                  <TableCell>  
                    <div className="h-10 w-10 overflow-hidden rounded-md">  
                      <Image  
                        src={destination.imageUrl || "/placeholder.svg"}  
                        alt={destination.name}  
                        width={40}  
                        height={40}  
                        className="h-full w-full object-cover"  
                      />  
                    </div>  
                  </TableCell>  
                  <TableCell className="font-medium">{destination.name}</TableCell>  
                  <TableCell>{destination.country}</TableCell>  
                  <TableCell>{destination.category}</TableCell>  
                  <TableCell>${destination.price.toFixed(2)}</TableCell>  
                  <TableCell>  
                    <Badge variant={destination.featured ? "default" : "outline"}>  
                      {destination.featured ? "Featured" : "Standard"}  
                    </Badge>  
                  </TableCell>  
                  <TableCell className="text-right">  
                    <div className="flex justify-end gap-2">  
                      <Link href={`/admin/dashboard/destinations/${destination.id}`}>  
                        <Button variant="ghost" size="icon">  
                          <Edit className="h-4 w-4" />  
                          <span className="sr-only">Edit</span>  
                        </Button>  
                      </Link>  
                      <Button  
                        variant="ghost"  
                        size="icon"  
                        type="button"  
                        onClick={() => handleDelete(destination.id)}  
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
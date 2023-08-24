import React from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { useState,useEffect } from "react";
// get product api
export let getProductsApi = fetch("http://localhost:5000/Admin/getProducts");
// http://128.199.221.11:5000/Admin/getCources
export let getCourcesApi  = fetch("http://localhost:5000/Admin/getCources");


export const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Delete the product
        await fetch(`http://localhost:5000/Admin/dellProduct/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              console.log("Resource deleted successfully");
              // Call getData to fetch updated product list
            //   getData();
            } else {
              console.error("Error deleting resource");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        
        Swal.fire(
          'Deleted!',
          'Your Prodcut has been deleted.',
          'success'
        )
      }
    });
  };

const Const = () => {
    const [getProducts, setProducts] = useState([]);
  return (
    <div>Const</div>
  )
  
}


export default Const
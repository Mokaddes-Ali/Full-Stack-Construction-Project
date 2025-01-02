import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/construction-projects/${id}`)
      .then((response) => {
        const fields = ["name", "location", "status"];
        fields.forEach((field) => setValue(field, response.data.data[field]));
      })
      .catch((error) => console.error(error));
  }, [id, setValue]);

  const onSubmit = (data) => {
    axios.put(`/api/construction-projects/${id}`, data)
      .then(() => {
        alert("Project updated successfully!");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input type="text" {...register("location")} className="w-full p-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select {...register("status")} className="w-full p-2 border rounded">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;

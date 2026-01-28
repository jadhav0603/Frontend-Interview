import React from "react";

const SelectedCard = ({ data }) => {
  console.log(data);
  if (!data) return null;

  return (
    <div className="bg-gray-100 mt-5 border border-gray-300 rounded-2xl">
      <img
        className="w-full h-88.5 rounded-t-lg"
        src={data.coverImage}
        alt={data.title}
      />

      <div className="p-5">
        <p className="font-Blue-600 text-sm font-bold text-blue-800">FINANCE</p>
        <p className="text-3xl font-extrabold">{data.title}</p>

        <div className="bg-gray-200 my-3 py-3 border border-gray-300 rounded-2xl flex justify-around items-center">
          <div className="text-center">
            <p className="font-semibold text-gray-500">CATEGORY</p>
            {/* {
          data.category.map((cat,i)=>(
            <p>{cat}</p>
          ))
          } */}
            <p>{data.category}</p>
          </div>
          <span> | </span>
          <div className="text-center">
            <p className="font-semibold text-gray-500">DATE</p>
            <p> {data.date.split("T")[0]}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-5">
          <div>
          <p className="font-bold">Description</p>
          <p>{data.description}</p>
        </div>

        <div>
        <p className="font-bold">Content</p>
        <p>{data.content}</p>
        </div>

        <div>
          <p className="font-bold">Tags</p>
          <p>Tag's are not available</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCard;

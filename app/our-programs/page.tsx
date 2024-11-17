import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center md:ml-[220px] p-8">
      <section className="flex justify-between items-center w-full">
				<h1 className="text-3xl md:text-6xl font-bold">Our Programs</h1>
				<a href="/our-programs/add" className="px-5 py-3 rounded-lg bg-[#b3ff00] text-center font-semibold">Add a program</a>
			</section>
			
			<section className="flex justify-center mt-8">
				<div className="p-8 bg-neutral-200 rounded-lg">
					<p className="font-semibold">You haven't had any programs yet.</p>
				</div>
			</section>
    </div>
  );
};

export default page;

"use client";
import React, { useState, useEffect } from "react";

const page = () => {
	const [schedule, setSchedule] = useState([0]);
	
	const getSchedule = async () => {
		const response = await fetch('/api/schedule');
		const res_json = await response.json();
		const data = await res_json.data;
		setSchedule(data);
	};
	
	useEffect(() => {
		getSchedule();
	}, []);

  return (
    <div className="flex flex-col justify-center items-center md:ml-[220px] px-2 py-8">
      <h1 className="text-2xl md:text-5xl font-bold">Public & Online Training Schedule Request</h1>
			
			{schedule.length == 0 && (
        <section className="flex justify-center mt-8">
          <div className="p-8 bg-neutral-200 rounded-lg">
            <p className="font-semibold">No schedule request yet.</p>
          </div>
        </section>
      )}
			
			{(schedule[0] != 0 && schedule.length > 0) &&
				<div className="w-[95%] overflow-x-auto">
					<table className="w-full mt-8 table-auto">
						<thead>
							<tr className="border-b-[1px] border-neutral-100 bg-neutral-800 text-white">
								<th className="rounded-tl-md p-[8px]">Name</th>
								<th className="p-[8px]">Company</th>
								<th className="p-[8px]">Position</th>
								<th className="p-[8px]">Office Number</th>
								<th className="p-[8px]">WhatsApp Number</th>
								<th className="p-[8px]">Email</th>
								<th className="rounded-tr-md p-[8px]">Training Type</th>
							</tr>
						</thead>
						<tbody>
							{schedule.map((rec) => (
								<tr className="border-b-[1px] border-neutral-300 bg-neutral-100" key={rec.documentId}>
									<th className="px-2 py-8">{rec.Name}</th>
									<th className="px-2 py-8">{rec.Company}</th>
									<th className="px-2 py-8">{rec.Position}</th>
									<th className="px-2 py-8">{rec.Office_Number}</th>
									<th className="px-2 py-8">{rec.WhatsApp_Number}</th>
									<th className="px-2 py-8">{rec.Email}</th>
									<th className="px-2 py-8">{rec.Training_Type}</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			}
    </div>
  );
};

export default page;

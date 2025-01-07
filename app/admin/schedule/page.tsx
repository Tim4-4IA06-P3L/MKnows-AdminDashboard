"use client";
import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import Spinner from "../../components/Spinner";
import BlockBackground from "../../components/BlockBackground";
import NoContentBox from "../../components/NoContentBox";
import { Schedule } from "@/app/Types";

const Page = () => {
	const [schedule, setSchedule] = useState<Schedule[] | number[]>([0]);
	const [allLoaded, setAllLoaded] = useState(false);

	const getSchedule = async () => {
		const response = await fetch('/api/schedule');
		const res_json = await response.json();
		const data = await res_json.data;
		setSchedule(data);
	};

	useEffect(() => {
		getSchedule();
		setAllLoaded(true);
	}, []);

	return (
		<>
			<Title title="Public & Online Training Schedule Request" />

			{!allLoaded &&
				<BlockBackground bgColor="bg-neutral-500/[0.5]">
					<Spinner />
				</BlockBackground>
			}

			{(schedule.length == 0 || schedule[0] == 0) && (
				<NoContentBox message="No schedule request yet." />
			)}

			{(schedule[0] != 0 && schedule.length > 0) &&
				<div className="w-full overflow-x-auto">
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
							{schedule.map((rec, index) => (typeof rec != 'number' &&
								<tr className={`${index != schedule.length - 1 && "border-b-[1px] border-neutral-300"} bg-neutral-100`} key={rec.documentId}>
									<th className={`px-2 py-8 ${index == schedule.length - 1 && "rounded-bl-md"}`}>{rec.Name}</th>
									<th className="px-2 py-8">{rec.Company}</th>
									<th className="px-2 py-8">{rec.Position}</th>
									<th className="px-2 py-8">{rec.Office_Number}</th>
									<th className="px-2 py-8">{rec.WhatsApp_Number}</th>
									<th className="px-2 py-8">{rec.Email}</th>
									<th className={`px-2 py-8 ${index == schedule.length - 1 && "rounded-br-md"}`}>{rec.Training_Type}</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			}
		</>
	);
};

export default Page;

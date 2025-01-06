"use client";

import { useEffect, useState } from "react";
import { get } from "../lib/api";
import { Set } from "../lib/types";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const [sets, setSets] = useState<Set[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const data: Set[] = await get("/sets");
        setSets(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchSets();
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sets.map((set) => (
          <div
            key={set.id}
            onClick={() => router.push(`/sets/${set.id}/cards`)} 
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={set.logo_url}
              alt={set.name}
              className="w-full h-32 object-contain bg-gray-100"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                {set.name}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Serie:</strong> {set.series}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Total Impreso:</strong> {set.printed_total}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Lanzamiento:</strong>{" "}
                {new Date(set.release_date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

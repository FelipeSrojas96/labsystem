"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { get } from "../../../../lib/api";
import { Card } from "../../../../lib/types";
export default function CardList() {
  const params = useParams(); 
  const setId = params?.setId; 
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const data: Card[] = await get(`/sets/${setId}/cards`);
        setCards(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [setId]);

  if (loading) return <p>Loading cards...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => router.push("/")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Volver a Sets
      </button>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Numero</th>

              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Supertype</th>
              <th className="px-4 py-2">Subtypes</th>
              <th className="px-4 py-2">Tipos</th>
              <th className="px-4 py-2">Rareza</th>
              <th className="px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, index) => (
              <tr
                key={card.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border px-4 py-2">{card.number}</td>

                <td className="border px-4 py-2">{card.name}</td>
                <td className="border px-4 py-2">{card.supertype}</td>
                <td className="border px-4 py-2">{card.subtypes.join(", ")}</td>
                <td className="border px-4 py-2">{card.types.join(", ")}</td>
                <td className="border px-4 py-2">{card.rarity}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      router.push(`/sets/${setId}/cards/${card.id}`)
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

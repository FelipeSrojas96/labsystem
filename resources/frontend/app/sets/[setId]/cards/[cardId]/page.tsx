"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Card } from "../../../../../lib/types";
import { get } from "../../../../../lib/api";
const CardView = () => {
  const params = useParams();
  const cardId = params?.cardId; 
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        setLoading(true);
        const response: Card = await get(`/cards/${cardId}`);
        console.log(response);
        setCard(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchCardDetails();
  }, [cardId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!card) return null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => router.push(`/sets/${card.set}/cards/`)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Volver a Cartas
      </button>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Column - Image */}
          <div className="flex justify-center">
            <img
              src={card.image[1].url} 
              alt={card.name}
              className="w-full max-w-sm rounded-lg shadow-md object-contain"
            />
          </div>

          {/* Right Column - Data */}
          <div>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              {card.name}
            </h1>
            <p className="text-sm text-gray-600">
              <strong>Supertype:</strong> {card.supertype}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Subtypes:</strong> {card.subtypes.join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Tipos:</strong> {card.types.join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Rareza:</strong> {card.rarity}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Set:</strong> {card.set}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Numero:</strong> {card.number}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Informacion de Mercado:</strong>
            </p>
            <ul className="list-disc list-inside">
              {card.market.map((market) => (
                <li key={market.id}>
                  <a
                    href={market.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline "
                  >
                    {market.market}
                  </a>{" "}
                  (Updated:{" "}
                  {new Date(market.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  )
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardView;

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

/**
 * Función para realizar peticiones GET al backend.
 * @param {string} endpoint - Endpoint al que se realiza la consulta (ej: "/sets").
 * @returns {Promise<any>} Respuesta de la API.
 */
export async function get(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error en GET: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en GET:", error);
    throw error;
  }
}

/**
 * Función para realizar peticiones POST al backend.
 * @param {string} endpoint - Endpoint al que se realiza la consulta (ej: "/create").
 * @param {object} body - Cuerpo de la solicitud.
 * @returns {Promise<any>} Respuesta de la API.
 */
export async function post(endpoint, body) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error en POST: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en POST:", error);
    throw error;
  }
}

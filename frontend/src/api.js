const API_BASE_URL = "http://localhost:5000"; // Your backend URL

export async function fetchFacultyData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/faculty`);
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

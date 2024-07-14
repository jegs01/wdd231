export const fetchBirdData = async (family) => {
    const cachedData = localStorage.getItem(family);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    try {
        const response = await fetch(`https://birds-species.p.rapidapi.com/birds_api/group?meta_property=scientific_classification&meta_property_attribute=family&property_value=${family}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'birds-species.p.rapidapi.com',
                'x-rapidapi-key': 'df9981657dmshc156546c636faeep1d9b35jsnf602ea373dd0'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem(family, JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching bird data:', error);
        throw error;
    }
};

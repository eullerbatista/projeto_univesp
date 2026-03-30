const API_URL = 'https://api.example.com/pacientes';

export const getPacientes = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const pacientes = await response.json();
        return pacientes;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};
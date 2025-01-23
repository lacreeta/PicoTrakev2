// src/__mocks__/nominatim.ts
const mockNominatimResponse = [
    {
      display_name: "Madrid, España",
      lat: "40.4168",
      lon: "-3.7038",
    },
  ];
  
  export const mockFetch = (url: string) => {
    if (url.includes('nominatim.openstreetmap.org')) {
      return Promise.resolve({
        json: () => Promise.resolve(mockNominatimResponse),
      });
    }
    return Promise.reject(new Error('Unknown URL'));
  };
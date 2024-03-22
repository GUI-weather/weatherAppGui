// Custom hook to track user's current geolocation
export function useLocation() {
    // State variable to store latitude and longitude
    const [position, setPosition] = useState({ latitude: null, longitude: null });
  
    // Effect hook to get current geolocation
    useEffect(() => {
      // Check if geolocation is supported by the browser
      if ("geolocation" in navigator) {
        // Get current position using geolocation
        navigator.geolocation.getCurrentPosition(function (position) {
          // Update position state with current latitude and longitude
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        // Log a message if geolocation is not available in the browser
        console.log("Location is not available in your browser. Please use a different browser to get the full experience.");
      }
    }, []); // Empty dependency array to ensure useEffect only runs once
  
    // Return the location that the user is currently in 
    return position;
  }
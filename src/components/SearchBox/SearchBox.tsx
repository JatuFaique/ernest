import React, { useEffect, FormEvent } from "react";
import useLocationSearch from "@/hooks/useLocationSearch";
import { useDispatch } from "react-redux";
import "./SearchBox.css";
import { updateWeatherData } from "@/store/weatherSlice";

// Define the component
const SearchBox: React.FC = () => {
    const { data, setSearchLocation } = useLocationSearch();
    const dispatch = useDispatch();

    // Handle the form submission
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const location = (
            e.currentTarget.elements.namedItem("location") as HTMLInputElement
        ).value;
        setSearchLocation(location);
    };

    // Update weather data when data from the hook is available
    useEffect(() => {
        if (data) {
            dispatch(updateWeatherData(data));
        }
    }, [data, dispatch]);

    return (
        <div>
            <div className="search-bar">
                <div className="search-icon"></div>
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        name="location"
                        type="text"
                        placeholder="Search for places..."
                    />
                    <button type="submit" className="search-btn">
                        🌍
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchBox;

import React from "react";
import "./header.css";
import TempToggle from "@/components/TempToggle/TempToggle";
import useUnsplashPhotos from "@/hooks/useUnspashPhoto";
function Header() {
    const { photos } = useUnsplashPhotos("user");

    return (
        <div className="header">
            <div className="tabs">
                <div className="tab">Today</div>
                <div className="tab active">Week</div>
            </div>

            <TempToggle />
            <div className="profile-pic">
                {photos && photos.length > 0 && (
                    <img
                        src={photos[0].urls.regular}
                        alt="Profile Picture"
                        className="profile-pic"
                    />
                )}
            </div>
        </div>
    );
}

export default Header;

import React from 'react';

const Header = () => {
    return (
        <div className="bg-gray-200 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Live Object Model</h1>
            <div>
                <a
                    href="https://docs.cycling74.com/max8/vignettes/live_object_model"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 mr-4"
                >
                    Official Docs
                </a>
                <a
                    href="https://open.spotify.com/artist/7G0gs6hvhKjAwJPTMzzVZa?si=UaDss68ZSv2EpNXds3QKcA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800"
                >
                    Spotify
                </a>
            </div>
        </div>
    );
};

export default Header;

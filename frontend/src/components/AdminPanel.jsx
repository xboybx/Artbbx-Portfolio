import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { toast } from "react-hot-toast";

function AdminPanel() {
  const {
    tracks,
    addTrack,
    updateTrack,
    deleteTrack,
    settings,
    updateSettings,
    youtubeVideos,
    addYoutubeVideo,
    deleteYoutubeVideo,
  } = useAdmin();
  const [newTrack, setNewTrack] = useState({
    name: "",
    spotifyEmbed: "",
    appleEmbed: "",
    songUrl: "",
    imageUrl: "",
  });
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [editingTrack, setEditingTrack] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTrack.name) {
      toast.error("Track name is required!");
      return;
    }

    if (!(newTrack.spotifyEmbed || newTrack.appleEmbed || newTrack.songUrl)) {
      toast.error("At least one music source is required!");
      return;
    }

    if (editingTrack) {
      updateTrack(editingTrack._id, newTrack);
      toast.success("Track updated successfully!");
    } else {
      addTrack(newTrack);
      toast.success("Track added successfully!");
    }
    setNewTrack({
      name: "",
      spotifyEmbed: "",
      appleEmbed: "",
      songUrl: "",
      imageUrl: "",
    });
    setEditingTrack(null);
  };

  const handleYoutubeSubmit = (e) => {
    e.preventDefault();
    try {
      addYoutubeVideo(youtubeUrl);
      setYoutubeUrl("");
      toast.success("YouTube video added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (track) => {
    setEditingTrack(track);
    setNewTrack(track);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    deleteTrack(id);
    toast.success("Track deleted successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-lg mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingTrack ? "Edit Track" : "Add New Track"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Track Name*</label>
              <input
                type="text"
                value={newTrack.name}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, name: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">
                Spotify Embed Code (Optional)
              </label>
              <textarea
                value={newTrack.spotifyEmbed}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, spotifyEmbed: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">
                Apple Music Embed Code (Optional)
              </label>
              <textarea
                value={newTrack.appleEmbed}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, appleEmbed: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">
                Song URL (Optional)
              </label>
              <input
                type="url"
                value={newTrack.songUrl}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, songUrl: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">
                Image URL (Optional)
              </label>
              <input
                type="url"
                value={newTrack.imageUrl}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, imageUrl: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </div>
            <button
              type="submit"
              className="bg-[#FA2D48] text-white px-6 py-2 rounded hover:bg-[#FF5C77] transition-colors"
            >
              {editingTrack ? "Update Track" : "Add Track"}
            </button>
          </div>
        </form>

        <form
          onSubmit={handleYoutubeSubmit}
          className="bg-gray-900 p-6 rounded-lg mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Add YouTube Video
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">YouTube URL</label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                required
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <button
              type="submit"
              className="bg-[#FA2D48] text-white px-6 py-2 rounded hover:bg-[#FF5C77] transition-colors"
            >
              Add Video
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">
            YouTube Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeVideos.map((video) => (
              <div
                key={video._id}
                className="bg-gray-900 rounded-lg overflow-hidden"
              >
                <img
                  src={video.thumbnailUrl}
                  alt="Video thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <button
                    onClick={() => deleteYoutubeVideo(video._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Tracks</h3>
          {tracks.map((track) => (
            <div key={track._id} className="bg-gray-900 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">
                  {track.name}
                </h4>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(track)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(track._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {track.spotifyEmbed && (
                  <div
                    dangerouslySetInnerHTML={{ __html: track.spotifyEmbed }}
                  />
                )}
                {track.appleEmbed && (
                  <div dangerouslySetInnerHTML={{ __html: track.appleEmbed }} />
                )}
                {track.songUrl && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                    {track.imageUrl && (
                      <img
                        src={track.imageUrl}
                        alt={track.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <a
                      href={track.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Listen to {track.name}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

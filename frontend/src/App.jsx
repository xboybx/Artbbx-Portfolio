import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Mousewheel,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  FaSpotify,
  FaApple,
  FaInstagram,
  FaSoundcloud,
  FaAmazon,
  FaMicrophone,
  FaMusic,
  FaUser,
  FaImages,
  FaYoutube,
} from "react-icons/fa";
import { AdminProvider } from "./context/AdminContext";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import { useAdmin } from "./context/AdminContext";
import "./index.css";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn") === "true";
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
}

function MainContent() {
  const [isBeatbox, setIsBeatbox] = useState(false);
  const [fade, setFade] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const { tracks, youtubeVideos } = useAdmin();

  const galleryImages = [
    { src: "/Beatbox cover.webp", alt: "Gallery 1" },
    { src: "/Beatbox profile.webp", alt: "Gallery 2" },
    { src: "/Cover.webp", alt: "Gallery 3" },
    { src: "/Profile.webp", alt: "Gallery 4" },
  ];

  const handleToggle = () => {
    setFade(true);
    setTimeout(() => {
      setIsBeatbox(!isBeatbox);
      setFade(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e]  text-white font-sans transition-all duration-500">
      {/* bg-[#1a1a2e] */}
      <header className="relative">
        <div
          className={`relative h-[300px] bg-[#4a4e69] transition-all duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={isBeatbox ? "/Beatbox cover.webp" : "/Cover.webp"}
            alt="Cover"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1a2e] to-transparent"></div>
          {/* from-[#1a1a2e] */}
        </div>

        <div
          className={`absolute top-4 right-4 flex space-x-4 transition-all duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <a
            target="__main"
            href="https://soundcloud.com/xboybx"
            className="text-white hover:text-[#9a8c98] transition-colors"
          >
            <FaSoundcloud size={24} />
          </a>
          <a
            target="__main"
            href="https://open.spotify.com/artist/5WHZ7ZLFTcVzF1hJZgJzgp"
            className="text-white hover:text-[#9a8c98] transition-colors"
          >
            <FaSpotify size={24} />
          </a>
          <a
            target="__main"
            href="https://music.apple.com/in/artist/x-boy/1800881639"
            className="text-white hover:text-[#9a8c98] transition-colors"
          >
            <FaApple size={24} />
          </a>
          <a
            target="__main"
            href="https://www.instagram.com/xboy.bx/"
            className="text-white hover:text-[#9a8c98] transition-colors"
          >
            <FaInstagram size={24} />
          </a>
          <a
            target="__main"
            href="https://music.amazon.in/artists/B0F13HMSYF/x-boy"
            className="text-white hover:text-[#9a8c98] transition-colors"
          >
            <FaAmazon size={24} />
          </a>
          <a
            target="__main"
            href="https://www.youtube.com/@xboybx"
            className="text-white hover:text-[#9a8c98] transition-colors"
          >
            <FaYoutube size={24} />
          </a>
        </div>

        <div
          className={`absolute bottom-[-75px] left-8 transition-all duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-40 h-40 bg-[#4a4e69] rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src={isBeatbox ? "/Beatbox profile.webp" : "/Profile.webp"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute bottom-[-50px] right-8">
          <button
            className="w-12 h-12 bg-[#4a4e69] hover:bg-[#22223b] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-500 animate-pulse"
            onClick={handleToggle}
          >
            {isBeatbox ? <FaMusic size={20} /> : <FaMicrophone size={20} />}
          </button>
        </div>
      </header>

      <div
        className={`mt-24 px-8 transition-all duration-500 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold pl-6">X BOY</h1>
            <h1 className="text-lg font-bold pl-3 text-[#9a8c98]">
              {isBeatbox ? "Beatbox Artist" : "Lo-fi Producer"}
            </h1>
          </div>

          {!isBeatbox && (
            <p className="hidden md:block text-lg text-[#9a8c98] mt-4 md:mt-0 md:ml-8 md:w-1/2">
              Xboy is a music producer creating soulful and mellow lo-fi beats.
              With a passion for deep, atmospheric soundscapes, he blends warm
              textures and smooth melodies. Xboy recently released *Serene
              Drift* and continues to craft immersive sonic experiences.
            </p>
          )}
        </div>
      </div>

      {isBeatbox && (
        <section
          className={`mt-8 p-8 transition-all duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold font-mono ml-5">
              {showGallery ? "Gallery" : "Bio"}
            </h2>
            <button
              className="px-4 py-2 bg-[#4a4e69] hover:bg-[#22223b] text-white rounded-lg shadow transition-all duration-500 flex items-center justify-center"
              onClick={() => setShowGallery(!showGallery)}
            >
              {showGallery ? <FaUser size={20} /> : <FaImages size={20} />}
            </button>
          </div>

          <div className="mt-4 overflow-x-hidden rounded-lg p-4">
            {showGallery ? (
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                mousewheel={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Pagination, Autoplay, Mousewheel]}
                className="w-full py-12"
              >
                {galleryImages.map((image, index) => (
                  <SwiperSlide key={index} className="w-64 h-64">
                    <div className="relative group cursor-pointer w-full h-full">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-lg" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <>
                <p className="text-lg text-[#9a8c98] mb-8">
                  Jaswanth, also known as Xboy, is a passionate beatboxer known
                  for crafting rhythmic and dynamic vocal percussion. With a
                  deep love for the art of beatboxing, he has developed a unique
                  style blending technical precision, groove, and musicality. In
                  2024, SNX secured the title of{" "}
                  <span className="bg-[#4a4e69]/20 p-1 rounded-lg text-center text-sm font-bold">
                    SNX Vice Tag Team Champion 🥈
                  </span>{" "}
                  at the Hyderabad Beatbox Championship, marking a significant
                  milestone in his journey. Always pushing the boundaries of
                  sound, Xboy continues to explore and innovate within the
                  beatbox community, delivering powerful performances that
                  captivate audiences.
                </p>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <FaYoutube className="text-[#c9ada7]" />
                    ShowCases
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {youtubeVideos.map((video) => (
                      <div
                        key={video.id}
                        className="bg-[#22223b] rounded-lg overflow-hidden shadow-lg"
                      >
                        <div className="aspect-video">
                          <iframe
                            src={video.embedUrl}
                            title="YouTube video"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* {!isBeatbox && (
        <section
          className={`mt-8 p-8 transition-all duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <h2 className="text-2xl font-bold mb-2 animate-pulse text-[#c9ada7]">
            Latest Releases
          </h2>
          <p className="text-[#9a8c98] text-sm mb-4">
            Discover the freshest tracks from Xboy, blending soulful melodies
            and atmospheric vibes. ✨
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="bg-[#22223b] backdrop-blur-sm border-t border-white/10 rounded-lg p-2 flex flex-col h-full w-full overflow-hidden"
              >
                <div className="flex-grow overflow-hidden">
                  {track.spotifyEmbed && (
                    <div
                      className="w-full h-1/2 mb-2 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: track.spotifyEmbed }}
                    />
                  )}
                  {track.appleEmbed && (
                    <div
                      className="w-full h-1/2"
                      dangerouslySetInnerHTML={{ __html: track.appleEmbed }}
                    />
                  )}
                  {track.songUrl &&
                    !track.spotifyEmbed &&
                    !track.appleEmbed && (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        {track.imageUrl && (
                          <img
                            src={track.imageUrl}
                            alt={track.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                        <a
                          href={track.songUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#c9ada7] hover:text-[#9a8c98] text-sm"
                        >
                          Listen to {track.name}
                        </a>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )} */}
      {!isBeatbox && (
        <section
          className={`mt-8 p-8 transition-all duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <h2 className="text-2xl font-bold mb-2 animate-pulse text-gray-400">
            Latest Releases
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Discover the freshest tracks from Xboy, blending soulful melodies
            and atmospheric vibes. ✨
          </p>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="bg-white/5 backdrop-blur-sm border-t border-white/10 rounded-lg p-2 flex flex-col h-[20.8rem] w-full bg-red-400"
              >
                <div className="flex-grow overflow-hidden">
                  {track.spotifyEmbed && (
                    <div
                      className="w-full h-1/2 mb-2 overflow-hidden "
                      dangerouslySetInnerHTML={{ __html: track.spotifyEmbed }}
                    />
                  )}
                  {track.appleEmbed && (
                    <div
                      className="w-full h-1/2"
                      dangerouslySetInnerHTML={{ __html: track.appleEmbed }}
                    />
                  )}
                  {track.songUrl &&
                    !track.spotifyEmbed &&
                    !track.appleEmbed && (
                      <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
                        {track.imageUrl && (
                          <img
                            src={track.imageUrl}
                            alt={track.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                        <a
                          href={track.songUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Listen to {track.name}
                        </a>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
          <div className="md:hidden space-y-2">
            {tracks.map((track) => {
              let url = track.songUrl;
              let imageUrl = track.imageUrl;

              if (track.spotifyEmbed) {
                const srcMatch = track.spotifyEmbed.match(/src=\"([^\"]+)\"/);
                if (srcMatch) url = srcMatch[1];

                const imageMatch =
                  track.spotifyEmbed.match(/image=\"([^\"]+)\"/);
                if (imageMatch) imageUrl = imageMatch[1];
              } else if (track.appleEmbed) {
                const srcMatch = track.appleEmbed.match(/src=\"([^\"]+)\"/);
                if (srcMatch) url = srcMatch[1];

                const imageMatch = track.appleEmbed.match(/image=\"([^\"]+)\"/);
                if (imageMatch) imageUrl = imageMatch[1];
              }

              return (
                <a
                  key={track.id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/5 backdrop-blur-sm border-t border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors flex items-center gap-3"
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={track.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{track.name}</p>
                    <div className="flex items-center gap-2 mt-1 ml-auto">
                      {track.spotifyEmbed ? (
                        <FaSpotify className="text-green-500" />
                      ) : track.appleEmbed ? (
                        <FaApple className="text-white" />
                      ) : null}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AdminProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AdminProvider>
    </Router>
  );
}

export default App;

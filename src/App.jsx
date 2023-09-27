import { useState, useEffect } from "react";
import axios from "axios";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

import "./App.css";
import Footer from "./components/Footer";
const themes = {
  light: "light",
  dark: "dark",
};
const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme" || themes.dark);
};

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(getThemeFromLocalStorage());
  const handleTheme = () => {
    const { light, dark } = themes;
    const newTheme = theme === dark ? light : dark;
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  async function getUnsplashPhotos() {
    try {
      const apiKey = "ji28ItvOyeZ86pQC1-WrT4eHq-VLrLQ3b4OdpDI_mS8";
      let resp = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${search}&per_page=15`
      );
      setData(resp.data.results);
    } catch (e) {
      console.log(e);
    }
  }

  // ?Theme

  return (
    <>
      <div className="max-w-7xl mx-auto main-container">
        <header className="header z-20 ">
          <div className="max-w-7xl mx-auto">
          <div className="navbar mx-auto bg-base-300 rounded-xl py-2s pt-3">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-2xl">Serach Image</a>
            </div>
            <div className="flex-none gap-28">
              <div className="form-control flex-row flex gap-3">
                <input
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Search Images"
                  className="input input-bordered w-24 md:w-auto"
                />
                <button className="btn btn-primary" onClick={getUnsplashPhotos }>
                  Submit
                </button>
              </div>
              <div className="theme px-3">
                <label className="swap swap-rotate ">
                  <input type="checkbox" onClick={handleTheme} />
                  <BsSunFill className="swap-on h-9 w-7" />
                  <BsMoonFill className="swap-off h-9 w-7" />
                </label>
              </div>
            </div>
          </div>
          </div>
        </header>

        <main>
          <div className="mt-16">
            {!data.length && (
              <div className="mt-72">
                <h2 className="text-3xl text-center">Place search image</h2>
              </div>
            )}
            <div className="flex flex-wrap gap-[35px] px-[10px] pb-32 pt-14">
              {data.map((image, id) => {
                return (
                  <div
                    key={id}
                    className="rounded-2xl hover:scale-105 duration-200"
                  >
                    <figure className="w-72 h-72 object-cover ">
                      <img
                        src={image.urls.small}
                        alt="Shoes"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </figure>
                  </div>
                );
              })}
              <div className="mx-auto"></div>
            </div>
          </div>
        </main>

        <footer className="footter">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;

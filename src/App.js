import { useState, useEffect } from "react";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState("");
  const [color, setColor] = useState("#77B1A9");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      setQuotes(data);
      let randomIndex = Math.floor(Math.random() * data.length);
      setRandomQuote(data[randomIndex]);
    }
    fetchData();
  }, []);

  const getNewQuote = () => {
    const colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
    ];
    let randomColorIndex = Math.floor(Math.random() * colors.length);
    let randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
    setColor(colors[randomColorIndex]);
  };

  return (
    <div style={{ backgroundColor: color, minHeight: "100vh" }}>
      <div className="container p-5">
        <div className="jumbotron">
          <div className="card">
            <div className="card-header text-center h2">Inspiration Quote</div>
            <div className="card-body" style={{ opacity: 1 }}>
              {randomQuote ? (
                <>
                  <h6
                    className="card-text"
                    style={{ color: color, fontSize: "1.9rem" }}
                  >
                    <i className="fa fa-quote-left"></i>
                    <br />
                    {randomQuote.text}
                    <i className="fa fa-quote-right"></i>
                  </h6>
                  <h5
                    className="card-title text-right display-5"
                    style={{ color: color }}
                  >
                    - {randomQuote.author || "No Author"}
                  </h5>
                </>
              ) : (
                <h2>Loading</h2>
              )}
            </div>
            <div className="container-btn">
              <button
                className="btn btn-sm p-3 m-2"
                onClick={getNewQuote}
                style={{ backgroundColor: color, color: "white" }}
              >
                New Quote
              </button>
              <a
                href={
                  "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                  encodeURIComponent(
                    '"' + randomQuote.text + '" ' + randomQuote.author
                  )
                }
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm m-2 p-3"
                style={{ backgroundColor: color, color: "white" }}
              >
                <i className="fa fa-twitter"></i>
              </a>
              <a
                href={
                  "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                  encodeURIComponent(randomQuote.author) +
                  "&content=" +
                  encodeURIComponent(randomQuote.text) +
                  "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                }
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm p-3"
                style={{ backgroundColor: color, color: "white" }}
              >
                <i className="fa fa-tumblr"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

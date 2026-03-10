import { useEffect, useState, useCallback } from "react";
import "./styles/CyberNews.css";
import { FiExternalLink, FiRefreshCw } from "react-icons/fi";

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
};

const RSS_API =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.feedburner.com%2FTheHackersNews";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CyberNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(() => {
    setLoading(true);
    setError(false);
    fetch(RSS_API)
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data) => {
        if (data.status === "ok" && data.items?.length) {
          setNews(data.items.slice(0, 6));
          setLastUpdated(new Date());
        } else {
          throw new Error("empty");
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60 * 60 * 1000); // refresh every hour
    return () => clearInterval(interval);
  }, [fetchNews]);

  return (
    <div className="news-section">
      <div className="news-container section-container">
      <div className="news-header">
        <h2>
          Cyber <span>News</span>
        </h2>
        <div className="news-meta">
          <span className="news-live-badge">● LIVE</span>
          {lastUpdated && (
            <span className="news-updated">
              Updated{" "}
              {lastUpdated.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
          <button
            className="news-refresh-btn"
            onClick={fetchNews}
            disabled={loading}
            data-cursor="disable"
            title="Refresh"
          >
            <FiRefreshCw className={loading ? "spin" : ""} />
          </button>
        </div>
      </div>
      <p className="news-source">Source: The Hacker News</p>

      {loading && (
        <div className="news-list">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="news-item-skeleton" />
          ))}
        </div>
      )}

      {error && (
        <p className="news-error">Could not load news. Try refreshing.</p>
      )}

      {!loading && !error && (
        <div className="news-list">
          {news.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-item"
              data-cursor="disable"
            >
              <div className="news-item-left">
                <span className="news-index">0{i + 1}</span>
                <div className="news-item-content">
                  <span className="news-title">{item.title}</span>
                  <span className="news-date">{formatDate(item.pubDate)}</span>
                </div>
              </div>
              <FiExternalLink className="news-ext-icon" />
            </a>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default CyberNews;

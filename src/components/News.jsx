import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Row, Col, Card, Avatar, Select, Spin, Alert } from "antd";
import moment from "moment";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        const cachedData = JSON.parse(localStorage.getItem("cryptoNewsData"));
        const lastFetchTime = localStorage.getItem("cryptoNewsFetchTime");
        const now = Date.now();

        // Check if data is cached and it's been less than 15 minutes since last fetch
        if (
          cachedData &&
          lastFetchTime &&
          now - lastFetchTime < 15 * 60 * 1000
        ) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://newsdata.io/api/1/news?apikey=pub_50476a61d0e7f84a76098fb5e9e4b23958238&q=crypto"
        );

        const fetchedData = response.data.results || [];

        // Cache the data and the timestamp
        localStorage.setItem("cryptoNewsData", JSON.stringify(fetchedData));
        localStorage.setItem("cryptoNewsFetchTime", now);

        setData(fetchedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoNews();

    // Set interval to fetch new data every 15 minutes
    const intervalId = setInterval(fetchCryptoNews, 15 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );
  if (data.length === 0) return <div>No data available</div>;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            optionFilterProp="children"
            style={{ width: 200 }}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {/* You can dynamically populate this with actual categories if available */}
          </Select>
        </Col>
      )}
      {data.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news.image_url || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {news.description && news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.source_icon || demoImage} alt="news" />
                  <Text className="provider-name">{news.source_name}</Text>
                </div>
                <Text>{moment(news.pubDate).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;

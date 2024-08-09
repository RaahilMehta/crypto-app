import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Row, Col, Card, Avatar, Select } from 'antd';
import moment from 'moment';

const { Text, Title } = Typography;
const{Option} = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://real-time-finance-data.p.rapidapi.com/search',
          params: {
            query: 'cryptocurrency',
            language: 'en'
          },
          headers: {
            'x-rapidapi-key': 'b234994e45msh9d30e7e22d7bc7cp1111e8jsnd752f1acf9d8',
            'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
          }
        });
        setData(response.data.articles || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoNews();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data.length) return <div>No data available</div>;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span = {24}>
          <Select
          showSearcj
          className='select-news'
          placeholder = "Select a crypto"
          optionLabelProp='children'
          onChange={(input, option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>=0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
          </Select>
        </Col>
      )}
      {data.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target='_blank' rel="noreferrer">
              <div className="news-image-container">
                <Title className='news-title' level={4}>{news.title}</Title>
                <img style={{maxWidth:'200px', maxHeight:'100px'}} src={news.image?.url || demoImage} alt='news'/>
              </div>
              <p>
                {news.description?.length > 100
                ? `${news.description.substring(0, 100)}...`
                : news.description
                }
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news.source?.image?.url || demoImage} alt="news"/>
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;

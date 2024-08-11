import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Typography, Spin, Alert, Row, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery , useGetCryptoHistoryQuery} from '../services/cryptoApi';
import HTMLReactParser from 'html-react-parser'; // Ensure this is imported
import LineChart from './LineChart';
const { Title, Text } = Typography;
const { Option } = Select;


const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7 Days');
  const { data, isFetching, error } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery(coinId, timePeriod);

  // Show spinner while loading
  if (isFetching) return <Spin size="large" />;

  // Handle API errors
  if (error) {
    console.error('API Error:', error); // Log error to console
    return <Alert message="Error" description="Failed to fetch data" type="error" />;
  }

  // Check if data is valid
  const CryptoDetails = data?.data?.coin;

  if (!CryptoDetails) {
    console.warn('Data:', data); // Log data to console for debugging
    return <div>Error: Data not found</div>;
  }

  if(isFetching) return 'Loading...';
  const time=['3h','24h','7d','30d','3m','1y','3y','5y']


  // Define stats and genericStats
  const stats = [
    { title: 'Price to USD', value: `$ ${CryptoDetails?.price && millify(CryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: CryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${CryptoDetails?.volume && millify(CryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${CryptoDetails?.marketCap && millify(CryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${CryptoDetails?.allTimeHigh?.price && millify(CryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: CryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: CryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: CryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${CryptoDetails?.supply?.total && millify(CryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${CryptoDetails?.supply?.circulating && millify(CryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {CryptoDetails.name} ({CryptoDetails.symbol}) Price
        </Title>
        <p>{CryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
        {['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'].map((date) => (
          <Option key={date} value={date}>{date}</Option>
        ))}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(CryptoDetails.price)}coinName={CryptoDetails.name}/>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{CryptoDetails.name} Value Statistics</Title>
            <p>An overview showing the statistics of {CryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {CryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {CryptoDetails.name}?</Title>
          {HTMLReactParser(CryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{CryptoDetails.name} Links</Title>
          {CryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
}

export default CryptoDetails;

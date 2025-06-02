import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 6,
    category: "sports",
  };

  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.Capitalize(this.props.category)} - NewsMonkey`;
  }

  Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  Update= async() => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.Update();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  render() {
    return (
      <>
        <h2 className="text-center" style={{ padding: `30px` }}>
          NewsMonkey - {this.Capitalize(this.props.category)} Top Headlines
        </h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
        dataLength={this.state.articles ? this.state.articles.length : 0}
        next={this.fetchMoreData}
        hasMore={this.state.articles && this.state.articles.length !== this.state.totalResults}
        loader={this.state.articles.length <= this.state.totalResults ? <Spinner /> : null
  }
      >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element,index) => {
                 return (
                  <div className="col-md-4" key={`${element.url}-${index}`}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    pageSize: 6,
    category: "sports",
  };

  static propTyps = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    
    document.title=`${this.Capitalize(this.props.category)} - NewsMonkey`;
  }

  Capitalize = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  } 

  async Update(){
    let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=825157aa427e42728c6d5f76ec0354f2&page=${this.state.page}&pageSize=${this.props.pageSize}`
     this.setState({
      loading: true,
    });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
   this.Update();
  }

  previousClick = async () => {
   this.setState({page:this.state.page - 1}, ()=>{
    this.Update();
   })
  };

  nextClick = async () => {
     this.setState({page:this.state.page + 1}, ()=>{
    this.Update();
   })
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ padding: `30px` }}>
          NewsMonkey - {this.Capitalize(this.props.category)} Top Headlines
        </h2>
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
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
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.previousClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
                ? true
                : false
            }
            id="button"
            type="button"
            className="btn btn-dark"
            onClick={this.nextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country : "in",
    pageSize : 6,
    category : "science"
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1
    };
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    this.props.setProgress(100);
  }

  PreviousClick = async () => {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }
  NextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    }
    else {
      let url =
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }

  }

  render() {
    return (
      <div className="container my-3">
        <h2>News Daily</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imgURL={element.urlToImage}
                  newsURL={element.url}
                  date = {element.publishedAt}
                  author = {element.author}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.PreviousClick}>Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.NextClick}>Next</button>
        </div>
      </div>
    );
  }
}

export default News;

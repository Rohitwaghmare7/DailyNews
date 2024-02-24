import React, { useEffect, useLayoutEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'


const News = (props) => {

  const [articles,setArticles] = useState([])
  const [loading,steLoading] = useState(false)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)

  useEffect(() => {
    NewsUpdate();
  },[])

  const NewsUpdate = async() =>{
    props.setProgress(10);
    let url =
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  } 

  const PreviousClick = async () => {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setPage(page - 1)
  }
  const NextClick = async () => {
    if (page + 1 > Math.ceil(totalResults / props.pageSize)) {

    }
    else {
      let url =
        `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles)
      setPage(page + 1)
    }

  }
    return (
      <div className="container my-3">
        <h2>News Daily</h2>
        <div className="row">
          {articles.map((element) => {
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
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={PreviousClick}>Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={NextClick}>Next</button>
        </div>
      </div>
    );
}

News.defaultProps = {
  country : "in",
  pageSize : 6,
  category : "science"
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}

export default News;

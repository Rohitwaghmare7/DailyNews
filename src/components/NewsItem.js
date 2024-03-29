import React from 'react'

const NewsItem = (props) => {
    let {title,description,imgURL,newsURL,author,date} = props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imgURL?imgURL:"https://images.moneycontrol.com/static-mcnews/2021/03/jsw-steel-770x322.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsURL} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
          </div>
        </div>
      </div>
    ) 
}

export default NewsItem

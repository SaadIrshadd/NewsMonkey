import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, author, date, source}=this.props
    return (
      <>
      <div className="my-3">
          <div className="card">
            <div>                
              <span className='badge rounded-pill bg-danger' style={
                {
                  display : 'flex',
                  justifyContent : 'flex-end',
                  position : 'absolute',
                  right : 0
                }
              }>{source}</span>
            </div>
            <img src={imgUrl?imgUrl:"https://media.cnn.com/api/v1/images/stellar/prod/1-mccormack-jeremy-megalodontooth-m1b5929-c-uwedettmar.jpg?c=16x9&q=w_800,c_fill"} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-danger">By {author} on {new Date(date).toUTCString()}</small></p>
                <a href={newsUrl} target="_blank" rel="noreferrer"className="btn btn-sm btn-dark">Read More</a>
              </div>
          </div>
        </div>
      </>
    )
  }
}

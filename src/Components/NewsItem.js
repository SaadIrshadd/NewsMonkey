import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl}=this.props
    return (
      <>
      <div className="my-3">
          <div className="card">
            <img src={imgUrl?imgUrl:"https://media.cnn.com/api/v1/images/stellar/prod/1-mccormack-jeremy-megalodontooth-m1b5929-c-uwedettmar.jpg?c=16x9&q=w_800,c_fill"} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={newsUrl} target="_blank" rel="noreferrer"className="btn btn-sm btn-primary">Read More</a>
              </div>
          </div>
        </div>
      </>
    )
  }
}

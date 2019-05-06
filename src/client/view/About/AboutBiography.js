import React from "react";

export default class Biography extends React.Component {
  render() {
    const descriptions = this.props.description.map((desc, i) => <p key={i}> {desc} </p>);

    return (
      <div>
        <div class="grid row">
          <div class="grid-item grid-8 portable-grid-12">
            <div id="avatar"></div>
          </div>
          <div class="grid-item grid-4 portable-grid-12">
            <div class="grid">
              <div class="grid-item grid-10 portable-grid-12">
                <h2>{this.props.title}</h2>
                {descriptions}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

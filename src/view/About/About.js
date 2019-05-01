import React from "react";

import Biography from "./AboutBiography";

export default class About extends React.Component {
  static get defaultProps() {
    return {
      title: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
      description: [
       `Donec ullamcorper nulla non metus auctor fringilla. Nullam quis
        risus eget urna mollis ornare vel eu leo. Curabitur blandit tempus
        porttitor. Cum sociis natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Donec id elit non mi porta gravida
        at eget metus.`,

       `Etiam porta sem malesuada magna mollis euismod. Fusce dapibus,
        tellus ac cursus commodo, tortor mauris condimentum nibh, ut
        fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Duis mollis, est non commodo luctus,
        nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nullam
        id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus
        eget urna mollis ornare vel eu leo. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.`
      ]
    }
  }

  render() {
    return (
      <div>
        <Biography title={this.props.title} description={this.props.description} />
      </div>
    )
  }
}

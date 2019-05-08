import React from 'react';

function arrayBufferToBase64( arrayBuffer ) {
    var bytes = new Uint8Array( arrayBuffer );
    var len = bytes.byteLength;
    var binary = '';
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa(binary);
}

export default class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            images: []
        }
    }

    componentDidMount() {
        fetch(`/api/projects/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(json => {
                console.log('json', json);

                this.setState({
                    title: json.title,
                    body: json.body,
                    images: json.images
                });
            });
    }

    fileChanged(e) {
        const images = [];
        const files = e.target.files;

        Array.from(files).forEach((image, index) => {
            const reader = new FileReader();

            // after the file has loaded on the client,
            // convert to base64 and assign to the item before POSTing
            reader.onload = (evt) => {
                let data = arrayBufferToBase64(evt.target.result);
                images.push({
                    data,
                    contentType: image.type,
                    position: (this.state.images.length + index - 1),
                    key: Math.random().toString(36).substr(2, 9)
                });

                if (images.length === files.length) {
                    this.setState({
                        images: [...this.state.images, ...images].sort((a, b) => b.position - a.position)
                    })
                }
            };

            reader.readAsArrayBuffer(image);
        });
    }

    removeImage(key) {
        const images = this.state.images.slice().filter(image => image.key !== key);

        this.setState({
            images
        });
    }

    submit(e) {
        e.preventDefault();

        if (!this.state.images || !this.state.title || !this.state.body) throw new Error(`All fields are mandatory`);

        fetch(`/api/projects/${this.props.match.params.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body,
                images: this.state.images
            })
        })
    }

    render() {
        console.log("this.state.images", this.state.images);

        const images = this.state.images.length ? (
            <ul> {
                this.state.images.map(image => (
                    <li key={image.key}
                        style={{backgroundImage: `url(data:${image.contentType};base64,${image.data})`}}>
                        <div className="action" onClick={() => this.removeImage(image.key)}><i className="fa fa-trash"/></div>
                    </li>
                ))
            } </ul>
        ) : null;

        return (
            <form>
                <input type="text" defaultValue={this.state.title} onKeyUp={e => this.setState({ title: e.target.value })} />
                <textarea value={this.state.body} onChange={e => this.setState({ body: e.target.value })}/>
                <input type="file" id="images" name="images" multiple onChange={(e) => this.fileChanged(e)} />

                { images }

                <button onClick={this.submit.bind(this)}>Submit</button>
            </form>
        )
    }
}
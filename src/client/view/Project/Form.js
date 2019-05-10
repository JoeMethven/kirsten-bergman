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
            images: Array(4).fill()
                .map((_, i) => ({
                    empty: true,
                    key: this.createUniqueKey(),
                    position: i
                }))
        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            fetch(`/api/projects/${this.props.match.params.id}`)
                .then(res => res.json())
                .then(json => {
                    console.log('json', json);

                    const images = this.state.images.slice().map(image => Object.assign({}, image));
                    images.forEach((image, index) => {
                        if (!json.images[index]) return;
                        images[index] = json.images[index]
                    });

                    this.setState({
                        title: json.title,
                        body: json.body,
                        images
                    });
                });
        }

    }

    createUniqueKey() {
        return Math.random().toString(36).substr(2, 9);
    }

    fileChanged(e, index) {
        const images = this.state.images.slice();
        const file = e.target.files[0];
        const reader = new FileReader();

        // after the file has loaded on the client,
        // convert to base64 and assign to the item before POSTing
        reader.onload = (evt) => {
            let data = arrayBufferToBase64(evt.target.result);

            images[index] = {
                data,
                contentType: file.type,
                position: index,
                key: this.createUniqueKey()
            };

            this.setState({
                images
            });
        };

        reader.readAsArrayBuffer(file);
    }

    removeImage(key, index) {
        const images = this.state.images.slice();
        const image = images.filter(item => item.key === key)[0];

        console.log('images', images);
        console.log('image.position', image.position);

        images[image.position] = {
            position: index,
            empty: true,
            key
        };

        this.setState({
            images
        });
    }

    submit(e) {
        e.preventDefault();

        // remove any empty images, sort images in correct order then set position numbers correctly
        // (i.e. if there was an empty image inbetween 2 then we need to renumber the positioning.
        const images = this.state.images
            .slice()
            .map(image => Object.assign({}, image))
            .filter(image => !image.empty)
            .sort((a, b) => a.position - b.position);

        console.log('images before', images);

        images.forEach((image, index) => image.position = index);

        console.log('images', images);

        const data = {
            title: this.state.title,
            body: this.state.body,
            images
        };

        if (!this.state.images || !this.state.title || !this.state.body) throw new Error(`All fields are mandatory`);

        if (this.props.match.params.id) {
            fetch(`/api/projects/${this.props.match.params.id}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
        } else {
            fetch(`/api/projects`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
        }
    }

    renderImage(image, index) {
        if (image.empty) {
            return (
                <li key={image.key} class="form-image form-image-empty">
                    <label for={`image[${index}]`} />
                    <input type="file" id={`image[${index}]`} onChange={(e) => this.fileChanged(e, index)} />
                </li>
            )
        }

        return (
            <li key={image.key}
                class="form-image"
                style={{backgroundImage: `url(data:${image.contentType};base64,${image.data})`}}
                onClick={() => this.removeImage(image.key, index)} />
        )
    }

    render() {
        console.log("this.state.images", this.state.images);

        const images = this.state.images.length ? (
            <ul class="form-images"> {
                this.state.images.map((image, index) => this.renderImage(image, index))
            } </ul>
        ) : null;

        return (
            <form>
                <input type="text" className="form-title" placeholder="Create a title" defaultValue={this.state.title}
                       onKeyUp={e => this.setState({title: e.target.value})}/>
                <textarea value={this.state.body} placeholder="Project details..."
                          onChange={e => this.setState({body: e.target.value})}/>

                {images}

                <div className="form-actions">
                    <button onClick={this.submit.bind(this)}>{this.props.match.params.id ? 'Submit' : 'Create'}</button>
                </div>
            </form>
        )
    }
}
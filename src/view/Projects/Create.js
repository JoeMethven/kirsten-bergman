import React from 'react';

export default class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: ''
        }
    }

    submit(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', this.state.title);
        formData.append('body', this.state.body);
        Array.from(this.state.images)
            .forEach(image => formData.append('images', image));

        if (!this.state.images || !this.state.title || !this.state.body) throw new Error(`All fields are mandatory`);

        fetch('/api/projects', {
            method: 'POST',
            body: formData
        })
    }

    render() {
        return (
            <form>
                <input type="text" name="title" onKeyUp={e => this.setState({ title: e.target.value })} />
                <textarea name="body" onKeyUp={e => this.setState({ body: e.target.value })} />
                <input type="file" id="images" name="images" multiple onChange={e => this.setState({ images: e.target.files })} />

                <button onClick={this.submit.bind(this)}>Submit</button>
            </form>
        )
    }
}
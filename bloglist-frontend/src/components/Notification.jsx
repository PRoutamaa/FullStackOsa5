const Notification = (props) => {
    if (props.title) {
        return (
            <>
            <p>A new blog {props.title} by {props.author} was created</p>
            </>
        )
    }
    return (null)
}

export default Notification
import Button from 'react-bootstrap/Button';

function buttonBlue(props) {

    return (
        <>
            <style type="text/css">
                {`
                    .btn-blue {
                    background-color: #5BA4EE;
                    color: #fff;
                    }

                    .btn-blue:hover {
                        background-color:#0075EC;
                        color: #fff;
                        }

                    .btn-sml {
                    font-size: 0.7rem;
                    }
    `}
            </style>

            <Button variant="blue" size="sml" onClick={props.onClick} style={props.style}>
                {props.name}
            </Button>
        </>
    );
}

export default buttonBlue;


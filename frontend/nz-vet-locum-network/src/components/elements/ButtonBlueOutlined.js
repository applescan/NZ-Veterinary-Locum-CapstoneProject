import Button from 'react-bootstrap/Button';

function buttonBlueOutlined(props) {

    return (
        <>
            <style type="text/css">
                {`
                    .btn-blueOutlined {
                    border-color: #5BA4EE;
                    color: #5BA4EE;
                    }

                    .btn-blueOutlined:hover {
                        border-color: #0075EC;
                        color: #0075EC;
                        }

                    .btn-sml {
                    font-size: 0.7rem;
                    }
    `}
            </style>

            <Button variant="blueOutlined" size="sml" onClick={props.onClick} style={props.style}>
                {props.name}
            </Button>
        </>
    );
}

export default buttonBlueOutlined;


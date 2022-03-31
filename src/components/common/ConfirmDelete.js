import React from 'react';
import {Button, Card, CardBody, CardSubtitle, CardText} from "reactstrap";

export const ConfirmDelete = ({subTitle, message, onClose, onClick}) => {
    return (
        <Card className="d-flex flex-row">
            <div className="align-self-center m-3 text-large text-required">
                <i className="iconsminds-danger" />
            </div>
            <div className="d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                    <div className="min-width-zero">
                        <CardSubtitle className="truncate mb-1">
                            {subTitle}
                        </CardSubtitle>
                        <CardText className="text-muted text-small mb-2">
                            {message}
                        </CardText>
                        <Button color="primary" size="xs" className="mr-2"
                                onClick={onClick}>
                            Yes
                        </Button>
                        <Button color="danger" size="xs" onClick={onClose} className="mr-2">
                            Cancel
                        </Button>
                    </div>
                </CardBody>
            </div>
        </Card>
    );
}
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../Styles/SearchResultCard.css';
const formatter = require('../utils/helpers/currency-formatter');


function SearchResultCard(props){

    const price = formatter.format(props.currentPrice);
    const priceChange = formatter.format(props.priceChange);

    const buttons = () => {
        if(props.currentShares === 0){
            return (
                <div>
                    <Button className="mx-3" onClick={props.buyTransaction}>Buy</Button>
                    <Button onClick={props.sellTransaction} disabled>Sell</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button className="mx-3" onClick={props.buyTransaction}>Buy</Button>
                    <Button onClick={props.sellTransaction}>Sell</Button>
                </div>
            )
        }
    };

    return(
        <Card>
            <Card.Header id="result-header" as="h3" className="text-left d-flex justify-content-between">{props.stockSymbol} 
                <div>
                    {props.companyName} 
                </div>
                {buttons()}
            </Card.Header>
            <Card.Body id="result-card-body" className="d-flex justify-content-around">
                <div>
                    <h4>Current Shares</h4>
                    <p>{props.currentShares}</p>
                </div>
                <div>
                    <h4>Current Price</h4>
                    <p>{price}</p>
                </div>
                <div>
                    <h4>Price Change</h4>
                    <p>{priceChange}</p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SearchResultCard;